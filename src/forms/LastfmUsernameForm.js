import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Button} from 'react-bootstrap';

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
      className="user_form_field"
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
)

const LastfmUsernameForm = props => {
  const { handleSubmit, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="spacing_bottom__large">
        <div className="form_label spacing_bottom">
          Lastfm Username
        </div>
        <Field
          name="username"
          placeholder="shodyra"
          type="text"
          component={renderField}
        />
      </div>
      {error && <strong>{error}</strong>}
      <div className="user_row">
        <Button
          type="submit"
          disabled = {submitting}
          className="user_button user_button_color"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "lastfmUsername",
  enableReinitialize: true,
})(LastfmUsernameForm);
