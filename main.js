var CanvasRenderer = require('./rendering/CanvasRenderer.js');
var Sprite = require('./rendering/Sprite.js');
var Polygon = require('./rendering/Polygon.js');
var Transform = require('./rendering/Transform.js');
var glMatrix = require('gl-matrix');

var renderer, updateDelta, lastUpdate, stage, child, child2, input;

window.onload = new function(){
	var canvas = document.getElementById('canvas');
	if(!canvas){
		canvas = document.createElement('canvas');
	}
	document.body.appendChild(canvas);
	renderer = new CanvasRenderer(canvas).init().resize(800, 600);
	
	stage = new Sprite(new Transform(), []);
	
	child = new Sprite(new Transform([0, 300]), [
	new Polygon().
	add(-10, -10, 1, 0, 0, 1).
	add(10, -10, 1, 0, 0, 1).
	add(10, 10, 1, 0, 0, 1), 
	new Polygon().
	add(-10, -10, 0, 0, 1, 1).
	add(-10, 10, 0, 0, 1, 1).
	add(10, 10, 0, 0, 1, 1)
	], stage);
	
	renderer.bufferSprite(child);
	
	child2 = new Sprite(new Transform([0, 20]), [
	new Polygon().
	add(-10, -10, 0, 1, 0, 1).
	add(10, -10, 0, 1, 0, 1).
	add(10, 10, 0, 1, 0, 1), 
	new Polygon().
	add(-10, -10, 0, 0, 1, 1).
	add(-10, 10, 0, 0, 1, 1).
	add(10, 10, 0, 0, 1, 1)
	], child);
	
	renderer.bufferSprite(child2);
	
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
	child.transform.translate(1, 0);
	child.transform.rotateDeg(1);
}

function frame(){
	renderer.prepFrame();
	renderer.renderSprite(stage);
}
