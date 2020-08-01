
import {
	Scene,
	Actor,
	Color,
	Input,
	Label,
	TextAlign,
	ConsoleAppender,
	Texture,
	Sprite,
	Loader,
	SpriteSheet,
	TileMap,
	TileSprite
} from 'excalibur';
import config from '../../globalConfig.json';
import { txStone } from './../resources';
const stoneSpriteSheet = new SpriteSheet(txStone, 256/config.block.SIZE, 256/config.block.SIZE, config.block.SIZE, config.block.SIZE);
// stoneSpriteSheet.getSprite(0);



export class World extends Scene {

	currentChunkX = 0;
	currentChunkY = 0;

	loadedChunks = [];

	drawDistance = 2;

	constructor(engine) {
		super(engine);
		// HACK maybe move this stuff to scene? idk, seems like camera stuff but
		this.camera.zLayer = 0;
		Object.defineProperty(this.camera, 'chunkX', {
			get() {
				return Math.floor(this.x / (config.chunk.SIZE * config.block.SIZE))
			}
		})
		Object.defineProperty(this.camera, 'chunkY', {
			get() {
				return Math.floor(this.y / (config.chunk.SIZE * config.block.SIZE))
			}
		});
		console.log(this.currentChunkX, this.currentChunkY)

		const title = new Label();
		title.pos.x = 400;
		title.pos.y = 50;
		title.fontSize = 24;
		title.fontFamily = 'sans-serif';
		title.text = 'Project Terra';
		title.color = Color.Viridian;
		title.textAlign = TextAlign.Center;
		this.add(title);

	}

	onPostUpdate(engine, delta) {
		super.onPostUpdate(engine, delta);
		if(this.currentChunkX !== this.camera.chunkX
			|| this.currentChunkY !== this.camera.chunkY) {
			
			this.requestChunks();
		}
	}

	update(engine, delta) {
		super.update(engine, delta);
		if(engine.input.keyboard.isHeld(Input.Keys.W)) {
			this.camera.y -= delta;
		}
		if(engine.input.keyboard.isHeld(Input.Keys.S)) {
			this.camera.y += delta;
		}
		if(engine.input.keyboard.isHeld(Input.Keys.A)) {
			this.camera.x -= delta;
		}
		if(engine.input.keyboard.isHeld(Input.Keys.D)) {
			this.camera.x += delta;
		}
	}

	requestChunk(x, y) {
		console.log('requesting chunk', x, y);
		this.connection.send(JSON.stringify({
			cmd: 'GetChunk',
			x, y
		}));
	}

	requestChunks() {
		// console.log(this.camera.chunkX, this.camera.x, this.camera)
		this.requestChunk(this.camera.chunkX, this.camera.chunkY);
		this.currentChunkX = this.camera.chunkX;
		this.currentChunkY = this.camera.chunkY;
	}

	async chunk({cx, cy, data}) {
		console.log('importing chunk', cx, cy);
		const layerTilemap = new ChunkLayer(
			cx * config.block.SIZE * config.chunk.SIZE,
			cy * config.block.SIZE * config.chunk.SIZE,
			config.block.SIZE, config.block.SIZE,
			config.chunk.SIZE, config.chunk.SIZE
		);
		layerTilemap.registerSpriteSheet('stuff', stoneSpriteSheet);
		const tiles = [
			new TileSprite('stuff', 0),
			new TileSprite('stuff', 4),
			new TileSprite('stuff', 8),
			new TileSprite('stuff', 12),
			new TileSprite('stuff', 16),
			new TileSprite('stuff', 20),
			new TileSprite('stuff', 24),
			new TileSprite('stuff', 28)
		]
		let y = 0
		for(const row of data) {
			let x = 0;
			for(const cell of row) {
				layerTilemap.getCell(x, y).pushSprite(tiles[cell])
				x ++;
			}
			y ++;
		}
		
		this.add(layerTilemap)
		console.log('imported chunk', cx, cy);
		// this.loadedChunks.push({
		// 	cx, cy,
		// 	// blocks
		// })
	}

	connect(host) {
		this.connection = new WebSocket(`ws://${host}:5840`);
		this.connection.onopen = () => {

			this.requestChunks();
		}
		this.connection.onmessage = (message) => {
			const obj = JSON.parse(message.data)
			this[obj.cmd](obj);
		}
	}

	onInitialize(engine) {
		super.onInitialize(engine);
		
		engine.input.keyboard.on('press', this.keyPress.bind(this));
	}

	keyPress(evt) {
		console.log(this.camera.zLayer)
		switch(evt.key) {
			case 33: { // page up
				this.camera.zLayer ++;
				break;
			}
			case 34: {
				this.camera.zLayer --;
				break;
			}
		}
	}
}

class ChunkLayer extends TileMap {
	camera = null;
	zLayer = 0;

	constructor(x, y, cellWidth, cellHeight, rows, cols) {
		super (x, y, cellWidth, cellHeight, rows, cols);
		// this.zLayer = z;
	}

	// onInitialize(engine) {
	// 	super.onInitialize(engine);
	// 	console.log('INIT CHUNK LAYER')
	// 	// console.log(engine.currentScene.camera)
	// 	this.camera = engine.currentScene.camera;
	// 	this.setZIndex(this.zLayer);
	// }

	// draw(ctx) {
	// 	// if(this.zLayer !== this.camera.zLayer) return;
	// 	// const alpha = (this.zLayer - this.camera.zLayer + 4) / 4;
	// 	// ctx.globalAlpha = Math.min(1, Math.max(0, (alpha)));
	// 	super.draw(ctx);
	// 	// ctx.globalAlpha = 1.0;
	// }
}