import React, { Component } from "react";
import GithubCorner from "react-github-corner";
import "./styles/templatePage.css";
import { Link } from "react-router-dom";
class TemplatePage extends Component {
  render() {
    return (
      <div className="full_height">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="title">
            <div class="udaipur-logo" />
            <div class="title-text">Udaipur</div>
          </div>
        </Link>
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
