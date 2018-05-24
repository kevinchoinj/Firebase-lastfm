import { reducer as reducerForm } from 'redux-form';
import authentication from './authentication';
import pages from './pages';
import lastfm from './lastfm';
import users from './users';
import menu from './menu';

const reducers={
  form: reducerForm,
  authentication,
  pages,
  lastfm,
  users,
  menu,
};

export default reducers;