import {
	Loader,
	Texture
} from 'excalibur';

const rootLoader = new Loader();
// rootLoader.logo = null; THIS CANT B NULLLLLLOLOLOLOLOLLLLLL HAHAHHAHA :))))
rootLoader.backgroundColor = 'black';
rootLoader.suppressPlayButton = true;

import stone from './../res/blocks/stone.png'
const txStone = new Texture(stone);
rootLoader.addResource(txStone);
export {txStone};

// import stone from './../../res/blocks/stone.png'
const txSoil = new Texture(stone);
rootLoader.addResource(txSoil);
export {txSoil};


export default rootLoader;