import { createConsumer } from '@rails/actioncable';
const URL = 'ws://localhost:3000/cable';
const consumer = createConsumer(getWebSocketURL());

function getWebSocketURL() {
  const token = JSON.parse(localStorage.getItem('user'))['token']
  return `${URL}?token=${token}`
}
export default consumer;
