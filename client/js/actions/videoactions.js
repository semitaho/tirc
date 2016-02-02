export function connectWebsocket() {
  console.log('connecting to websocket');
  return dispatch => {

  };

}
function onmessage(msg) {
  console.log('got message', msg)

}

export function receiveFrame(data) {
  return {
    type: 'RECEIVE_FRAME',
    data
  };
}


export function shareVideo(ws, id) {
  return dispatch => {
    var video = document.getElementsByTagName(id)[0];
    let canvas = document.createElement('canvas');
    return dispatch(doShare(ws, video, canvas));

  };
}
function doShare(ws, video, canvas) {
  return (dispatch, getState) => {
    let state = getState();
    if (!state.tabs.showvideo){
      console.log('ei nayteta');
      return;
    }
    let cw = video.clientWidth;
    let ch = video.clientHeight;
    canvas.width= cw;
    canvas.height= ch;
 
    var backcontext = canvas.getContext('2d');
    backcontext.drawImage(video, 0, 0, cw, ch);
    // Grab the pixel data from the backing canvas
    var stringData = canvas.toDataURL();
    return setTimeout(()=> {
      ws.send(stringData);
      return dispatch(doShare(ws, video, canvas));
    }, 20);
  }
}

function draw(ws, v, back, bc, w, h) {

}