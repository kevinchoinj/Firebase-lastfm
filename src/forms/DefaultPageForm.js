import React from 'react';
import {Field, reduxForm} from 'redux-form';
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
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
)

const LoginForm = props => {
  const { handleSubmit, submitting, error } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          Page Name
        </div>
        <Field
          name="currentPage"
          type="text"
          component={renderField}
        />
      </div>

      <div>
        <div>
          Page Title
        </div>
        <Field
          name="pageTitle"
          type="text"
          component={renderField}
        />
      </div>

      <div>
        <div>
          Page Body
        </div>
        <Field
          name="pageBody"
          type="text"
          component={renderField}
        />
      </div>

      {error && <strong>{error}</strong>}
      <div className="user_row">
        <Button
          type="submit"
          disabled = {submitting}
        >
          Create Page
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "login",
  enableReinitialize: true,
})(LoginForm);
