import { routerRedux } from 'dva/router';
import { login } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { data: { data } } = yield call(login, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: data,
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
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
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
    },
  },
};
