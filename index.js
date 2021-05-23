const path = require('path');
const api = require('fastify')()
api.register(require('fastify-socket.io'));
api.register(require('fastify-static'), { root: path.join(__dirname, '/') });
api.get('/', (req, reply) => {
    reply.sendFile('index.html')
})
api.ready(err => {
    if (err) throw err;
    api.io.on('connect', (socket) => {
        console.info("Socket Connected", socket.id)
        socket.on('emit1', () => console.log("message emitted from client"));
    });
})
api.listen(3000)