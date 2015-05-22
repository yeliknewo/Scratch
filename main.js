var CanvasRenderer = require('./rendering/CanvasRenderer.js');
var Sprite = require('./rendering/Sprite.js');
var Polygon = require('./rendering/Polygon.js');
var Transform = require('./rendering/Transform.js');

var renderer, updateDelta, lastUpdate, sprite;

window.onload = new function(){
	var canvas = document.getElementById('canvas');
	if(!canvas){
		canvas = document.createElement('canvas');
	}
	document.body.appendChild(canvas);
	renderer = new CanvasRenderer(canvas).init().resize(800, 600);
	sprite = new Sprite(new Transform(), new Polygon().
	add(0,	0,	1,	0,	0,	1).
	add(1,	0,	0,	1,	0,	1).
	add(1,	1,	0,	0,	1,	1).
	add(0,	1,	0,	0,	0,	1));
	renderer.bufferSprite(sprite);
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
		
	requestAnimationFrame(run);
}

function run(timestamp){
	requestAnimationFrame(run);
	while(lastUpdate < timestamp){
		lastUpdate += updateDelta;
		update();
	}
	frame();
}

function update(){
	
}

function frame(){
	renderer.prepFrame();
	renderer.renderSprite(sprite);
}
