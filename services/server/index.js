const { Server } = require('ws');
const { World } = require('./World');
const log = require('signale');

class TerraServer {
	wss = null;
	world = null;
	clients = [];

	constructor(options = {}) {
		log.info('starting terra server with', options);
		this.wss = new Server({
			port: options.port || 5840
		});

		this.wss.on('connection', this.connectClient.bind(this))

		this.world = new World();
	}

	connectClient(client, req) {
		client.ip = req.socket.remoteAddress;
		log.debug('client connected', client.ip);
		this.clients.push(client);
		client.on('message', (message) => {
			this.processMessage(message, client);
		});
		this.wss.on('close', this.pruneClients.bind(this));
	}

	pruneClients() {
		this.clients = this.clients.filter(client => {
			if(!client.isAlive) log.debug('killed client', client);
			return client.isAlive;
		})
	}

	broadcast(message) {
		for(const client of this.clients) {
			client.send(message);
		}
	}

	processMessage(message, client) {
		const obj = JSON.parse(message);
		const response = this[obj.cmd](obj);
		client.send(JSON.stringify(response));
	}

	GetChunk({x, y}) {
		return {
			cmd: 'chunk', 
			data: this.world.getChunk(x, y)
		}
	}
}

const terraServer = new TerraServer();