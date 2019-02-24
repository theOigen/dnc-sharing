module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('>socket connected', socket.id);

        socket.on('loggedUser', (id) => {
            console.log("LOGGED USER ID:", id);
        });

        socket.on('disconnect', () => {
            console.log('>socket disconnected');
        });
    });
};