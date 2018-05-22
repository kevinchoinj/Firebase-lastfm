import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as pagesActions from './actions/pages';

class GetPages extends React.Component{
  componentDidMount(){
    console.log('@@');
    this.props.pagesActions.getPages();
  }
  render(){
    return null;
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch)}),
)(GetPages);