import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DefaultPageForm from '../forms/DefaultPageForm';
import {Link} from 'react-router-dom';

import * as pagesActions from '../actions/pages';

class Home extends React.Component {
  onSubmit = values => {
    this.props.pagesActions.createPageThenRedirect(values, '/');
  };
  render() {
    const {
      loggedIn,
    } = this.props;

    return loggedIn ? (
      <div>
        Admin
       <DefaultPageForm onSubmit={this.onSubmit}/>
      </div>
    ):
    (
      <div>
        Log in to continue
        <Link to="/login">
        Log in
        </Link>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    pagesActions: bindActionCreators(pagesActions, dispatch),
  }),
)(Home);
