var glMatrix = require('gl-matrix');
var CONST = require('./../Constants.js');

function Transform(){
	this.rotationVector = glMatrix.vec2.create();
	this.position = glMatrix.vec2.create();
	this.rotation = 0;
	this.setRotation(this.rotation);
	this.scale = glMatrix.vec2.fromValues(1,1);
}

Transform.prototype.translate = function(x, y){
	this.chainTranslate([x,y]);
	return this;
};

Transform.prototype.multScale = function(x,y){
	this.chainScale([x,y]);
	return this;
};

Transform.prototype.chainTranslate = function(next){
	this.position[0] += next[0];
	this.position[1] += next[1];
	return this;
};

Transform.prototype.chainRotate = function(next){
	this.setRotation(next + this.rotation);
	return this;
};

Transform.prototype.chainScale = function(next){
	this.scale[0] *= next[0];
	this.scale[1] *= next[1];
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
	this.rotationVector[0] = Math.sin(this.rotation);
	this.rotationVector[1] = Math.cos(this.rotation);
	return this;
};

Transform.prototype.clone = function(){
	return new Transform().chainAll(this);
};

module.exports = Transform;
