import React from 'react';
import './App.css';
import { SketchPicker } from 'react-color';

// 调色板下方的自定义色块
const presetColors = [
"#2F4F4F", "#708090", "#778899", "#696969", "#A9A9A9", "#D3D3D3", "#DCDCDC", "#B0C4DE", "#00008B", "#191970", 
"#483D8B", "#4B0082", "#0000CD", "#7B68EE", "#4169E1", "#6495ED", "#008BBB", "#4682B4", "#1E90FF", "#00BFFF",
"#87CEFA", "#87CEEB", "#ADD8E6", "#00FFFF", "#5F9EA0", "#20B2AA", "#66CDAA", "#00CED1", "#48D1CC", "#40E0D0",
"#B0E0E6", "#AFEEEE", "#6B8E23", "#556B2F", "#006400", "#228B22", "#2E8B57", "#3CB371", "#32CD32", "#9ACD32",
"#7FFFD4", "#00FA9A", "#00FF7F", "#7CFC00", "#7FFF00", "#ADFF2F", "#90EE90", "#98FB98", "#8B008B", "#6A5ACD",
"#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#9370DB", "#8FBC8F", "#8B0000", "#8B4513", "#A52A2A", "#B22222"
]

class App extends React.Component {
  constructor(){
      super();
      this.canvas = React.createRef();
      this.state = {
        color: "pink", // 当前选中的颜色
        data: [        // data-item: {x: , y: , color: , radius: }
          { x: 100, y: 50, color: "pink", radius: 10},
          { x: 160, y: 90, color: "cyan", radius: 10}
        ]       
      };
      this.drawCircle = this.drawCircle.bind(this);
      this.eraseCircle = this.eraseCircle.bind(this);
      this.fillCanvasByImg = this.fillCanvasByImg.bind(this);
      this.setData = this.setData.bind(this);
      this.setColor = this.setColor.bind(this);
  }

  setColor(color){
    this.setState({
      color: color.hex
    })
  }

  // 在组件挂载后（插入 DOM 树中）立即调用，用来初始化页面
  componentDidMount() {
    // 渲染线图
    var img = require("./img/line.jpg")
    this.fillCanvasByImg(img)
  }

  fillCanvasByImg(img) {
    const ctx = this.canvas.current.getContext('2d');
    var myImgObj = new Image();
    myImgObj.src = img;
    myImgObj.onload = function(){
      ctx.drawImage(myImgObj,0,0);
    }
  }

  setData(event){
    var canvas = this.canvas.current;
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left);
    var y = (event.clientY - rect.top);

    var newItem = { x: x, y: y, color: this.state.color, radius: 10}
    this.state.data.push(newItem)
    let data = this.state.data;
    this.setState({
      data: data
    })
  }

  // 单击画布时触发，在当前位置画一个圆形色块
  drawCircle(item, i){
    if(isNaN(item.x)) return;
    return (
      <circle cx={item.x} cy={item.y} r={item.radius} fill={item.color} onDoubleClick={this.eraseCircle.bind(this, i)} key={i}/>
    )
  }

  // 双击圆形色块时触发，擦除该圆形色块
  eraseCircle(i){
    this.state.data.splice(i,1);
    let data = this.state.data;
    this.setData({
      data: data
    })
  }

  componentWillReceiveProps(){}

  render() {
    return (
      <div className="App">
          <div className="img-container">
              <div className="under-layer">
                <canvas ref={this.canvas} width="1000" height="1000" onClick={this.setData}>
                  您的浏览器不支持canvas，请更换浏览器.
                </canvas>
              </div>
              <div className="upper-layer">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  {this.state.data.map((item, i) => {
                      return (this.drawCircle(item, i))
                  })}
                </svg>
              </div>
          </div>
          <div class="color-container">
              <SketchPicker 
                width="250px" 
                presetColors={ presetColors } 
                color={ this.state.color }
                onChangeComplete={ this.setColor }
              />
         </div>
      </div>
    );
  }
}

export default App;
