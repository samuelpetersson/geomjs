geom.Mat4 = function Mat4() {
	this.data = new geom.MatData(16);
	this.identity();
};

var prototype = geom.Mat4.prototype;

prototype.identity = function() {
	var m = this.data;
	m[0] = m[5] = m[10] = m[15] = 1;
	m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0;
	return this;
};

prototype.frustum = function(left, right, bottom, top, near, far) {
	var m = this.data;
	var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	
	a[0] = a00 * b00;
	a[1] = a01 * b11;
	a[2] = a02 * b22 + a03 * b32;
	a[3] = a02 * b23 + a03 * b33;
	a[4] = a10 * b00;
	a[5] = a11 * b11;
	a[6] = a12 * b22 + a13 * b32;
	a[7] = a12 * b23 + a13 * b33;
	a[8] = a20 * b00;
	a[9] = a21 * b11;
	a[10] = a22 * b22 + a23 * b32;
	a[11] = a22 * b23 + a23 * b33;
	a[12] = a30 * b00;
	a[13] = a31 * b11;
	a[14] = a32 * b22 + a33 * b32;
	a[15] = a32 * b23 + a33 * b33;

	return this;
};

prototype.perspective = function(fov, aspect, near, far) {
	/*
	var bottom = near * Math.tan(fov * Math.PI / 360);
	var top = -bottom;
	var left = top * aspect;
	var right = bottom * aspect;
	this.frustum(left, right, bottom, );
*/
	var f = Math.tan(Math.PI * 0.5 - 0.5 * fov), range = 1.0 / (near - far);
	var a = this.data;
	var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	
	var b00 = f / aspect;
	var b11 = f;
	var b22 = (near + far) * range;
	var b23 = -1;
	var b32 = near * far * range * 2;
	var b33 = 1;

	a[0] = a00 * b00;
	a[1] = a01 * b11;
	a[2] = a02 * b22 + a03 * b32;
	a[3] = a02 * b23 + a03 * b33;
	a[4] = a10 * b00;
	a[5] = a11 * b11;
	a[6] = a12 * b22 + a13 * b32;
	a[7] = a12 * b23 + a13 * b33;
	a[8] = a20 * b00;
	a[9] = a21 * b11;
	a[10] = a22 * b22 + a23 * b32;
	a[11] = a22 * b23 + a23 * b33;
	a[12] = a30 * b00;
	a[13] = a31 * b11;
	a[14] = a32 * b22 + a33 * b32;
	a[15] = a32 * b23 + a33 * b33;

	return this;

};

prototype.lookAt = function(x, y, z) {
	var m = this.data, dx = m[12] - x, dy = m[13] - y, dz = m[14] - z;
	var l = Math.sqrt(dx * dx + dy * dy + dz * dz);
	var zx = 0, zy = 0, zz = 0;
	if (l > 0.00001) {
		zx = dx / l;
		zy = dy / l;
		zz = dz / l;
	}
	var xx = 1 * zz - 0 * zy;
	var xy = 0 * zx - 0 * zz;
	var xz = 0 * zy - 1 * zx;
	var yx = zy * xz - zz * xy;
	var yy = zz * xx - zx * xz;
	var yz = zx * xy - zy * xx;
	m[0] = xx; m[1] = xy; m[2] = xz;
	m[4] = yx; m[5] = yy; m[6] = yz;
	m[8] = zx; m[9] = zy; m[10] = zz;
	return this;
};

prototype.scale = function(x, y, z) {
	var m = this.data;
	m[0] *= x; m[1] *= x; m[2] *= x; m[3] *= x;
	m[4] *= y; m[5] *= y; m[6] *= y; m[7] *= y;
	m[8] *= z; m[9] *= z; m[10] *= z; m[11] *= z;
	return this;
};

prototype.translate = function(x, y, z) {
	var m = this.data;
	m[12] += m[0] * x + m[4] * y + m[8] * z;
	m[13] += m[1] * x + m[5] * y + m[9] * z;
	m[14] += m[2] * x + m[6] * y + m[10] * z;
	m[15] += m[3] * x + m[7] * y + m[11] * z;
	return this;
};

prototype.rotateX = function(a) {
	var m = this.data, c = Math.cos(a), s = Math.sin(a);
	var m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7], m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
	m[4] = m10 * c + m20 * s;
	m[5] = m11 * c + m21 * s;
	m[6] = m12 * c + m22 * s;
	m[7] = m13 * c + m23 * s;
	m[8] = m10 * -s + m20 * c;
	m[9] = m11 * -s + m21 * c;
	m[10] = m12 * -s + m22 * c;
	m[11] = m13 * -s + m23 * c;
	return this;
};

prototype.rotateY = function(a) {
	var m = this.data, c = Math.cos(a), s = Math.sin(a);
	var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3], m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
	m[0] = m00 * c + m20 * -s;
	m[1] = m01 * c + m21 * -s;
	m[2] = m02 * c + m22 * -s;
	m[3] = m03 * c + m23 * -s;
	m[8] = m00 * s + m20 * c;
	m[9] = m01 * s + m21 * c;
	m[10] = m02 * s + m22 * c;
	m[11] = m03 * s + m23 * c;
	return this;
};

prototype.rotateZ = function(a) {
	var m = this.data, c = Math.cos(a), s = Math.sin(a);
	var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3], m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
	m[0] = m00 * c + m10 * s;
	m[1] = m01 * c + m11 * s;
	m[2] = m02 * c + m12 * s;
	m[3] = m03 * c + m13 * s;
	m[4] = m00 * - s + m10 * c;
	m[5] = m01 * - s + m11 * c;
	m[6] = m02 * - s + m12 * c;
	m[7] = m03 * - s + m13 * c;
	return this;
};

prototype.invert = function() {
	var m = this.data;
	var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3], m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7], m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11], m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
	var n0 = m22 * m33, n1 = m32 * m23, n2 = m12 * m33, n3 = m32 * m13, n4 = m12 * m23, n5 = m22 * m13, n6 = m02 * m33, n7 = m32 * m03, n8 = m02 * m23, n9 = m22 * m03, n10 = m02 * m13, n11 = m12 * m03, n12 = m20 * m31, n13 = m30 * m21, n14 = m10 * m31, n15 = m30 * m11, n16 = m10 * m21, n17 = m20 * m11, n18 = m00 * m31, n19 = m30 * m01, n20 = m00 * m21, n21 = m20 * m01, n22 = m00 * m11, n23 = m10 * m01;
	var t0 = (n0 * m11 + n3 * m21 + n4 * m31) - (n1 * m11 + n2 * m21 + n5 * m31), t1 = (n1 * m01 + n6 * m21 + n9 * m31) - (n0 * m01 + n7 * m21 + n8 * m31), t2 = (n2 * m01 + n7 * m11 + n10 * m31) - (n3 * m01 + n6 * m11 + n11 * m31), t3 = (n5 * m01 + n8 * m11 + n11 * m21) - (n4 * m01 + n9 * m11 + n10 * m21);
	var d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
	m[0] = t0 * d; 
	m[1] = t1 * d; 
	m[2] = t2 * d; 
	m[3] = t3 * d;
	m[4] = ((n1 * m10 + n2 * m20 + n5 * m30) - (n0 * m10 + n3 * m20 + n4 * m30)) * d;
	m[5] = ((n0 * m00 + n7 * m20 + n8 * m30) - (n1 * m00 + n6 * m20 + n9 * m30)) * d;
	m[6] = ((n3 * m00 + n6 * m10 + n11 * m30) - (n2 * m00 + n7 * m10 + n10 * m30)) * d;
	m[7] = ((n4 * m00 + n9 * m10 + n10 * m20) - (n5 * m00 + n8 * m10 + n11 * m20)) * d;
	m[8] = ((n12 * m13 + n15 * m23 + n16 * m33) - (n13 * m13 + n14 * m23 + n17 * m33)) * d;
	m[9] = ((n13 * m03 + n18 * m23 + n21 * m33) - (n12 * m03 + n19 * m23 + n20 * m33)) * d;
	m[10] = ((n14 * m03 + n19 * m13 + n22 * m33) - (n15 * m03 + n18 * m13 + n23 * m33)) * d;
	m[11] = ((n17 * m03 + n20 * m13 + n23 * m23) - (n16 * m03 + n21 * m13 + n22 * m23)) * d;
	m[12] = ((n14 * m22 + n17 * m32 + n13 * m12) - (n16 * m32 + n12 * m12 + n15 * m22)) * d;
	m[13] = ((n20 * m32 + n12 * m02 + n19 * m22) - (n18 * m22 + n21 * m32 + n13 * m02)) * d;
	m[14] = ((n18 * m12 + n23 * m32 + n15 * m02) - (n22 * m32 + n14 * m02 + n19 * m12)) * d;
	m[15] = ((n22 * m22 + n16 * m02 + n21 * m12) - (n20 * m12 + n23 * m22 + n17 * m02)) * d;
	return this;
};

prototype.concat = function(that) {
	var a = this.data, b = that.data;
	var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	var b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3], b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7], b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11], b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
	a[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	a[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	a[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	a[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
	a[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	a[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	a[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
	a[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
	a[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	a[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	a[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
	a[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
	a[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
	a[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
	a[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
	a[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
	return this;
};

prototype.project = function(input, output) {
	output = output || input;

	var inputData = input.data, inputStride = input.stride || 3, inputIndex = input.offset || 0;
	var outputData = output.data, outputStride = output.stride || 3, outputIndex = output.offset || 0;

	var index = 0, length = Math.min(inputData.length / inputStride, outputData.length / outputStride);

	var m = this.data;

	while(index++ < length) {
		var x = inputData[inputIndex];
		var y = inputData[inputIndex + 1];
		var z = inputData[inputIndex + 2];

		var tx = m[0] * x + m[4] * y + m[8] * z + m[12];
		var ty = m[1] * x + m[5] * y + m[9] * z + m[13];
		var tz = m[2] * x + m[6] * y + m[10] * z + m[14];
		var tw = m[3] * x + m[7] * y + m[11] * z + m[15];

		outputData[outputIndex] = 1 + (tx / tw);
		outputData[outputIndex + 1] = 1 - (ty / tw);
		outputData[outputIndex + 2] = 1 + (tz / tw);

		inputIndex += inputStride;
		outputIndex += outputStride;
	}

	return this;
};

prototype.transform = function(input, output) {
	output = output || input;

	var inputData = input.data, inputStride = input.stride || 3, inputIndex = input.offset || 0;
	var outputData = output.data, outputStride = output.stride || 3, outputIndex = output.offset || 0;

	var index = 0, length = Math.min(inputData.length / inputStride, outputData.length / outputStride);

	var m = this.data;

	while(index++ < length) {
		var x = inputData[inputIndex];
		var y = inputData[inputIndex + 1];
		var z = inputData[inputIndex + 2];

		var tx = m[0] * x + m[4] * y + m[8] * z + m[12];
		var ty = m[1] * x + m[5] * y + m[9] * z + m[13];
		var tz = m[2] * x + m[6] * y + m[10] * z + m[14];

		outputData[outputIndex] = tx;
		outputData[outputIndex + 1] = ty;
		outputData[outputIndex + 2] = tz;

		inputIndex += inputStride;
		outputIndex += outputStride;
	}

	return this;
};
