import { routerRedux } from 'dva/router';
import { query as queryUsers, queryCurrent } from '../services/user';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const { data: { data } } = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *fetchCurrent(_, { call, put }) {
      try {
        const { data: { data } } = yield call(queryCurrent);
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      } catch (e) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
