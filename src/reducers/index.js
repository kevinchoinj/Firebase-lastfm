import { reducer as reducerForm } from 'redux-form';
import authentication from './authentication';
import pages from './pages';

const reducers={
  form: reducerForm,
  authentication,
  pages,
};

export default reducers;