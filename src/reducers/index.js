import { reducer as reducerForm } from 'redux-form';
import authentication from 'reducers/authentication';
import pages from 'reducers/pages';
import lastfm from 'reducers/lastfm';
import users from 'reducers/users';
import menu from 'reducers/menu';

const reducers={
  form: reducerForm,
  authentication,
  pages,
  lastfm,
  users,
  menu,
};

export default reducers;