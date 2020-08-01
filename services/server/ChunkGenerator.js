const SimplexNoiseGenerator = require('./lib/simplex').default;
const seedrandom = require('seedrandom');
const config = require('./../../globalConfig.json');

module.exports.ChunkGenerator = class ChunkGenerator {
	constructor(seed = Math.floor(Math.random() * 100000)) {
		console.log('creating chunk gen with seed', seed);
		const baseRng = seedrandom(seed);
		this.rngs = [
			seedrandom(Math.floor(baseRng() * 100000)),
			seedrandom(Math.floor(baseRng() * 100000)),
			seedrandom(Math.floor(baseRng() * 100000))
		];
		
		const zoom = 2;
		this.plateGen = new SimplexNoiseGenerator({
			frequency: .03 * zoom,
			max: 1,
			min: 0,
			octaves: 3,
			random: this.rngs[0]
		});
		this.basinGen = new SimplexNoiseGenerator({
			frequency: .01 * zoom,
			max: 1,
			min: 0,
			octaves: 8,
			random: this.rngs[1]
		});
		this.terrainGen = new SimplexNoiseGenerator({
			frequency: .1 * zoom,
			max: 1,
			min: 0,
			octaves: 3,
			random: this.rngs[2]
		});
	}

	getHeightAt(x, y) {
		const plate = Math.E ** (-1 * ((20 * (this.plateGen.scaled([x/2, y + 100]) - 0.5)) ** 2));
		const basin = 1 - (Math.atan((this.basinGen.scaled([x/2, y]) - 0.5) * 32) + (Math.PI / 2)) / Math.PI
		const terrain = this.terrainGen.scaled([x/2, y + 100]);

		return ((
			basin + 
			(plate * (basin ** (1/7))) +
			terrain
		) / 3) * 8;
	}
	
	getChunk(cx, cy) {
		let chunk = [];
		// console.log('chunk height', config.chunk.HEIGHT)
		// for(let z = 0; z < config.chunk.HEIGHT; z ++) {
		// 	let layer = [];
		// 	for(let x = 0; x < config.chunk.SIZE; x ++) {
		// 		let column = [];
		// 		for(let y = 0; y < config.chunk.SIZE; y ++) {
		// 			const height = this.getHeightAt(
		// 				cx * config.chunk.SIZE + x,
		// 				cy * config.chunk.SIZE + y
		// 			);
		// 			if(height > z) column.push(1);
		// 			else column.push(0);
		// 		}
		// 		layer.push(column);
		// 	}
		// 	chunk.push(layer);
		// }
		
		for(let y = 0; y < config.chunk.SIZE; y ++) {
			let row = []
			for(let x = 0; x < config.chunk.SIZE; x ++) {
				const height = this.getHeightAt(
					cx * config.chunk.SIZE + x,
					cy * config.chunk.SIZE + y
				);
				const a = Math.min(7, Math.floor(height));
				// console.log(a);
				row.push(a);
			}
			chunk.push(row)
		}
		return chunk;
	}
}