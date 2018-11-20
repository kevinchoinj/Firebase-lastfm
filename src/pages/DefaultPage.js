import React from 'react';
import {connect} from 'react-redux';
import {history} from 'store';

class DefaultPage extends React.Component {
  render() {
    let pageId =  this.props.match.params.id;
    const {
      pages,
    } = this.props;

    return pages ? (
      <div>
        <br/>
        DefaultPage
        <br/>
        {pages[pageId].pageTitle}
        <br/>
        {pages[pageId].pageBody}
        <br/><br/>
        <div
          onClick={()=>history.goBack()}
        >
        Go back
      </div>
      </div>
    ):null;
  }
}

export default connect(
  (state, ownProps) => ({
    pages: state.pages.pages,
  }),
  dispatch => ({
  }),
)(DefaultPage);
