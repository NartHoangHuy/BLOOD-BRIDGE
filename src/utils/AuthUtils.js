export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId'); // Thêm dòng này để xóa luôn userId
  window.location.href = '/login';
}
