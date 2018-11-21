import React from 'react';
import {Field, reduxForm} from 'redux-form';
import FontAwesome from 'react-fontawesome';

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, warning }
}) => (
  <div>
    <input {...input}
      placeholder={placeholder}
      type={type}
      className="form_field"
    />

  </div>
)

const LastfmUsernameForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="spacing_left">
      <div className="form_label spacing_bottom">
        Lastfm Username
      </div>
      <div className="form_container">
        <Field
          name="username"
          placeholder=''
          type="text"
          component={renderField}
        />
      <div>
        <button
          type="submit"
          disabled = {submitting}
          className="form_button"
        >
          <FontAwesome name="play"/>
        </button>
      </div>
      </div>
    </form>
  );
};


export default reduxForm({
  form: "lastfmUsername",
  enableReinitialize: true,
})(LastfmUsernameForm);



