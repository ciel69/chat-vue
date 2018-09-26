import Di from '~/libs/Di'
import io from 'socket.io-client';

const app = new Di();

app.factory('io', () => io('http://localhost:3030'));

export default app;
