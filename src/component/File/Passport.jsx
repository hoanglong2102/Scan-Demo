import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Passport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      documents: [],
      image: null,
      infor: {},
    };
  }
  handleChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      this.setState({
        uploads: uploads,
      });
    } else {
      this.setState({
        uploads: [],
      });
    }
  };
  handleClick = () => {
    this.props.history.push("/cam-passport");
  };

  generateText = () => {
    let formData = new FormData();
    formData.append("image", this.state.image);
    console.log(">> formData >> ", formData);

    // You should have a server side REST API
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
        //handle success
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
        <h1>Passport</h1>
        <form>
          <label className="radio-inline">
            <input type="radio" name="optradio" checked />
            <b>File</b>
          </label>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <label className="radio-inline">
            <input type="radio" name="optradio" onClick={this.handleClick} />{" "}
            <b>Camera</b>
          </label>
        </form>
        <div>
          <h4>Front</h4>
          <input
            type="file"
            id="fileUploader"
            onChange={this.handleChange}
            multiple
          />

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="300px" />;
            })}
          </div>
        </div>
        <div className="button-field">
          {" "}
          <button onClick={this.generateText} className="button button1">
            Generate
          </button>
        </div>
        <div className="text">
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
