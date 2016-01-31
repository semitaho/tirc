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
    let back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    backcontext.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    // Grab the pixel data from the backing canvas
    var stringData = back.toDataURL();
    console.log('string', stringData);
    setTimeout(()=> {
      ws.send(stringData);
      dispatch(shareVideo(ws, id));

    });
  };
}

function draw(ws, v, back, bc, w, h) {

}