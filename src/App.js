import React from 'react';
import './App.css';
import { SketchPicker } from 'react-color';
import { CirclePicker } from 'react-color';
const data = require('./data.js');
const defaultColor = 'pink';
const lineWidth = 8;
const eraseRadius = 8;

class App extends React.Component {
  constructor(){
      super();
      this.canvas = React.createRef();  // 上层canvas
      this.canvas2 = React.createRef(); // 下层canvas背景
      this.isOperating = false;         // 区分鼠标滑动还是在操作（上色或者擦除），鼠标按下开启，鼠标松开关闭
      this.prevPoint = null;            // { x: , y: }
      this.historyCanvas = [];        // [canvas1, canvas2]
      this.state = {
        currentTool: 'pen',             // 'pen' or 'eraser'
        displayColorPicker: false,      // 是否展示颜色选择器
        colors: [],                     // 记录所有选中过的颜色，其中colors[0]总是为当前选中颜色
        currentStep: -1
      };
  }

  // 在组件挂载后（插入 DOM 树中）立即调用，用来初始化页面
  componentDidMount() {
    // 声明两个全局变量
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx2 = this.canvas2.current.getContext('2d');
    // 渲染线图
    this.img = data.imgs.line;
    this.fillCanvasByImg(this.ctx, this.img);
    this.fillCanvasByImg(this.ctx2, this.img);

    this.historyCanvas.push(this.img);
    this.state.currentStep++;
  }

  // 给canvas绘制图片
  fillCanvasByImg = (ctx, img) => {
    var imgObj = new Image();
    imgObj.src = img;
    imgObj.setAttribute("crossOrigin",'Anonymous')
    imgObj.onload = function(){
      ctx.drawImage(imgObj, 0, 0, data.canvas.width, data.canvas.height);
    }
  }

  setColors = (color) => {
    var currentUsedColors = this.state.colors;
    var index = currentUsedColors.indexOf(color.hex);
    // 如果该颜色存在，从数组中删除它
    if(index >= 0){
      currentUsedColors.splice(index, 1)
    }
    // 从数组开头插入该颜色
    currentUsedColors.unshift(color.hex)
    // 更新视图
    this.setState({ colors: currentUsedColors })
  }

  setCurrentTool = (tool) => {
    this.setState({ currentTool: tool })
  }

  displayColorPicker = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  getCurrentPoint = (event) => {
    var canvas = this.canvas.current;
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) * (canvas.width/rect.width);
    var y = (event.clientY - rect.top) * (canvas.height/rect.height);

    return { x: x, y: y}
  }

  onMouseDown = (event) => {
    var currentPoint = this.getCurrentPoint(event);
    this.ctx.beginPath();
    this.ctx.moveTo(currentPoint.x, currentPoint.y);

    this.isOperating = true;
    // 记录第一个坐标点
    this.prevPoint = currentPoint;
  }

  onMouseUp = (event) => {
    this.isOperating = false;
    this.prevPoint = null;

    if(this.state.currentStep != this.historyCanvas.length-1){
      let temp = this.historyCanvas[this.state.currentStep];
      this.historyCanvas = [];
      this.historyCanvas.push(temp);
      this.state.currentStep = 0;
    }

    var img = null;
    if(this.state.currentTool === 'pen'){
      img = this.canvas.current.toDataURL();
    }else if(this.state.currentTool === 'eraser'){
      this.ctx2.drawImage(this.canvas.current, 0, 0);
      img = this.canvas2.current.toDataURL();
      // 合成完毕还原canvas2
      this.fillCanvasByImg(this.ctx2, this.img)
    }
    this.state.currentStep++;
    this.historyCanvas.push(img)
    this.setState({ currentStep: this.state.currentStep });
  }

  onMouseMove = (event) => {
    if(!this.isOperating) return;
    var currentPoint = this.getCurrentPoint(event)
  
    if(this.state.currentTool === 'pen'){
      //画笔
      this.ctx.strokeStyle = this.state.colors[0] || defaultColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.lineTo(currentPoint.x, currentPoint.y);
      this.ctx.stroke();
    }else if(this.state.currentTool === 'eraser' && this.prevPoint){
      //橡皮
      var x1 = this.prevPoint.x;
      var y1 = this.prevPoint.y;
      var x2 = currentPoint.x;
      var y2 = currentPoint.y;
      var a = eraseRadius;

      //保证线条的连贯，所以在矩形一端画圆擦除
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.arc(x2,y2,a,0,2*Math.PI);
      this.ctx.clip()
      this.ctx.clearRect(0,0,this.canvas.current.width,this.canvas.current.height);
      this.ctx.restore();

      // 确定矩形区域的四个顶点
      var asin = a*Math.sin(Math.atan((y2-y1)/(x2-x1)));
      var acos = a*Math.cos(Math.atan((y2-y1)/(x2-x1)));
      var x3 = x1+asin;
      var y3 = y1-acos;
      var x4 = x1-asin;
      var y4 = y1+acos;
      var x5 = x2+asin;
      var y5 = y2-acos;
      var x6 = x2-asin;
      var y6 = y2+acos;

　　　 //清除矩形剪辑区域里的像素
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.moveTo(x3,y3);
      this.ctx.lineTo(x5,y5);
      this.ctx.lineTo(x6,y6);
      this.ctx.lineTo(x4,y4);
      this.ctx.closePath();
      this.ctx.clip()
      this.ctx.clearRect(0,0,this.canvas.current.width,this.canvas.current.height);
      this.ctx.restore();
    }

    this.prevPoint = currentPoint;
  }

  canvasUndo = () => {
    if(this.state.currentStep <= 0) return;
    let img = this.historyCanvas[--this.state.currentStep];
    this.fillCanvasByImg(this.ctx, img)
    this.setState({ currentStep: this.state.currentStep });
  }

  canvasRedo = () => {
    if(this.state.currentStep >= this.historyCanvas.length-1) return;
    let img = this.historyCanvas[++this.state.currentStep];
    this.fillCanvasByImg(this.ctx, img);
    this.setState({ currentStep: this.state.currentStep });
  }

  downloadImg = () => {
    // 合并两个canvas到canvas2
    this.ctx2.drawImage(this.canvas.current, 0, 0);
    var imgURL = this.canvas2.current.toDataURL('image/png');
    // 合成完毕还原canvas2
    this.fillCanvasByImg(this.ctx2, this.img)
    
    // 下载图片
    var MIME_TYPE = "image/png";
    var dlLink = document.createElement('a');
    dlLink.download = "picture-color" + new Date().valueOf() + ".jpg";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  }

  uploadImg = (inputObj) => {
    var file = document.getElementById('files').files[0];//获取input输入的图片
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
    var reader = new FileReader();
    reader.readAsDataURL(file);//转化成base64数据类型
    let me = this;
    reader.onload = function(e){
        me.img = this.result;
        me.fillCanvasByImg(me.ctx, me.img);
        me.fillCanvasByImg(me.ctx2, me.img);
    }
  }

  render() {
    // 当前画笔的颜色
    const currentColor = this.state.colors[0] || defaultColor;
    
    // 鼠标在图片上移动显示的图案，为画笔或者橡皮
    var cursorImg = '';
    if(this.state.currentTool === 'pen'){
      cursorImg = data.imgs.curBrush;
    }else if(this.state.currentTool === 'eraser'){
      cursorImg = data.imgs.curEraser;
    }

    return (
      <div className="App">
          <canvas className="under-layer"
            ref={ this.canvas2 } 
            width={ data.canvas.width }
            height={ data.canvas.height }
          >
            您的浏览器不支持canvas，请更换浏览器.
          </canvas>
          <canvas className="upper-layer"
            ref={ this.canvas } 
            width={ data.canvas.width }
            height={ data.canvas.height }
            onMouseDown={ this.onMouseDown }
            onMouseUp={ this.onMouseUp }
            onMouseMove={ this.onMouseMove }
            style={{cursor:  'url(' + `${cursorImg}` + '),auto'}}
          >
            您的浏览器不支持canvas，请更换浏览器.
          </canvas>

          <div className="bottom-tools">
            <button onClick={ () => document.getElementById("files").click() }>
              <img src={ data.imgs.upload } alt="upload" />
              <span>上传其他图像</span>
            </button>
            <input id="files" type="file" accept="image/*" 
                   onChange={ this.uploadImg }
                   style={{width: '0.01px', height: '0.01px', visible: 'hidden'}}/>
            <button onClick={ this.downloadImg }>
              <img src={ data.imgs.download } alt="download"/>
              <span>下载</span>
            </button>
         </div>

         <div className="right-tools">
            <div className="common-tools">
              <button className={ this.state.currentStep <= 0? 'disabled': null } onClick={ this.canvasUndo }><img src={ data.imgs.undo } alt="undo"/></button>
              <button className={ this.state.currentStep >= this.historyCanvas.length-1? 'disabled': null } onClick={ this.canvasRedo }><img src={ data.imgs.redo } alt="redo"/></button> 
            </div>
            <div className="color-tools">
              <div className="current-color-container" onClick={ this.displayColorPicker }>
                <div className="current-color" style={{background: `${currentColor}`}} />
              </div>
              <CirclePicker width={ data.circles.width } circleSize={ data.circles.circleSize } circleSpacing={ data.circles.circleSpacing } colors={ this.state.colors } onChange={ this.setColors }/>
              { 
                this.state.displayColorPicker ? 
                  <div className="popover">
                    <SketchPicker 
                      disableAlpha={ true }
                      presetColors={ data.presetColors } 
                      color={ currentColor }
                      onChangeComplete={ this.setColors }
                    />
                  </div> 
                : null 
              }
            </div>
            <div className="toolbox">
              <button onClick={ () => this.setCurrentTool('pen') }><img className={ this.state.currentTool==='pen'? 'active': null } src={ data.imgs.paint } alt="pen" /></button>
              <button onClick={ () => this.setCurrentTool('eraser') }><img className={ this.state.currentTool==='eraser'? 'active': null } src={ data.imgs.eraser } alt="eraser" /></button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
