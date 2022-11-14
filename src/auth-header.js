import { useAuthStore } from '@/stores/auth';

export default function authHeader() {
  let user = useAuthStore().user

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
