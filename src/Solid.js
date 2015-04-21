var PI = Math.PI;
var PI2 = PI * 0.5;
var cos = Math.cos;
var sin = Math.sin;
var pow = Math.pow;
var floor = Math.floor;
var round = Math.round;


var Solid = geom.Solid = function Solid(vertices, mat) {
	this.data = vertices;
	if(mat) {
		mat.transform(this);
	}
};

var prototype = Solid.prototype;

prototype.union = function(that) {
	return new Solid();
};

prototype.subtraction = function(that) {
	return new Solid();
};

prototype.intersection = function(that) {
	return new Solid();
};

prototype.intersects = function(that, info) {
	return false;
};

prototype.traverse = function() {

};

prototype.createMesh = function() {
	var precision = pow(10, 5);
	var data = this.data, index = 0, length = data.length;

	var vertices = [];
	var indices = [];

	while(index < length) {
		var x = round(data[index++] * precision) / precision;
		var y = round(data[index++] * precision) / precision;
		var z = round(data[index++] * precision) / precision;

		var v = -1, f = 0, l = vertices.length;

		while(v < 0 && f < l) {
			if(vertices[f] == x && vertices[f + 1] == y && vertices[f + 2] == z) {
				v = f / 3;
			}
			f += 3;
		}

		if(v > -1) {
			indices.push(v);
		}
		else {
			indices.push(l / 3);
			vertices.push(x, y, z);
		}
	}

	var mesh = new geom.Mesh();
	mesh.vertexData = new Float32Array(vertices);
	mesh.indexData = new Uint16Array(indices);
	mesh.vertices = {data:mesh.vertexData, offset:0, stride:3};
	return mesh;
};


// Factories

geom.createSphere = function(divisions, mat) {
	divisions = divisions || 10;

	var div = PI / divisions, off = 0.5;
	var length = divisions * divisions;
	var data = [];

	for(var i = 0; i<length; i++) {
		var x = i % divisions;
		var y = floor(i / divisions);
		var x1 = x * 2 * div;
		var y1 = y * div;
		var x2 = x1 + 2 * div;
		var y2 = y1 + div;

		var cosx1 = cos(x1);
		var cosy1 = cos(y1);
		var sinx1 = sin(x1);
		var siny1 = sin(y1);
		var cosx2 = cos(x2);
		var cosy2 = cos(y2);
		var sinx2 = sin(x2);
		var siny2 = sin(y2);

		var z1 = cosy1 * off;
		var z2 = cosy2 * off;

		data.push(
			cosx1 * siny1 * off, siny1 * sinx1 * off, z1,
			cosx1 * siny2 * off, siny2 * sinx1 * off, z2,
			cosx2 * siny1 * off, siny1 * sinx2 * off, z1,
			cosx1 * siny2 * off, siny2 * sinx1 * off, z2,
			cosx2 * siny2 * off, siny2 * sinx2 * off, z2,
			cosx2 * siny1 * off, siny1 * sinx2 * off, z1
		);
	}

	return new Solid(data);
};

geom.createPlane = function(divisions, mat) {
	divisions = divisions || 1;

	var div = 1 / divisions, off = 0.5;
	var length = divisions * divisions;
	var data = [];

	for(var i = 0; i<length; i++) {
		var x = div * (i % divisions) - off;
		var y = div * floor(i / divisions) - off;
		data.push(x, y, 0, x, y + div, 0, x + div, y, 0, x, y + div, 0, x + div, y + div, 0, x + div, y, 0);
	}

	return new Solid(data, mat);
};

geom.createCube = function(divisions, mat) {
	var view = new geom.Mat4();
	var data, plane = geom.createPlane;

	view.translate(0, 0, 0.5);
	data = plane(divisions, view).data;

	view.rotateY(PI2).translate(0.5, 0, 0.5);
	data = data.concat(plane(divisions, view).data);

	view.rotateY(PI2).translate(0.5, 0, 0.5);
	data = data.concat(plane(divisions, view).data);

	view.rotateY(PI2).translate(0.5, 0, 0.5);
	data = data.concat(plane(divisions, view).data);
	
	view.identity().rotateX(PI2).translate(0, 0, 0.5);
	data = data.concat(plane(divisions, view).data);

	view.rotateX(PI).translate(0, 0, 1);
	data = data.concat(plane(divisions, view).data);

	return new Solid(data, mat);
};

geom.createCylinder = function(divisions, mat) {
	return new Solid();
};
