//const WebSocket = require('ws');

//const ws = new WebSocket('ws://valnet.xyz:5840');


document.write(/*html*/`
<style>
	.button {
		border:none;
		color:white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor:pointer;
	}

.button1 {background-color: #008CBA;}
</style>

<input id='inputId' type="text">

<button id='buttonId' class="button button1"> Connect </button>

`);

document.getElementById('buttonId').addEventListener('click', () => {
	const textInput = document.getElementById('inputId').value;
	console.log('Your value is:  '+textInput);
	
	
	const socket = new WebSocket(`ws://${textInput}:5840`);
	
	console.log('We did it!');
	//const socket = new WebSocket('ws://valnet.xyz:5840');
});