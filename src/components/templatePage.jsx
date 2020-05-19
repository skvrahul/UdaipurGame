import React, { Component } from "react";
import GithubCorner from "react-github-corner";
import "./styles/templatePage.css";
class TemplatePage extends Component {
  render() {
    return (
      <div className="full_height">
        <div className="title">
          <h1>Udaipur</h1>
        </div>
        {this.props.content}
        <GithubCorner
          href={"https://github.com/skvrahul/udaipur-game"}
          bannerColor="#64CEAA"
          octoColor="#fff"
          size={80}
          direction="left"
        />
      </div>
    );
  }
}

export default TemplatePage;
