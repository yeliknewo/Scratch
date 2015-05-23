var Transform = require('./Transform.js');
var Polygon = require('./Polygon.js');
var glMatrix = require('gl-matrix');

function Sprite(transform, polygons, parent){
	this.transform = transform ? transform : new Transform();
	this.polygons = polygons ? polygons : [];
	this.parent = parent ? parent : null;
	this.id = null;
	this.children = [];
	this.idPolygonCount = 0;
	this.worldTransform = transform ? transform.clone() : new Transform();
}

Sprite.prototype.updateWorldTransform = function(){
	if(this.parent){
		var parentWorldTransform = this.parent.worldTransform;
		glMatrix.vec2.set(this.worldTransform.position, this.transform.position[0] + parentWorldTransform.position[0], this.transform.position[1] + parentWorldTransform.position[1]);
		this.worldTransform.setRotation(this.transform.rotation + parentWorldTransform.rotation);
		glMatrix.vec2.set(this.worldTransform.scale, this.transform.scale[0] + parentWorldTransform.scale[0], this.transform.scale[1] + parentWorldTransform.scale[1]);
	}else{
		glMatrix.vec2.set(this.worldTransform.position, this.transform.position[0], this.transform.position[1]);
		this.worldTransform.setRotation(this.transform.rotation);
		glMatrix.vec2.set(this.worldTransform.scale, this.transform.scale[0], this.transform.scale[1]);
	}
	
	for(var i = 0;i < this.children.length;i++){
		this.children[i].updateWorldTransform();
	}
};

Sprite.prototype.addChild = function(child){
	this.children.push(child);
	if(child.parent){
		child.parent.removeChild(child);
	}
	child.parent = this;
};

Sprite.prototype.removeChild = function(child){
	this.children.splice(this.children.indexOf(child), 1);
	child.parent = null;
};

module.exports = Sprite;
