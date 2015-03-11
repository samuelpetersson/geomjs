var geom = (function(geom){
	var Mat3 = function() {
		var m = this.data = new Float32Array(9);
		m[0] = m[4] = m[8] = 1;
		m[1] = m[2] = m[3] = m[5] = m[6] = m[7] = 0;
	};
	Mat3.prototype.identity = function() {
		var m = this.data;
		m[0] = m[4] = m[8] = 1;
		m[1] = m[2] = m[3] = m[5] = m[6] = m[7] = 0;
	};
	Mat3.prototype.scale = function(x, y) {
		var m = this.data;
		m[0] *= x; m[1] *= x; m[2] *= x;
		m[3] *= y; m[4] *= y; m[5] *= y;
	};
	Mat3.prototype.translate = function(x, y) {
		var m = this.data;
		m[6] += x * m[0] + y * m[3];
		m[7] += x * m[1] + y * m[4];
		m[8] += x * m[2] + y * m[5];
	};
	Mat3.prototype.rotate = function(a) {
		var m = this.data, c = Math.cos(a), s = Math.sin(a);
		var m00 = m[0], m01 = m[1], m02 = m[2], m10 = m[3], m11 = m[4], m12 = m[5];
		m[0] = c * m00 + s * m10;
		m[1] = c * m01 + s * m11;
		m[2] = c * m02 + s * m12;
		m[3] = c * m10 - s * m00;
		m[4] = c * m11 - s * m01;
		m[5] = c * m12 - s * m02;
	};
	Mat3.prototype.invert = function() {
		var m = this.data;
		/*
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
		*/
	};
	Mat3.prototype.concat = function(that) {
		var a = this.data, b = that.data;
		/*
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
		*/
	};
	Mat3.prototype.transpose = function() {
		var m = this.data;
		var m01 = m[1], m02 = m[2], m12 = m[5];
        m[1] = m[3];
        m[2] = m[6];
        m[3] = m01;
        m[5] = m[7];
        m[6] = m02;
        m[7] = m12;
	};
	Mat3.prototype.transform = function(source, sourceOffset, output, outputOffset) {
		sourceOffset = sourceOffset || 0;
		output = output || source;
		outputOffset = outputOffset || (output ? 0 : sourceOffset);
		var m = this.data;
		for(var i = 0; i<source.length; i++) {
			var x = source.get(i, sourceOffset);
			var y = source.get(i, sourceOffset + 1);
			output.set(i, outputOffset, x * m[0] + y * m[1] + m[6]);
			output.set(i, outputOffset + 1, x * m[3] + y * m[4] + m[7]);
		}
	};
	geom.mat3 = function() {
		return new Mat3();
	};
	return geom;
})(typeof exports !== "undefined" ? exports : geom || {});
