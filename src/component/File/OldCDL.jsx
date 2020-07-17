import React, { Component } from "react";
import Tesserect from "tesseract.js";
import { withRouter } from "react-router-dom";

class OldCDL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      documents: [],
    };
  }
  handleChange = (event) => {
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

  generateText = () => {
    let uploads = this.state.uploads;

    for (var i = 0; i < uploads.length; i++) {
      Tesserect.recognize(uploads[i], "vie", { logger: (m) => console.log(m) })
        .catch((err) => {
          console.error(err);
        })
        .then(({ data: { text } }) => {
          console.log(text.split("\n"));
          var arrText = text.split("\n");
          this.setState({
            documents: this.state.documents.concat({
              text: arrText,
            }),
          });
        });
    }
  };
  handleClick = () => {
    this.props.history.push("/cam-old-car-driver-license");
  };
  render() {
    return (
      <div className="content">
        <h1>Old Car Driver License</h1>
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
          <div className="left">
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
          <button onClick={this.generateText} className="button">
            Generate
          </button>
          {this.state.documents.map((value, index) => {
            return (
              <div key={index} className="results__result">
                <div className="results__result__info">
                  <div className="results__result__info__text">
                    <small>
                      <strong>Full Output:</strong> <br />
                      {"LicenseNumber: " +
                        value.text[3].substring(7, value.text[3].lenght)}
                      <br />
                      {" Name: " +
                        value.text[4].substring(16, value.text[4].lenght)}
                      <br />
                      {" DateOfBirth: " +
                        value.text[5].substring(21, value.text[5].lenght)}
                      <br />
                      {" Nationality: " +
                        value.text[6].substring(22, value.text[6].lenght)}
                      <br />
                      {" Address: " +
                        value.text[7].substring(14, value.text[7].lenght) +
                        " " +
                        value.text[8].substring(0, value.text[8].lenght)}
                      <br />
                      {" ExpireDay: " +
                        value.text[12].substring(24, 33, value.text[12].lenght)}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(OldCDL);
