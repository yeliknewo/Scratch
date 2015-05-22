var glMatrix = require('gl-matrix');
var CONST = require('./../Constants.js');

function Transform(position, rotationRad, scale, depth){
	this.position = position ? position : glMatrix.vec2.set(glMatrix.vec2.create(), 0, 0, CONST.DEFAULT_DEPTH);
	this.rotationRad = rotationRad ? rotationRad : 0;
	this.scale = scale ? scale : glMatrix.vec3.set(glMatrix.vec3.create(), 1, 1, 1);
}

Transform.prototype.translate = function(x, y){
	this.chainTranslate(glMatrix.vec2.fromValues(x,y));
	return this;
};

Transform.prototype.chainTranslate = function(next){
	this.position = glMatrix.vec2.add(this.position, this.position, next);
	return this;
};

Transform.prototype.rotateDeg = function(deg){
	this.rotationRad += CONST.DEG_TO_RAD * deg;
	return this;
};

Transform.prototype.setRotationDeg = function(deg){
	this.rotationRad = CONST.DEG_TO_RAD * deg;
	return this;
};

Transform.prototype.getRotationDeg = function(){
	return this.rotationRad * CONST.RAD_TO_DEG;
};

module.exports = Transform;
