import {
	Scene,
	Actor,
	Color,
	Input,
	Label,
	TextAlign
} from 'excalibur';
// import * as Store from 'electron-store';

// const store = new Store();

export class Menu extends Scene {

	constructor(engine) {
		super(engine);

		let textBox = new TextBox(256, 100);
		this.add(textBox);

		let title = new Label();
		title.pos.x = 400;
		title.pos.y = 50;
		title.fontSize = 24;
		title.fontFamily = 'sans-serif';
		title.text = 'Project Terra';
		title.color = Color.Viridian;
		title.textAlign = TextAlign.Center;
		this.add(title);

		engine.input.pointers.primary.on("down", (evt) => {
			if (evt.pointerType === Input.PointerType.Mouse) {
				this.blur();
			}
		});

		console.log(engine);
	}

	blur() {
		for(const actor of this.actors) {
			if('blur' in actor) actor.blur();
		}
	}
}

class TextBox extends Actor {
	enableCapturePointer = true;
	focus = false;
	input = '';

	constructor(x, y) {
		super(x, y, 256, 32);
		this.on('pointerup', this.pointerup.bind(this));
		this.on('pointerdown', this.pointerdown.bind(this));
	}

	onInitialize(engine) {
		engine.input.keyboard.on("press", this.keyPress.bind(this));
	}

	keyPress(evt) {
		if(!this.focus) return;
		if(evt.key === 8) return this.input = this.input.substr(0, this.input.length - 1);

		switch(evt.key) {
			case 190: this.input += '.'; break;
			default: {
				this.input += String.fromCharCode(evt.key).toLowerCase();
				break;
			}
		}


		console.log(evt);
	}

	pointerup(evt) {
	}

	pointerdown(evt) {
		this.focus = true;
	}

	blur() {
		this.focus = false;
	}

	draw(ctx) {
		super.draw(ctx);

		ctx.rect(
			(this.pos.x - (this.width / 2)),
			(this.pos.y - (this.height / 2)),
			this.width,
			this.height
		);
		ctx.fillStyle = '#222';
		ctx.strokeStyle = this.focus ? 'white' : '#888';
		ctx.fill();
		ctx.stroke();
		
		ctx.font = "15px 'Segoe UI'";
		ctx.fillStyle = 'white';
		ctx.fillText(
			this.input, 
			(this.pos.x - (this.width / 2)) + 8,
			(this.pos.y + (this.height / 6))
		);
		// ctx.fill();
	}
}

class Grass extends Actor {
	fertility = 0;
	static colors = [
		Color.fromRGB((0x608038 >> 16), (0x608038 >> 8) & 0xff, (0x608038) & 0xff),
		Color.fromRGB((0x67843a >> 16), (0x67843a >> 8) & 0xff, (0x67843a) & 0xff),
		Color.fromRGB((0x6e883c >> 16), (0x6e883c >> 8) & 0xff, (0x6e883c) & 0xff),
		Color.fromRGB((0x758b3e >> 16), (0x758b3e >> 8) & 0xff, (0x758b3e) & 0xff),
		Color.fromRGB((0x7c8f40 >> 16), (0x7c8f40 >> 8) & 0xff, (0x7c8f40) & 0xff),
		Color.fromRGB((0x839342 >> 16), (0x839342 >> 8) & 0xff, (0x839342) & 0xff),
		Color.fromRGB((0x8a9745 >> 16), (0x8a9745 >> 8) & 0xff, (0x8a9745) & 0xff),
		Color.fromRGB((0x909b47 >> 16), (0x909b47 >> 8) & 0xff, (0x909b47) & 0xff),
		Color.fromRGB((0x979f49 >> 16), (0x979f49 >> 8) & 0xff, (0x979f49) & 0xff),
		Color.fromRGB((0x9ea24b >> 16), (0x9ea24b >> 8) & 0xff, (0x9ea24b) & 0xff),
		Color.fromRGB((0xa5a64d >> 16), (0xa5a64d >> 8) & 0xff, (0xa5a64d) & 0xff),
		Color.fromRGB((0xacaa4f >> 16), (0xacaa4f >> 8) & 0xff, (0xacaa4f) & 0xff),
		Color.fromRGB((0xb3ae51 >> 16), (0xb3ae51 >> 8) & 0xff, (0xb3ae51) & 0xff),
	];
	constructor(x, y) {
		super(x * 32, y * 32, 32, 32);

		this.fertility = Math.floor(Math.random() * 4);

		this.color = Grass.colors[this.fertility];
		// this.
	}
	onInitialize() {

	}
}