var glMatrix = require('gl-matrix');
var CONST = require('./../Constants.js');

function Transform(position, rotationRad, scale){
	this.position = position ? position : glMatrix.vec2.fromValues(0,0);
	this.rotationRad = rotationRad ? rotationRad : 0;
	this.scale = scale ? scale : glMatrix.vec2.fromValues(1, 1);
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

Transform.prototype.clone = function(){
	return new Transform(glMatrix.vec2.clone(this.position), this.rotationRad, glMatrix.vec2.clone(this.scale));
};

module.exports = Transform;
