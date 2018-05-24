import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

class MenuPanel extends React.Component{
  render(){

    const {
      isHidden,
    } = this.props;

    const menuClassName = classNames(
      'menu_panel',
      {
        'menu_panel--hidden':isHidden
      }
    );

    return(
      <div
        className = {menuClassName}
      >
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    isHidden:state.menu.isHidden,
  }),
  dispatch => ({
  }),
)(MenuPanel);
