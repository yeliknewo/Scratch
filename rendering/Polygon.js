var glMatrix = require('gl-matrix');

function Polygon(){
	this.points = [];
	this.colors = [];
	this.length = 0;
	this.id = 0;
}

Polygon.prototype.add = function(x, y, r, g, b, a){
	this.points.push(x, y);
	this.colors.push(r, g, b, a);
	this.length++;
	return this;
};

Polygon.prototype.vertexOut = function(){
	return new Float32Array(this.points);
};

Polygon.prototype.colorOut = function(){
	return new Float32Array(this.colors);
};

module.exports = Polygon;
