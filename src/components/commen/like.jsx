import React, { Component } from "react";
class Like extends Component {
  state = {};
    test(){
        console.log("amanj")
    }

  render() {
    const { liked, onClick } = this.props;
    return (
      <i
        style={{ cursor: "pointer", fontSize:25 }}
        className={liked ? "bi bi-suit-heart-fill text-danger" : "bi bi-suit-heart"}
        onClick={onClick}
      />
    );
  }
}

export default Like;
