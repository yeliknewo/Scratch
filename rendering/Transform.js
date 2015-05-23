var glMatrix = require('gl-matrix');
var CONST = require('./../Constants.js');

function Transform(position, rotation, scale){
	this.position = position ? position : glMatrix.vec2.fromValues(0,0);
	this.rotation = rotation ? rotation : 0;
	this.setRotation(this.rotation);
	this.scale = scale ? scale : glMatrix.vec2.fromValues(1, 1);
}

Transform.prototype.translate = function(x, y){
	this.chainTranslate(glMatrix.vec2.fromValues(x,y));
	return this;
};

Transform.prototype.multScale = function(x,y){
	this.chainScale(glMatrix.vec2.fromValues(x,y));
	return this;
};

Transform.prototype.chainTranslate = function(next){
	this.position = glMatrix.vec2.add(this.position, this.position, next);
	return this;
};

Transform.prototype.chainRotate = function(next){
	this.setRotation(next + this.rotation);
	return this;
};

Transform.prototype.chainScale = function(next){
	this.scale = glMatrix.vec2.multiply(this.scale, this.scale, next);
	return this;
};

Transform.prototype.chainAll = function(nextTransform){
	this.chainTranslate(nextTransform.position);
	this.chainRotate(nextTransform.rotation);
	this.chainScale(nextTransform.scale);
	return this;
};

Transform.prototype.rotateDeg = function(deg){
	this.setRotation(CONST.DEG_TO_RAD * deg + this.rotation) ;
	return this;
};

Transform.prototype.setRotationDeg = function(deg){
	this.setRotation(CONST.DEG_TO_RAD * deg);
	return this;
};

Transform.prototype.getRotationDeg = function(){
	return this.rotation * CONST.RAD_TO_DEG;
};

Transform.prototype.setRotation = function(rotation){
	this.rotation = rotation;
	this.rotationVector = glMatrix.vec2.fromValues(Math.sin(this.rotation), Math.cos(this.rotation));
	return this;
};

Transform.prototype.clone = function(){
	return new Transform(glMatrix.vec2.clone(this.position), this.rotation, glMatrix.vec2.clone(this.scale));
};

module.exports = Transform;
