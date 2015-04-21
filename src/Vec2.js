geom.Vec2 = function Vec2(x, y) {
	this.data = [x, y];
};

var prototype = geom.Vec2.prototype;

prototype.normalize = function() {
	var d = this.data, x = d[0], y = d[1];
	var l = Math.sqrt(x * x + y * y);
	d[0] = x / l;
	d[1] = y / l;
};

prototype.dot = function(that) {
	var a = this.data, b = that.data;
	return Math.sqrt(a[0] * b[0] + a[1] * b[1]);
};

prototype.angle = function() {
	var d = this.data;
	return Math.atan(-d[1], d[0]);
};
