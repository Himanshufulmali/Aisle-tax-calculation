const http = require('http');
const { app, PORT } = require('./configs/server-config');

const httpServer = http.createServer(app);

httpServer.listen(PORT, (err) => {
    if(err){
        console.log('Error while server creation');
    }
    console.log('Server started on port : ', PORT);
});