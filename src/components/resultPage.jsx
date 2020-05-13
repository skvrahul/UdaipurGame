import React, { Component } from "react";
class ResultPage extends Component {
  render() {
    return (
      <div className="full_height">
        <div className="title">
          <h1>Udaipur</h1>
        </div>
        <div>Congratulations you have won!</div>
        <div className="scoreboard">
          <div className="score-item winner">
            <span className="username">skvrahul</span>
            <span className="score"> 96 </span>
          </div>
          <div className="score-item loser me">
            <span className="username">some-dude</span>
            <span className="score"> 69 </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;
