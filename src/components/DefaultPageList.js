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
        Pages list
      {pages.map((page, key)=>
        <div key={key}>
          <Link to={"/test/"+key}>
            {page.pageTitle}
          </Link>
        </div>
        )
      }
      <br/>
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
