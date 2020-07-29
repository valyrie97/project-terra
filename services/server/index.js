const { Server } = require('ws');
const { World } = require('./World');
const log = require('signale');

function start(config) {

	server.on('connection', function connection(ws) {
		ws.on('message', function incoming(message) {
			console.log('received: %s', message);
		});

		ws.send('something');
	});

	console.log('server');
}

class TerraServer {
	wss = null;
	world = null;

	constructor(options = {}) {
		log.info('starting terra server with', options);
		this.wss = new Server({
			port: options.port || 5840
		});

		this.wss.on('connection', this.connectClient.bind(this))

		this.world = new World();
	}

	connectClient(client) {
		
	}
}

const terraServer = new TerraServer()

module.exports.start = start;