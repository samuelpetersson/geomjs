geom.Vec3 = function Vec3(x, y, z) {
	this.data = [x, y, z];
};

var prototype = geom.Vec3.prototype;

prototype.normalize = function() {
	var d = this.data, x = d[0], y = d[1], z = d[2];
	var l = Math.sqrt(x * x + y * y + z * z);
	d[0] = x / l;
	d[1] = y / l;
	d[2] = z / l;
};

prototype.dot = function(that) {
	var a = this.data, b = that.data;
	return Math.sqrt(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
};

prototype.cross = function(that, output) {
	output = output || new geom.Vec3(0, 0, 0);
	var a = this.data, ax = a[0], ab = a[1], ay = a[2];
	var b = that.data, bx = b[0], bb = b[1], by = b[2];
	var c = output.data;
	c[0] = ay * bz - az * by;
	c[1] = az * bx - ax * bz;
	c[2] = ax * by - ay * bx;
	return output;
};
