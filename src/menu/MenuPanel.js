import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

class MenuPanelOne extends React.Component{
  render(){
    const {
      menuDisplay,
    } = this.props;

    const menuClassName = classNames(
      'menu_panel',
      {
        'menu_panel--display': menuDisplay
      }
    );

    return(
      <div className = {menuClassName}/>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    menuDisplay: state.menu.menuDisplay,
  }),
  dispatch => ({
  }),
)(MenuPanelOne);
