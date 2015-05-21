function Shader(gl, type, source){
	this.gl = gl || null;
	this.source = source || null;
	this.type = type || null;
	this.shader = null;
}

Shader.prototype.init = function(){
	if(this.source){
		if(this.type == 'x-shader/x-fragment'){
			this.shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		}else if(this.type == 'x-shader/x-vertex'){
			this.shader = this.gl.createShader(this.gl.VERTEX_SHADER);
		}else{
			console.log("Unknown Shader Type :" + this.type);
		}
	}else{
		if(this.type == 'x-shader/x-fragment'){
			this.shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
			this.source = 
			"varying lowp vec4 vColor;" +
			"void main(void){" + 
				"gl_FragColor = vColor;" +
			"}";
		}else if(this.type == 'x-shader/x-vertex'){
			this.shader = this.gl.createShader(this.gl.VERTEX_SHADER);
			this.source = 
			"attribute vec3 aVertexPosition;" +
			"attribute vec4 aVertexColor;" +
			"uniform mat4 uMVMatrix;" +
			"uniform mat4 uPMatrix;" +
			"varying lowp vec4 vColor;" +
			"void main(void) {" +
				"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);" +
			"}";
		}else{
			console.log("Unknown Shader Type :" + this.type);
		}
	}

	this.gl.shaderSource(this.shader, this.source);
	this.gl.compileShader(this.shader);
	
	this.s = this.shader;
	
	return this;
}

module.exports = Shader;
