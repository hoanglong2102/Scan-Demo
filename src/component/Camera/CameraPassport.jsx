import React, { Component } from "react";
import Camera from "./Camera";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Passport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infor: {},
    };
  }

  handleClick = () => {
    this.props.history.push("/passport");
  };

  uploadImage = async (file) => {
    const formData = new FormData();
    console.log("Images: ", file);
    formData.append("image", file);
    axios
      .post(
        "https://app.akadoc.ai/api/v2/scan/document?doc_type=passport",
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
        <h1> Camera Passport</h1>
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
        <div>
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
        <div>
          <p>
            <b>Document Type:</b> {this.state.infor.document_type}
          </p>
          <p>
            <b>Document Number:</b> {this.state.infor.document_number}
          </p>
          <p>
            <b>Personal Document Number:</b>
            {this.state.infor.personal_document_number}
          </p>
          <p>
            <b>Name:</b> {this.state.infor.name}
          </p>
          <p>
            <b>Gender:</b> {this.state.infor.gender}
          </p>
          <p>
            <b>Date Of Birth:</b> {this.state.infor.date_of_birth}
          </p>
          <p>
            <b>Expiration Date:</b> {this.state.infor.expiration_date}
          </p>
          <p>
            <b>Nationality:</b> {this.state.infor.nationality}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Passport);
