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
			'attribute vec2 aPosition;'+		
			'attribute vec4 aColor;'+
			'uniform vec2 uResolution;'+
			'varying lowp vec4 vColor;'+
			'void main(){'+
				'gl_Position = vec4(((aPosition / uResolution) * 2.0) - 1.0, 0.0, 1.0);'+
				'vColor = aColor;'+
			'}';
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
