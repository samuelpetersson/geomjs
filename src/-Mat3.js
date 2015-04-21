geom.Mat3 = function Mat3() {
	this.data = new geom.MatData(9);
	this.identity();
};

var prototype = geom.Mat3.prototype;

prototype.identity = function() {
	var m = this.data;
	m[0] = m[4] = m[8] = 1;
	m[1] = m[2] = m[3] = m[5] = m[6] = m[7] = 0;
};

prototype.scale = function(x, y) {
	var m = this.data;
	m[0] *= x; m[1] *= x; m[2] *= x;
	m[3] *= y; m[4] *= y; m[5] *= y;
};

prototype.translate = function(x, y) {
	var m = this.data;
	m[6] += x * m[0] + y * m[3];
	m[7] += x * m[1] + y * m[4];
	m[8] += x * m[2] + y * m[5];
};

prototype.rotate = function(a) {
	var m = this.data, c = Math.cos(a), s = Math.sin(a);
	var m00 = m[0], m01 = m[1], m02 = m[2], m10 = m[3], m11 = m[4], m12 = m[5];
	m[0] = c * m00 + s * m10;
	m[1] = c * m01 + s * m11;
	m[2] = c * m02 + s * m12;
	m[3] = c * m10 - s * m00;
	m[4] = c * m11 - s * m01;
	m[5] = c * m12 - s * m02;
};
