var Transform = require('./Transform.js');
var Polygon = require('./Polygon.js');

function Sprite(transform, polygons, parent){
	this.transform = transform ? transform : new Transform();
	this.polygon = polygons ? polygons : new Polygon();
	this.id = null;
	this.parent = parent ? parent : null;
	this.children = [];
}

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
