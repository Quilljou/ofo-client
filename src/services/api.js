import { stringify } from 'qs';
import http from '../utils/http';
//  站
export async function getStations(query) {
  return http(`/stations?${stringify(query)}`);
}

export async function getStationById({ id }) {
  return http(`/stations/${id}`);
}


export async function createStation(body) {
  return http.post('/stations', body);
}

export async function updateStation({ id, body }) {
  return http.put(`/stations/${id}`, body);
}

//  桩
export async function getEquipments({ stationId }) {
  return http(`/stations/${stationId}/equipments`);
}

export async function getEquipmentById({ stationId, equipmentId }) {
  return http(`/stations/${stationId}/equipments/${equipmentId}`);
}


export async function createEquipment({ stationId, body }) {
  return http.post(`/stations/${stationId}/equipments`, body);
}

export async function updateEquipment({ stationId, equipmentId, body }) {
  return http.put(`/stations/${stationId}/equipments/${equipmentId}`, body);
}

// auth
export async function login(body) {
  return http({
    url: '/login',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: body,
  });
}


export async function queryProjectNotice() {
  return http('/project/notice');
}

export async function queryActivities() {
  return http('/activities');
}

export async function queryRule(params) {
  return http(`/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return http('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return http('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return http('/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return http('/fake_chart_data');
}

export async function queryTags() {
  return http('/tags');
}

export async function queryBasicProfile() {
  return http('/profile/basic');
}

export async function queryAdvancedProfile() {
  return http('/profile/advanced');
}

export async function queryFakeList(params) {
  return http(`/fake_list?${stringify(params)}`);
}


export async function fakeRegister(params) {
  return http('/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return http('/notices');
}
