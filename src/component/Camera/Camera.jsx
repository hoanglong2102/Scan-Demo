import React, { Component } from "react";

class Camera extends Component {
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId },
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  takePhoto = () => {
    const { sendFile } = this.props;
    console.log("sendFile: ", sendFile);
    const context = this.canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 680, 360);
    this.canvas.toBlob(sendFile);
  };

  render() {
    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width="800"
            heigh="500"
          />
        </div>
        <div className="button-field">
          <button onClick={this.takePhoto} className="button button1">
            Take photo!
          </button>
        </div>

        <div className="c-camera-feed__stage">
          <canvas width="680" height="360" ref={(ref) => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}

export default Camera;
