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
    var cw = Math.floor(canvas.clientWidth / 100);
    var ch = Math.floor(canvas.clientHeight / 100);
    return dispatch(doShare(ws, video, canvas, cw, ch));

  };
}
function doShare(ws, video, canvas, width, height) {
  return dispatch, getState => {
    let state = getState();

    let cw = video.clientWidth;
    let ch = video.clientHeight;
    canvas.width= cw;
    canvas.height= ch;
    var backcontext = canvas.getContext('2d');
    backcontext.drawImage(video, 0, 0, cw, ch);
    // Grab the pixel data from the backing canvas
    var stringData = canvas.toDataURL();
    console.log('string', stringData);
    return setTimeout(()=> {
      ws.send(stringData);
      return dispatch(doShare(ws, video, canvas));
    }, 100);
  }
}

function draw(ws, v, back, bc, w, h) {

}