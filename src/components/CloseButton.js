import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from '../actions/pages';

class CloseButton extends React.Component{
  toggleSimilarOfTrack = () => {
    this.props.pagesActions.toggleSimilarOfTrack(false);
  }
  render(){
	  return(
      <div
        onClick = {this.toggleSimilarOfTrack}
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
    isActive: state.pages.similarOfTrack,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(CloseButton);
