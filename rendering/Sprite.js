var Transform = require('./Transform.js');
var Polygon = require('./Polygon.js');

function Sprite(transform, polygons){
	this.transform = transform ? transform : new Transform();
	this.polygon = polygons ? polygons : new Polygon();
	this.id = null;
}

module.exports = Sprite;
