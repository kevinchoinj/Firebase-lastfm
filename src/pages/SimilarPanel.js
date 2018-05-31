import React from 'react';
import {connect} from 'react-redux';
import CloseButton from '../components/CloseButton';
import SimilarImage from '../components/SimilarImage';
import classNames from 'classnames';
import {history} from '../store';

class RegisterPanel extends React.Component {
  onSubmit = values => {
    this.props.authActions.signUpUserThenRedirect(values, '/');
  }
  returnHome = () => {
    history.push("/");
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
        <CloseButton
          toggleAction= {this.returnHome}
        />
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
