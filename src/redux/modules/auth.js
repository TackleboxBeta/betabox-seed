import { socket } from 'app';
import { SubmissionError } from 'redux-form';
import cookie from 'js-cookie';
import { ERRORS } from '../../strings';

const LOAD = 'redux/auth/LOAD';
const LOAD_SUCCESS = 'redux/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/auth/LOAD_FAIL';
const LOGIN = 'redux/auth/LOGIN';
const LOGIN_SUCCESS = 'redux/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux/auth/LOGIN_FAIL';
const REGISTER = 'redux/auth/REGISTER';
const REGISTER_SUCCESS = 'redux/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux/auth/REGISTER_FAIL';
const FORGOT_PASSWORD = 'redux/auth/FORGOT_PASSWORD';
const FORGOT_PASSWORD_SUCCESS = 'redux/auth/FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAIL = 'redux/auth/FORGOT_PASSWORD_FAIL';
const LOGOUT = 'redux/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accessToken: action.result.accessToken,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        accessToken: action.result.accessToken,
        user: action.result.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        accessToken: null,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({
      _error: {
        /* ERROR codes mapping to messages should be entered here */
        401: ERRORS.INVALID_EMAIL_OR_PASSWORD
      }[error.code] || ERRORS.INVALID_EMAIL_OR_PASSWORD
    });
  }
  return Promise.reject(error);
};

function setToken({ client, app, restApp }) {
  return response => {
    const { accessToken } = response;

    app.set('accessToken', accessToken);
    restApp.set('accessToken', accessToken);
    client.setJwtToken(accessToken);

    return response;
  };
}

function setCookie({ app }) {
  return response => app.passport.verifyJWT(response.accessToken)
    .then(payload => {
      const options = payload.exp ? { expires: new Date(payload.exp * 1000) } : undefined;
      cookie.set('feathers-jwt', app.get('accessToken'), options);
      return response;
    });
}

function setUser({ app, restApp }) {
  return response => {
    app.set('user', response.user);
    restApp.set('user', response.user);
    return response;
  };
}

/*
* Actions
* * * * */

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ app, restApp, client }) => restApp.authenticate()
      .then(setToken({ client, app, restApp }))
      .then(setCookie({ app }))
      .then(setUser({ app, restApp }))
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: ({ app }) => app.service('users').create(data).catch(catchValidation)
  };
}

export function login(strategy, data, validation = true) {
  const socketId = socket.io.engine.id;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: ({ client, restApp, app }) => restApp.authenticate({
        ...data,
        strategy,
        socketId
      })
      .then(setToken({ client, app, restApp }))
      .then(setCookie({ app }))
      .then(setUser({ app, restApp }))
      .catch(validation ? catchValidation : error => Promise.reject(error))
  };
}

export function forgotPassword(data) {
  return {
    types: [FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL],
    promise: ({ client }) => client.post('/users/forgotPassword', { data })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: ({ client, app, restApp }) => app.logout()
      .then(() => setToken({ client, app, restApp })({ accessToken: null }))
  };
}
