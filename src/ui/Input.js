import {
	Actor,
} from 'excalibur';
export default class TextBox extends Actor {
	enableCapturePointer = true;
	focus = false;
	input = '';

	constructor(x, y) {
		super(x, y, 256, 32);
		this.on('pointerup', this.pointerup.bind(this));
		this.on('pointerdown', this.pointerdown.bind(this));
	}

	onInitialize(engine) {
		engine.input.keyboard.on('press', this.keyPress.bind(this));
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