import React from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import SimilarImage from '../components/SimilarImage';
import classNames from 'classnames';

class RegisterPanel extends React.Component {
  onSubmit = values => {
    this.props.authActions.signUpUserThenRedirect(values, '/');
  }
  render() {
    const {
      isActive,
    } = this.props;

    const panelName = classNames(
      'favorite_panel',
      {
        'favorite_panel--display': isActive,
      }
    );

    return (
      <div className={panelName}>
        <SimilarImage />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
  }),
)(RegisterPanel);
