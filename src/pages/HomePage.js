import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pagesActions from 'actions/pages';

class HomePage extends React.Component {
  componentDidMount(){
    this.props.pagesActions.setPage('lastfmHome');
  }
  render() {
    return null;
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(HomePage);
