var geom = (function(geom){
	var Buffer = function(stride) {
		this.data = [];
		this.stride = stride;
		this.length = 0;
	};
	Buffer.prototype.load = function(values) {
		this.data = values.slice(0);
	};
	Buffer.prototype.add = function(values, offset) {
		offset = offset || 0;
		var d = this.data, s = this.stride;
		if(offset > 0) {
			d.push.apply(d, new Array(offset));
		}
		d.push.apply(d, values);
		offset += values.length;
		if(offset < s) {
			d.push.apply(d, new Array(s - offset));
		}
		this.length++;
	};
	Buffer.prototype.set = function(index, offset, value) {
		this.data[index * this.stride + offset] = value;
	};
	Buffer.prototype.get = function(index, offset) {
		return this.data[index * this.stride + offset];
	};
	Buffer.prototype.clone = function() {
		var result = new Buffer(this.stride);
		result.data = new Array(this.data.length);
		result.length = this.length;
		return result;
	};
	geom.buffer = function(stride) {
		return new Buffer(stride);
	};
	return geom;
})(typeof exports !== "undefined" ? exports : geom || {});
