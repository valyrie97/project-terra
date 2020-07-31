import {
	Actor,
	Color,
	GameEvent
} from 'excalibur';
export default class Button extends Actor {
	enableCapturePointer = true;
	text = '';
	focus = false;

	constructor(x, y) {
		super(x, y, 128, 32);
		this.on('pointerup', this.pointerup.bind(this));
		this.on('pointerdown', this.pointerdown.bind(this));
	}

	blur() {
		this.focus = false;
	}

	pointerup(evt) {
		if(focus && this.scene.isCurrentScene()) this.emit('click', new GameEvent());
		this.focus = false;
	}

	pointerdown(evt) {
		this.focus = true;
	}

	draw(ctx) {
		super.draw(ctx);

		// console.log(ctx.strokeStyle);
		ctx.strokeStyle = '#000000';
		ctx.fillStyle = Color.Viridian.toHex();
		ctx.fillRect(
			(this.pos.x - (this.width / 2)),
			(this.pos.y - (this.height / 2)),
			this.width,
			this.height
		);
		
		ctx.font = "15px 'Segoe UI'";
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText(
			this.text, 
			(this.pos.x),
			(this.pos.y + (this.height / 6))
		);
	}
}