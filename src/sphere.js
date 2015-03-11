var geom = (function(geom){
	geom.sphere = function(vertices, positionOffset, indices, cols, rows) {
		cols = cols || 1;
		rows = rows || cols;

		for (var row = 0; row <= rows; row++) {
			var theta = row * Math.PI / rows;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (var col = 0; col <= cols; col++) {
				var phi = col * 2 * Math.PI / cols;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);

				var x = cosPhi * sinTheta;
				var y = sinTheta * sinPhi;
				var z = cosTheta;

				vertices.add([x, y, z], positionOffset);
			}
		}

	};
	return geom;
})(typeof exports !== "undefined" ? exports : geom || {});
