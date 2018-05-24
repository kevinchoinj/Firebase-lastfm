import React from "react";
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menuActions from '../actions/menu';

class MenuButton extends React.Component{
  toggleMenu = () => {
    this.props.menuActions.toggleMenu(!this.props.isHidden);
  }
  render(){
    const {
      isHidden,
    } = this.props;

    const menuLine1Names= classNames(
      'menu_line1',
      {
        'menu_line1--closed':isHidden,
      }
    );
    const menuLine2Names= classNames(
      'menu_line2',
      {
        'menu_line2--closed':isHidden,
      }
    );
    const menuLine3Names= classNames(
      'menu_line3',
      {
        'menu_line3--closed':isHidden,
      }
    );
	  return(
      <div
        onClick = {this.toggleMenu}
        className = 'menu_btn'
      >
        <div
          className = 'menu_btn__container'
        >
          <span
            className = {menuLine1Names}
          >
          </span>
          <span
            className = {menuLine2Names}
          >
          </span>
          <span
            className = {menuLine3Names}
          >
          </span>
        </div>
			</div>

	  );
  }
}

export default connect(
  (state, ownProps) => ({
    isHidden:state.menu.isHidden,
  }),
  dispatch => ({
    menuActions: bindActionCreators(menuActions, dispatch),
  }),
)(MenuButton);
