let socket = require('socket.io-client')('ws://localhost');
if (!"WebSocket" in window){
  alert ('WebSocket not supported');
}
export function connectWebsocket(){
  console.log('connecting to websocket');
  return dispatch => {

  };

}
export function shareVideo(id){
  return dispatch => {
  
   /*



    let socket = new io.Socket('localhost',{
      port: 8080
    });
    socket.connect(); 
    var video = document.getElementsByTagName(id)[0];
    let canvasWidth = 640;
    let canvasHeight = 480;
    let back = document.getElementById('video-canvas');
    var backcontext = back.getContext('2d');
    draw(video, back, backcontext, video.offsetWidth, video.offsetHeight);
    console.log('on media',e);  
    */ 
  };
}

function draw(v, back,bc, w, h) {
  bc.drawImage(v, 0, 0, w, h);
  // Grab the pixel data from the backing canvas
  var stringData=back.toDataURL();
  console.log('string', stringData);
  setTimeout(() => { this.draw(v,back, bc, w, h); });

}