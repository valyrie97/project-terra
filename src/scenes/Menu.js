import {
	Scene,
	Actor,
	Color,
	Input,
	Label,
	TextAlign
} from 'excalibur';
import TextBox from './../ui/Input';
import Button from './../ui/Button';
// import * as Store from 'electron-store';

// const store = new Store();

export class Menu extends Scene {

	constructor(engine) {
		super(engine);

		const textBox = new TextBox(400, 250);
		this.add(textBox);
		textBox.input = 'valnet.xyz'

		const title = new Label();
		title.pos.x = 400;
		title.pos.y = 50;
		title.fontSize = 24;
		title.fontFamily = 'sans-serif';
		title.text = 'Project Terra';
		title.color = Color.Viridian;
		title.textAlign = TextAlign.Center;
		this.add(title);

		const button = new Button(464, 300);
		button.text = 'Connect';
		this.add(button);

		button.on('click', () => {
			this.emit('connect', {
				host: textBox.input
			})
		})

		engine.input.pointers.primary.on('down', (evt) => {
			if (evt.pointerType === Input.PointerType.Mouse) {
				this.blur();
			}
		});

		// engine.input.pointers.primary.on('up', (evt) => {
		// 	if (evt.pointerType === Input.PointerType.Mouse) {
		// 		this.blur();
		// 	}
		// });

		console.log(engine);
	}

	blur() {
		for(const actor of this.actors) {
			if('blur' in actor) actor.blur();
		}
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