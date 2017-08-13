const LOAD_USERS = 'redux/admin/LOAD_USERS';
const LOAD_USERS_SUCCESS = 'redux/admin/LOAD_USERS_SUCCESS';
const LOAD_USERS_FAIL = 'redux/admin/LOAD_USERS_FAIL';
const SELECT_USER = 'redux/admin/SELECT_USER';

const initialState = {
  users: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.result.data
      };
    case LOAD_USERS_FAIL:
      return {
        ...state,
        error: action.error
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.user
      };
    default:
      return state;
  }
}

export function loadUsers() {
  return {
    types: [LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAIL],
    promise: ({ app }) => app.service('users').find({
      query: {
        $limit: 25
      }
    })
  };
}

export function selectUser(user) {
  return { type: SELECT_USER, user };
}
