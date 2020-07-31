import {
	Scene,
	Actor,
	Color,
	Input,
	Label,
	TextAlign,
	ConsoleAppender
} from 'excalibur';

export class World extends Scene {
	constructor(engine) {
		super(engine);
		this.camera.zLayer = 0;
	}

	requestChunk(x, y) {
		this.connection.send(JSON.stringify({
			cmd: 'GetChunk',
			x, y
		}));
	}

	chunk({data}) {
		let z = 0
		for(const layer of data) {
			let x = 0;
			for(const column of layer) {
				let y = 0;
				for(const blockState of column) {
					if(blockState === 0) continue;

					const blockActor = new Block(x, y, z);
					this.add(blockActor);

					y ++;
				}
				x ++;
			}
			z ++;
		}
	}

	connect(host) {
		this.connection = new WebSocket(`ws://${host}:5840`);
		this.connection.onopen = () => {
			this.requestChunk(0, 0);
		}
		this.connection.onmessage = (message) => {
			const obj = JSON.parse(message.data)
			this[obj.cmd](obj);
		}
	}
}

class Block extends Actor {
	camera = null;

	constructor(x, y, z) {
		super (x * 32, y * 32, 32, 32);
		this.zLayer = z;
	}

	onInitialize(engine) {
		super.onInitialize(engine);
		this.camera = engine.currentScene.camera;
		this.setZIndex(this.zLayer);
	}

	draw(ctx) {
		super.draw(ctx);
		ctx.fillStyle = Color.Gray.toHex();
		const alpha = (this.zLayer - this.camera.zLayer + 2) / 2;
		ctx.globalAlpha = Math.min(1, Math.max(0, (alpha)));
		ctx.fillRect(
			this.pos.x - 16,
			this.pos.y - 16,
			32,
			32
		)
		ctx.globalAlpha = 0.2;
	}
}