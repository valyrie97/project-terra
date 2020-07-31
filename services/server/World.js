const { ChunkGenerator } = require('./ChunkGenerator');

class World {
	chunkGen = new ChunkGenerator('terra');
	
	constructor() {

	}

	getChunk(x, y) {
		return this.chunkGen.getChunk(x, y);
	}
}

module.exports.World = World;