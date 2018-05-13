// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  try {
    const self = JSON.parse(localStorage.getItem('self'));
    return self ? (self.isRoot ? 'admin' : 'user') : 'guest';
  } catch (e) {
    return 'guest';
  }
}

export function setAuthority(authority) {
  return localStorage.setItem('self', JSON.stringify(authority));
}
