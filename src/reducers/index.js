import { reducer as reducerForm } from 'redux-form';
import authentication from './authentication';
import pages from './pages';
import lastfm from './lastfm';
import users from './users';

const reducers={
  form: reducerForm,
  authentication,
  pages,
  lastfm,
  users,
};

export default reducers;