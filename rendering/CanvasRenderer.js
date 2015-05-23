var Shader = require('./Shader.js');
var glMatrix = require('gl-matrix');

function CanvasRenderer(canvas){
	this.canvas = canvas;
	this.shaderProgram = null;
	this.fragmentShader = null;
	this.vertexShader = null;
	this.buffers = {};
	this.idSprite = 0;
	
	try{
		this.gl = this.canvas.getContext('webgl');
	}
	catch(e){
		console.log(e)
	}
}

CanvasRenderer.prototype.bufferSprite = function(sprite){
	sprite.id = this.idSprite++;
	for(var i = 0;i<sprite.polygons.length;i++){
		var polygon = sprite.polygons[i];
		polygon.id = sprite.idPolygonCount++;
		
		var vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, polygon.vertexOut(), this.gl.STATIC_DRAW);
		this.buffers[sprite.id+'v'+polygon.id] = vertexBuffer;
	
		var colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, polygon.colorOut(), this.gl.STATIC_DRAW);
		this.buffers[sprite.id + 'c' + polygon.id] = colorBuffer;
	
		var translationBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, translationBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, sprite.worldTransform.position, this.gl.DYNAMIC_DRAW);
		this.buffers[sprite.id + 't' + polygon.id] = translationBuffer;
	
		var rotationBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, rotationBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, sprite.worldTransform.rotationVector, this.gl.DYNAMIC_DRAW);
		this.buffers[sprite.id + 'r' + polygon.id] = rotationBuffer;
		
		var scaleBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, scaleBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, sprite.worldTransform.scale, this.gl.DYNAMIC_DRAW);
		this.buffers[sprite.id + 's' + polygon.id] = scaleBuffer;
	}
	
	for(i = 0;i<sprite.children.length;i++){
		this.bufferSprite(sprite.children[i]);
	}
	
	return this;
};

CanvasRenderer.prototype.renderSprite = function(sprite){
	for(var i = 0;i<sprite.polygons.length;i++){	
		var polygon = sprite.polygons[i];
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[sprite.id+'v'+polygon.id]);
		this.gl.vertexAttribPointer(this.vertexPositionAttribute, 2, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[sprite.id+'c'+polygon.id]);
		this.gl.vertexAttribPointer(this.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[sprite.id+'v'+polygon.id]);
		this.gl.vertexAttribPointer(this.vertexTranslationAttribute, 2, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[sprite.id+'v'+polygon.id]);
		this.gl.vertexAttribPointer(this.vertexRotationAttribute, 2, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[sprite.id+'v'+polygon.id]);
		this.gl.vertexAttribPointer(this.vertexScaleAttribute, 2, this.gl.FLOAT, false, 0, 0);
		
		this.gl.uniform2f(this.uniformScreenResolution, this.canvas.width, this.canvas.height);
		
		this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, polygon.length);
	}
	
	for(var i = 0;i<sprite.children.length;i++){
		this.renderSprite(sprite.children[i]);
	}

	return this;
};

CanvasRenderer.prototype.prepFrame = function(){
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	return this;
};

CanvasRenderer.prototype.init = function(){
	if(this.gl){
		this.gl.clearColor(.1, .1, .1, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		this.fragmentShader = new Shader(this.gl, "x-shader/x-fragment").init();
		this.vertexShader = new Shader(this.gl, "x-shader/x-vertex").init();
		
		this.shaderProgram = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgram, this.vertexShader.s);
		this.gl.attachShader(this.shaderProgram, this.fragmentShader.s);
		this.gl.linkProgram(this.shaderProgram);
		
		if(!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)){
			console.log("Unable to initalize Shader Program");
		}
		
		this.gl.useProgram(this.shaderProgram);
		
		this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
		this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
		
		this.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aColor');
		this.gl.enableVertexAttribArray(this.vertexColorAttribute);
		
		this.vertexTranslationAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aTranslation');
		this.gl.enableVertexAttribArray(this.vertexTranslationAttribute);
		
		this.vertexScaleAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aScale');
		this.gl.enableVertexAttribArray(this.vertexScaleAttribute);
		
		this.vertexRotationAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aRotation');
		this.gl.enableVertexAttribArray(this.vertexRotationAttribute);
		
		this.uniformScreenResolution = this.gl.getUniformLocation(this.shaderProgram, 'uResolution');
	}else{
		console.log('Unable to Initalize WebGL');
	}
	
	return this;
}

CanvasRenderer.prototype.resize = function(width, height){
	this.canvas.width = width;
	this.canvas.height = height;
	this.gl.viewport(0, 0, width, height);
	
	return this;
};

module.exports = CanvasRenderer;
