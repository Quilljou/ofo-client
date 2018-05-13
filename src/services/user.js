import http from '../utils/http';

export async function query() {
  return http('/users');
}

export async function queryCurrent() {
  return http('/self');
}
