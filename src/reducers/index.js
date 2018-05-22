import { reducer as reducerForm } from 'redux-form';
import authentication from './authentication';
import pages from './pages';
import lastfm from './lastfm';

const reducers={
  form: reducerForm,
  authentication,
  pages,
  lastfm,
};

export default reducers;