import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.handleClick(this.props.idx);
  }

  render() {
    let icon = "";
    switch (this.props.val) {
      case 1:
        icon = "one";
        break;
      case 2:
        icon = "two";
        break;
      case 3:
        icon = "three";
        break;
      case 4:
        icon = "four";
        break;
      case 5:
        icon = "five";
        break;
      case 6:
        icon = "six";
        break;
      default:
        icon = this.props.val;
        break;
    }
    console.log("hihihihi", icon);
    return (
      <button
        className="Die"
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        // this.props.handleClick would still receiv an evt argument
        onClick={this.handleClick}
      >
        <i className={`fas fa-dice-${icon}`}></i>
      </button>
    );
  }
}

export default Die;
