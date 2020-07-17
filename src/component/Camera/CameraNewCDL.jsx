import React, { Component } from "react";
import Camera from "./Camera";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CameraNewCDL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infor: {},
    };
  }

  handleClick = () => {
    this.props.history.push("/car-driver-license");
  };

  uploadImage = async (file) => {
    const formData = new FormData();
    console.log("Images: ", file);
    formData.append("image", file);
    axios
      .post(
        "https://app.akadoc.ai/api/v2/scan/document?doc_type=vn_dl",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Res: ", response);
        if (response !== undefined && response !== null) {
          if (response.data !== undefined && response.data !== undefined) {
            this.setState({
              infor: response.data.data,
            });
          }
        }
      });
  };
  render() {
    return (
      <div className="content">
        <h1> Camera New Car Driver License</h1>
        <form>
          <label className="radio-inline">
            <input type="radio" name="optradio" onClick={this.handleClick} />
            <b>File</b>
          </label>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <label className="radio-inline">
            <input type="radio" name="optradio" checked /> <b>Camera</b>
          </label>
        </form>
        <Camera sendFile={this.uploadImage} />
        <div className="text-camera">
          <p>
            <b>Name:</b> {this.state.infor.name}
          </p>
          <p>
            <b>Date Of Birth:</b> {this.state.infor.date_of_birth}
          </p>
          <p>
            <b>License Number:</b> {this.state.infor.license_number}
          </p>
          <p>
            <b>Nationality:</b> {this.state.infor.nationality}
          </p>
          <p>
            <b>Address:</b> {this.state.infor.address}
          </p>
          <p>
            <b>Expiry Date:</b> {this.state.infor.expiry_date}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(CameraNewCDL);
