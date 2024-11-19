import store, { signOutSuccess } from '../store';

export const signOut = () => {
  store.dispatch(signOutSuccess());
  window.location.href = '/login';
};