import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input}
      placeholder={placeholder}
      type={type}
      className="form_field"
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
)

const LastfmUsernameForm = props => {
  const { handleSubmit, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit} className="spacing_left">
      <div className="form_label spacing_bottom">
        Lastfm Username
      </div>
      <div className="form_container">
        <Field
          name="username"
          placeholder=""
          type="text"
          component={renderField}
        />
      <div>
        <Button
          type="submit"
          disabled = {submitting}
          className="form_button"
        >
          <FontAwesome name="play"/>
        </Button>
      </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "lastfmUsername",
  enableReinitialize: true,
})(LastfmUsernameForm);
