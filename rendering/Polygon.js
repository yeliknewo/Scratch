var glMatrix = require('gl-matrix');

function Polygon(){
	this.points = [];
	this.colors = [];
	this.length = 0;
	this.id = 0;
}

Polygon.prototype.add = function(x, y, r, g, b, a){
	this.points.push(glMatrix.vec2.set(glMatrix.vec2.create(), x, y));
	this.colors.push(glMatrix.vec4.set(glMatrix.vec4.create(), r, g, b, a));
	this.length = this.points.length;
	return this;
};

Polygon.prototype.vertexFlatten = function(){
	var flat = [];
	for(var i = 0;i<this.points.length;i++){
		var p = this.points[i];
		flat.push(p[0], p[1]);
	}
	return flat;
};

Polygon.prototype.colorFlatten = function(){
	var flat = [];
	for(var i = 0;i<this.colors.length;i++){
		var p = this.colors[i];
		flat.push(p[0], p[1], p[2], p[3]);
	}
	return flat;
};

Polygon.prototype.vertexOut = function(){
	return new Float32Array(this.vertexFlatten());
};

Polygon.prototype.colorOut = function(){
	return new Float32Array(this.colorFlatten());
};

module.exports = Polygon;
