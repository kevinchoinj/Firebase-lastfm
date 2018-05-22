import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class CheckStatus extends React.Component {
  render() {

    const {
      pages,
    } = this.props;

    return pages ? (
      <div>
      {pages.map((page, key)=>
        <Link to={"/test/"+key}>
          <div key={key}>
            {page.pageTitle}
          </div>
        </Link>
        )
      }
      </div>
    )
    :null;
  }
}

export default connect(
  (state, ownProps) => ({
    pages: state.pages.pages,
  }),
  dispatch => ({
  }),
)(CheckStatus);
