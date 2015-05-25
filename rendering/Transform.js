var glMatrix = require('gl-matrix');
var CONST = require('./../Constants.js');

function Transform(position, rotation, scale){
	this.position = glMatrix.vec2.create();
	this.rotation = 0;
	this.rotationVector = glMatrix.vec2.create();
	this.scale = glMatrix.vec2.fromValues(1,1);
	this.reset();
	if(position)
		this.chainTranslate(position);
	if(rotation)
		this.chainRotate(rotation);
	if(scale)
		this.chainScale(scale);
}

Transform.prototype.translate = function(x, y){
	this.chainTranslate(glMatrix.vec2.fromValues(x,y));
	return this;
};

Transform.prototype.setSprite = function(sprite){
	this.sprite = sprite;
	return this;
};

Transform.prototype.updateSprite = function(){
	if(this.sprite){
		this.sprite.queueWorldTransform();
	}
};

Transform.prototype.multScale = function(x,y){
	this.chainScale(glMatrix.vec2.fromValues(x,y));
	return this;
};

Transform.prototype.chainTranslate = function(next){
	glMatrix.vec2.add(this.position, this.position, next);
	this.updateSprite();
	return this;
};

Transform.prototype.chainRotate = function(next){
	this.setRotation(next + this.rotation);
	return this;
};

Transform.prototype.chainScale = function(next){
	glMatrix.vec2.multiply(this.scale, this.scale, next);
	this.updateSprite();
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
	glMatrix.vec2.set(this.rotationVector, Math.cos(this.rotation), Math.sin(this.rotation));
	this.updateSprite();
	return this;
};

Transform.prototype.clone = function(){
	return new Transform(glMatrix.vec2.clone(this.position), this.rotation, glMatrix.vec2.clone(this.scale));
};

Transform.prototype.reset = function(){
	glMatrix.vec2.set(this.position, 0, 0);
	this.setRotation(0);
	glMatrix.vec2.set(this.scale, 1, 1);
	this.updateSprite();
	return this;
};

module.exports = Transform;
