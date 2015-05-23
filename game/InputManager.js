glMatrix = require('gl-matrix');

function InputManager(canvas){
	this.onMouseMove = this.onMouseMove.bind(this);
	
	this.canvas = canvas;
	this.mousePosition = glMatrix.vec2.fromValues(0,0);
	this.canvas.addEventListener('mousemove', this.onMouseMove);
}

InputManager.prototype.onMouseMove = function(event){
	var rect = this.canvas.getBoundingClientRect();
	this.mousePosition = glMatrix.vec2.set(this.mousePosition, event.clientX - rect.left, this.canvas.height - event.clientY - rect.top);
};

InputManager.prototype.onMouseDown = function(event){
	
};

module.exports = InputManager;
