import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {
    let state = this.props.score ? 'disabled' : 'active'
    console.log(this.props.score ? true : false);
    return state === 'active' ? (
      <tr className={`RuleRow RuleRow-${state}`} onClick={this.props.doScore} >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    ) : <tr className={`RuleRow RuleRow-${state}`}  >
    <td className="RuleRow-name">{this.props.name}</td>
    <td className="RuleRow-score">{this.props.score}</td>
  </tr>
  }
}

export default RuleRow;