//const WebSocket = require('ws');

//const ws = new WebSocket('ws://valnet.xyz:5840');
import {
	Color,
	Engine
} from 'excalibur';
import { Menu } from './scenes/Menu'
import { World } from './scenes/World'
import loader from './resources';

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


const game = new Engine({
  // displayMode: ex.DisplayMode.Container,
  width: 800,
  height: 600,
  backgroundColor: Color.Black,
	suppressPlayButton: true
});

game.setAntialiasing(false);


const world = new World(game)
const menu = new Menu(game);

menu.on('connect', (evt) => {
	world.connect(evt.host);
	game.goToScene('world');
})



game.addScene('menu', menu);
game.addScene('world', world);
global.game = game;


// game._suppressPlayButton
game.start(loader).then(_ => {
	
});
game.goToScene('menu');