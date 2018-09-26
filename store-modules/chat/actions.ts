import Di from '~/app';
const socket = Di.get('io');

export default {
    testChat() {
        console.log('testChat');
    },
    chatInitial(context: any) {
        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('identity', 0, (response: any) => console.log('Identity:', response));
        });
        socket.on('events', (data: any) => {
            context.commit('sendMessage', data);
            context.commit('chatChangeInput', '');
            console.log('event', data);
        });
        socket.on('identity', (data: any) => {
            console.log('identity', data);
        });
        socket.on('exception', (data: any) => {
            console.log('event', data);
        });
        socket.on('disconnect', () => {
            console.log('Disconnected');
        });
    },
    chatSendMessage(context: any, data: object) {
        socket.emit('events', data);
    },
    chatChangeInput(context: any, data: object) {
        context.commit('chatChangeInput', data);
    },
};
