var fs = require('fs');

var sourceFolder = './src/';
var outputFile = './dst/geom.js';

fs.readdir(sourceFolder, function(error, files){
	
	files = files.filter(function(file){ 
		return file.substr(-3) === '.js';
	});

	var data = '';

	data += 'var geom = (typeof exports !== \'undefined\' ? exports : {});\n';

	files.forEach(function(file){
		var content = fs.readFileSync(sourceFolder + file, 'utf-8');
		
		data += '(function(){\n';
		data += content;
		data += '})();\n';
	});

	fs.writeFileSync(outputFile, data, 'utf-8');
});


