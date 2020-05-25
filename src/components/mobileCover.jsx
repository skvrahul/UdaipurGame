import React, { Component } from "react";
import TemplatePage from "./templatePage";
class MobileCover extends Component {
  state = {};
  render() {
    return (
      <TemplatePage
        content={
          <div style={{ fontSize: 35 }}>
            Sorry , this page is currently available only on a Desktop Browser.
          </div>
        }
      />
    );
  }
}

export default MobileCover;
