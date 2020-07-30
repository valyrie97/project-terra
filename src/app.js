//const WebSocket = require('ws');

//const ws = new WebSocket('ws://valnet.xyz:5840');
import * as ex from 'excalibur';
import { Menu } from './scenes/Menu'

document.write(/*html*/`
<style>
	html, body {
		margin: 0px;
		padding: 0px;
	}

	canvas {
		margin: auto;
		text-align: center;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>

`);

const game = new ex.Engine({
  // displayMode: ex.DisplayMode.Container,
  width: 800,
  height: 600,
  backgroundColor: ex.Color.Black
});

game.setAntialiasing(false);

game.addScene('menu', new Menu(game));

game.start();

game.goToScene('menu');

// document.getElementById('buttonId').addEventListener('click', () => {
// 	const textInput = document.getElementById('inputId').value;
// 	console.log('Your value is:  '+textInput);
	
	
// 	const socket = new WebSocket(`ws://${textInput}:5840`);
	
// 	console.log('We did it!');
// 	//const socket = new WebSocket('ws://valnet.xyz:5840');
// });