(this["webpackJsonppicture-color"]=this["webpackJsonppicture-color"]||[]).push([[0],{262:function(t,e,a){"use strict";a.r(e),a.d(e,"presetColors",(function(){return n})),a.d(e,"imgs",(function(){return r})),a.d(e,"circles",(function(){return c})),a.d(e,"canvas",(function(){return s}));var n=["#2F4F4F","#708090","#778899","#696969","#A9A9A9","#D3D3D3","#DCDCDC","#B0C4DE","#00008B","#191970","#483D8B","#4B0082","#0000CD","#7B68EE","#4169E1","#6495ED","#008BBB","#4682B4","#1E90FF","#00BFFF","#87CEFA","#87CEEB","#ADD8E6","#00FFFF","#5F9EA0","#20B2AA","#66CDAA","#00CED1","#48D1CC","#40E0D0","#B0E0E6","#AFEEEE","#6B8E23","#556B2F","#006400","#228B22","#2E8B57","#3CB371","#32CD32","#9ACD32","#7FFFD4","#00FA9A","#00FF7F","#7CFC00","#7FFF00","#ADFF2F","#90EE90","#98FB98","#8B008B","#6A5ACD","#8A2BE2","#9400D3","#9932CC","#BA55D3","#9370DB","#8FBC8F","#8B0000","#8B4513","#A52A2A","#B22222","#A0522D","#CD5C5C","#D2691E","#BDB76B","#DC143C","#FF1493","#FF69B4","#FF00FF","#DA70D6","#EE82EE","#DDA0DD","#D8BfD8","#BC8F8F","#C71585","#DB7093","#E9967A","#F08080","#FFA07A","#FFB6C1","#FFC0CB","#FF4500","#FF6347","#FF4F50","#FA8072","#FF8C00","#FFA500","#F4A460","#E6E6FA","#B8860B","#CD853F","#DAA520","#D2B48C","#DEB887","#FFD700","#FFE4E1","#E0FFFF","#F0E68C","#EEE8AA","#FAFAD2","#FFFACD","#F5F5DC","#FFF8DC","#FFFFE0","#FFDAB9","#F5DEB3","#FFDEAD","#FFE4B5","#FFE4C4","#FFEBCD","#FFEFD5","#FAEBD7","#FFF0F5","#F0DDC3","#EAB69C","#F0DDD0","#F7CEB5","#EEBB99","#F0D0B6","#EAA98F","#DDA98F","#F7D9D6","#E2C7B3","#F7C39C","#DDA982","#EAD0B6","#F0BAAD","#A6958D","#F0DDB6","#EAC3A9","#D4806B","#9E8B82","#EAB68F","#F7D0C3","#F7B69C","#EBB285","#F7C3A9","#F7D0B6","#F0C3A9","#C3744D","#F0D0A9","#EAC3B6","#F0A982","#452A1D","#F7D0A9","#F7DDC3","#F0B68F","#ECDDCA","#F9F9F9"],r={line:a(263),download:a(264),upload:a(265),eraser:a(266),paint:a(267),redo:a(268),undo:a(269),curBrush:a(270),curEraser:a(271)},c={width:"63px",circleSize:17,circleSpacing:4},s={width:1e3,height:1e3}},263:function(t,e,a){t.exports=a.p+"static/media/line.0fa4b773.jpg"},264:function(t,e,a){t.exports=a.p+"static/media/download.02a1ddf8.svg"},265:function(t,e,a){t.exports=a.p+"static/media/upload.b2ea1bd9.svg"},266:function(t,e,a){t.exports=a.p+"static/media/hint_eraser.1436a7ca.svg"},267:function(t,e,a){t.exports=a.p+"static/media/hint_paint.7f731611.svg"},268:function(t,e,a){t.exports=a.p+"static/media/hint_redo.d976e955.svg"},269:function(t,e,a){t.exports=a.p+"static/media/hint_undo.7abd66e6.svg"},270:function(t,e,a){t.exports=a.p+"static/media/cursor_brush_s.d5e1d43e.cur"},271:function(t,e,a){t.exports=a.p+"static/media/cursor_eraser_s.86d045f5.cur"},272:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),c=a(84),s=a.n(c),i=(a(95),a(85)),o=a(86),l=a(88),u=a(87),h=a(29),F=a(89),d=(a(96),a(30)),p=a(262),m="pink",v=8,C=8,E=function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(l.a)(this,Object(u.a)(e).call(this))).fillCanvasByImg=function(t,e){var a=new Image;a.src=e,a.onload=function(){t.drawImage(a,0,0,p.canvas.width,p.canvas.height)}},t.setColors=function(e){var a=t.state.colors,n=a.indexOf(e.hex);n>=0&&a.splice(n,1),a.unshift(e.hex),t.setState({colors:a})},t.setCurrentTool=function(e){t.setState({currentTool:e})},t.displayColorPicker=function(){t.setState({displayColorPicker:!t.state.displayColorPicker})},t.getCurrentPoint=function(e){var a=t.canvas.current,n=a.getBoundingClientRect();return{x:(e.clientX-n.left)*(a.width/n.width),y:(e.clientY-n.top)*(a.height/n.height)}},t.onMouseDown=function(e){var a=t.getCurrentPoint(e);t.ctx.beginPath(),t.ctx.moveTo(a.x,a.y),t.isOperating=!0,t.prevPoint=a},t.onMouseUp=function(e){if(t.isOperating=!1,t.prevPoint=null,t.state.currentStep!=t.historyCanvas.length-1){var a=t.historyCanvas[t.state.currentStep];t.historyCanvas=[],t.historyCanvas.push(a),t.state.currentStep=0}var n=null;"pen"===t.state.currentTool?n=t.canvas.current.toDataURL():"eraser"===t.state.currentTool&&(t.ctx2.drawImage(t.canvas.current,0,0),n=t.canvas2.current.toDataURL(),t.fillCanvasByImg(t.ctx2,t.img)),t.state.currentStep++,t.historyCanvas.push(n),t.setState({currentStep:t.state.currentStep})},t.onMouseMove=function(e){if(t.isOperating){var a=t.getCurrentPoint(e);if("pen"===t.state.currentTool)t.ctx.strokeStyle=t.state.colors[0]||m,t.ctx.lineWidth=v,t.ctx.lineTo(a.x,a.y),t.ctx.stroke();else if("eraser"===t.state.currentTool&&t.prevPoint){var n=t.prevPoint.x,r=t.prevPoint.y,c=a.x,s=a.y,i=C;t.ctx.save(),t.ctx.beginPath(),t.ctx.arc(c,s,i,0,2*Math.PI),t.ctx.clip(),t.ctx.clearRect(0,0,t.canvas.current.width,t.canvas.current.height),t.ctx.restore();var o=i*Math.sin(Math.atan((s-r)/(c-n))),l=i*Math.cos(Math.atan((s-r)/(c-n))),u=n+o,h=r-l,F=n-o,d=r+l,p=c+o,E=s-l,g=c-o,D=s+l;t.ctx.save(),t.ctx.beginPath(),t.ctx.moveTo(u,h),t.ctx.lineTo(p,E),t.ctx.lineTo(g,D),t.ctx.lineTo(F,d),t.ctx.closePath(),t.ctx.clip(),t.ctx.clearRect(0,0,t.canvas.current.width,t.canvas.current.height),t.ctx.restore()}t.prevPoint=a}},t.canvasUndo=function(){if(!(t.state.currentStep<=0)){var e=t.historyCanvas[--t.state.currentStep];t.fillCanvasByImg(t.ctx,e),t.setState({currentStep:t.state.currentStep})}},t.canvasRedo=function(){if(!(t.state.currentStep>=t.historyCanvas.length-1)){var e=t.historyCanvas[++t.state.currentStep];t.fillCanvasByImg(t.ctx,e),t.setState({currentStep:t.state.currentStep})}},t.downloadImg=function(){t.ctx2.drawImage(t.canvas.current,0,0);var e=t.canvas2.current.toDataURL({format:"png",multiplier:4}),a=(e.substr(22,e.length),t.dataURLtoBlob(e)),n=URL.createObjectURL(a);t.fillCanvasByImg(t.ctx2,t.img);var r=document.createElement("a");r.download="picture-color"+(new Date).valueOf()+".png",r.href=n,document.body.appendChild(r),r.click(),document.body.removeChild(r)},t.uploadImg=function(e){var a=document.getElementById("files").files[0];if(!/image\/\w+/.test(a.type))return alert("\u8bf7\u786e\u4fdd\u6587\u4ef6\u4e3a\u56fe\u50cf\u7c7b\u578b"),!1;var n=new FileReader;n.readAsDataURL(a);var r=Object(h.a)(t);n.onload=function(t){r.initCanvas(this.result),r.setState({currentStep:r.state.currentStep})}},t.dataURLtoBlob=function(t){for(var e=t.split(","),a=e[0].match(/:(.*?);/)[1],n=atob(e[1]),r=n.length,c=new Uint8Array(r);r--;)c[r]=n.charCodeAt(r);return new Blob([c],{type:a})},t.canvas=r.a.createRef(),t.canvas2=r.a.createRef(),t.isOperating=!1,t.prevPoint=null,t.historyCanvas=[],t.state={currentTool:"pen",displayColorPicker:!1,colors:[],currentStep:-1},t}return Object(F.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.ctx=this.canvas.current.getContext("2d"),this.ctx2=this.canvas2.current.getContext("2d"),this.initCanvas(p.imgs.line)}},{key:"initCanvas",value:function(t){this.img=t,this.fillCanvasByImg(this.ctx,this.img),this.fillCanvasByImg(this.ctx2,this.img),this.historyCanvas=[],this.historyCanvas.push(this.img),this.state.currentStep=0}},{key:"render",value:function(){var t=this,e=this.state.colors[0]||m,a="";return"pen"===this.state.currentTool?a=p.imgs.curBrush:"eraser"===this.state.currentTool&&(a=p.imgs.curEraser),r.a.createElement("div",{className:"App"},r.a.createElement("canvas",{className:"under-layer",ref:this.canvas2,width:p.canvas.width,height:p.canvas.height},"\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301canvas\uff0c\u8bf7\u66f4\u6362\u6d4f\u89c8\u5668."),r.a.createElement("canvas",{className:"upper-layer",ref:this.canvas,width:p.canvas.width,height:p.canvas.height,onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onMouseMove:this.onMouseMove,style:{cursor:"url("+"".concat(a)+"),auto"}},"\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301canvas\uff0c\u8bf7\u66f4\u6362\u6d4f\u89c8\u5668."),r.a.createElement("div",{className:"bottom-tools"},r.a.createElement("button",{onClick:function(){return document.getElementById("files").click()}},r.a.createElement("img",{src:p.imgs.upload,alt:"upload"}),r.a.createElement("span",null,"\u4e0a\u4f20\u5176\u4ed6\u56fe\u50cf")),r.a.createElement("input",{id:"files",type:"file",accept:"image/*",onChange:this.uploadImg,style:{width:"0.01px",height:"0.01px",visible:"hidden"}}),r.a.createElement("button",{onClick:this.downloadImg},r.a.createElement("img",{src:p.imgs.download,alt:"download"}),r.a.createElement("span",null,"\u4e0b\u8f7d"))),r.a.createElement("div",{className:"right-tools"},r.a.createElement("div",{className:"common-tools"},r.a.createElement("button",{className:this.state.currentStep<=0?"disabled":null,onClick:this.canvasUndo},r.a.createElement("img",{src:p.imgs.undo,alt:"undo"})),r.a.createElement("button",{className:this.state.currentStep>=this.historyCanvas.length-1?"disabled":null,onClick:this.canvasRedo},r.a.createElement("img",{src:p.imgs.redo,alt:"redo"}))),r.a.createElement("div",{className:"color-tools"},r.a.createElement("div",{className:"current-color-container",onClick:this.displayColorPicker},r.a.createElement("div",{className:"current-color",style:{background:"".concat(e)}})),r.a.createElement(d.CirclePicker,{width:p.circles.width,circleSize:p.circles.circleSize,circleSpacing:p.circles.circleSpacing,colors:this.state.colors,onChange:this.setColors}),this.state.displayColorPicker?r.a.createElement("div",{className:"popover"},r.a.createElement(d.SketchPicker,{disableAlpha:!0,presetColors:p.presetColors,color:e,onChangeComplete:this.setColors})):null),r.a.createElement("div",{className:"toolbox"},r.a.createElement("button",{onClick:function(){return t.setCurrentTool("pen")}},r.a.createElement("img",{className:"pen"===this.state.currentTool?"active":null,src:p.imgs.paint,alt:"pen"})),r.a.createElement("button",{onClick:function(){return t.setCurrentTool("eraser")}},r.a.createElement("img",{className:"eraser"===this.state.currentTool?"active":null,src:p.imgs.eraser,alt:"eraser"})))))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},90:function(t,e,a){t.exports=a(272)},95:function(t,e,a){},96:function(t,e,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.084768ff.chunk.js.map