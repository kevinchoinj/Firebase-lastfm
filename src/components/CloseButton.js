import React from "react";

class CloseButton extends React.Component{
  render(){
	  return(
      <div
        onClick = {this.props.toggleAction}
        className = "close_container"
      >
          <span className = "close_line1"/>
          <span className = "close_line2"/>
			</div>

	  );
  }
}

export default CloseButton;