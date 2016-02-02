import Webcam from 'react-webcam';
import Resizer from './../resize.js';
class TircWebcam extends Webcam {

  componentDidMount(){
    super.componentDidMount();
    Resizer.resize(0,1500);
    console.log('do resize');
  }

  componentWillUnmount(){
    Webcam.userMediaRequested = false;
    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {  
        window.URL.revokeObjectURL(this.state.src);
    }
    this.stream.getVideoTracks()[0].stop();
    this.stream = null;
    console.log('will unmount resize');
    Resizer.resize(0,500, true);

  }

}

export default TircWebcam;