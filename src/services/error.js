import http from '../utils/http';

export async function query404() {
  return http('/404');
}

export async function query401() {
  return http('/401');
}

export async function query403() {
  return http('/403');
}

export async function query500() {
  return http('/500');
}
