import { notification } from 'antd';
import { getStations, updateStation, createStation, getStationById } from '../services/api';

export default {
  namespace: 'station',

  state: {
    stations: {
      data: [],
      pagination: {},
    },
    station: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data: { data } } = yield call(getStations, payload);
        yield put({
          type: 'save',
          payload: { stations: { data } },
        });
      } catch (e) {
        // 按理说是上传到错误监控系统
        return Promise.reject(e);
      }
    },
    *getStationById({ payload }, { call, put }) {
      try {
        const { data: { data } } = yield call(getStationById, payload);
        yield put({
          type: 'save',
          payload: { station: data },
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },

    *create({ payload }, { call }) {
      try {
        yield call(createStation, payload);
        notification.success({
          message: '创建充电站成功',
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    *update({ payload }, { call }) {
      try {
        yield call(updateStation, payload);
        notification.success({
          message: '更新充电站成功',
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
