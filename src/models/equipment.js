import { notification } from 'antd';
import { getEquipments, updateEquipment, createEquipment, getEquipmentById } from '../services/api';

export default {
  namespace: 'equipment',

  state: {
    equipments: {
      data: [],
      pagination: {},
    },
    equipment: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { data: { data } } = yield call(getEquipments, payload);
        yield put({
          type: 'save',
          payload: { equipments: { data } },
        });
      } catch (e) {
        // 按理说是上传到错误监控系统
        return Promise.reject(e);
      }
    },
    *getEquipmentById({ payload }, { call, put }) {
      try {
        const { data: { data } } = yield call(getEquipmentById, payload);
        yield put({
          type: 'save',
          payload: { equipment: data },
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },

    *create({ payload }, { call }) {
      try {
        yield call(createEquipment, payload);
        notification.success({
          message: '创建充电站成功',
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    *update({ payload }, { call }) {
      try {
        yield call(updateEquipment, payload);
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
