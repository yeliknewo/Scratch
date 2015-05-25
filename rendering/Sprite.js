var Transform = require('./Transform.js');
var Polygon = require('./Polygon.js');

function Sprite(transform, polygons, parent){
	this.transform = transform ? transform : new Transform();
	this.polygons = polygons ? polygons : [];
	this.parent = parent ? parent.addChild(this): null;
	this.id = null;
	this.children = [];
	this.idPolygonCount = 0;
	this.worldTransformCurrent = false;
	this.worldTransform = new Transform();
	this.worldTransform = this.getWorldTransform();
	this.transform.setSprite(this);
}

Sprite.prototype.getWorldTransform = function(){
	if(this.worldTransformCurrent){
		return this.worldTransform;
	}else{
		this.worldTransformCurrent = true;
		this.worldTransform.reset().chainAll(this.transform);
		if(this.parent){
			this.worldTransform.chainAll(this.parent.getWorldTransform());
		}
		return this.worldTransform;
	}
};

Sprite.prototype.addChild = function(child){
	this.children.push(child);
	if(child.parent){
		child.parent.removeChild(child);
	}
	child.parent = this;
	return this;
};

Sprite.prototype.removeChild = function(child){
	this.children.splice(this.children.indexOf(child), 1);
	child.parent = null;
	return this;
};

Sprite.prototype.queueWorldTransform = function(){
	this.worldTransformCurrent = false;
	for(var i = 0;i<this.children.length;i++){
		this.children[i].queueWorldTransform();
	}
};

module.exports = Sprite;
