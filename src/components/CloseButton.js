import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class CloseButton extends React.Component{
  render(){
	  return(
      <div
        onClick = {this.props.toggleAction}
        className = 'close_container'
      >
          <span
            className = 'close_line1'
          >
          </span>
          <span
            className = 'close_line2'
          >
          </span>
			</div>

	  );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
  }),
)(CloseButton);
