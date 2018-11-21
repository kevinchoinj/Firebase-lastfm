import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GetFavorites from 'requests/GetFavorites';
import * as authActions from 'actions/authentication';

const FavoritesDisplay = ({loggedIn}) => {
  if (loggedIn){
    return (<GetFavorites/>);
  }
  else {
    return  null;
  }
};

class SetUser extends React.Component{
  setUser = email => {
    this.props.authActions.setCurrentUser(email);
  }
  componentDidMount(){
    this.props.authActions.getCurrentUser();
  }
  render(){
    const {
      loggedIn,
    } = this.props;

    return (
      <FavoritesDisplay
        loggedIn={loggedIn}
      />
    );
  }
}
export default connect(
  (state, ownProps) => ({
    loggedIn: state.authentication.loggedIn,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)}),
)(SetUser);