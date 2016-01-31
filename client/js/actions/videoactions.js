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
  return dispatch => {
    var backcontext = canvas.getContext('2d');
    backcontext.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
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