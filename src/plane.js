var geom = (function(geom){
	geom.plane = function(vertices, positionOffset, indices, cols, rows) {
		cols = cols || 1;
		rows = rows || cols;
		var colSize = 1 / cols;
		var rowSize = 1 / rows;
		cols++;
		rows++;
		var i = 0, l = cols * rows;
		while(i < l) {
			var col = i % cols;
			var row = Math.floor(i / cols);
			vertices.add([-0.5 + col * colSize, -0.5 + row * rowSize, 0], positionOffset);
			i++;
		}
	};
	return geom;
})(typeof exports !== "undefined" ? exports : geom || {});
