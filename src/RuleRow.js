import React, { Component } from "react";
import "./RuleRow.css";

class RuleRow extends Component {
  render() {
    // this fix (!= null) is key to show the value of 0 marked with CSS
    let state = this.props.score != null ? "disabled" : "active";
    // console.log("is it null", this.props.score != null);
    let decide = this.props.score != null ? () => "" : this.props.doScore;
    let score =
      this.props.score != null ? this.props.score : this.props.description;
    return (
      <tr className={`RuleRow RuleRow-${state}`} onClick={decide}>
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{score}</td>
      </tr>
    );
  }
}

export default RuleRow;
