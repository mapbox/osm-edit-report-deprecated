var express = require('express');
var cors = require('cors');
var fs = require('fs');
var readline = require('readline');

var app = express();
app.use(cors());
console.log("http://localhost:3021/data");
var objs = function() {
	return {
		values: [],
		key: null,
		color: "#ff7f0e"
	};
};



app.get('/data/:date', function(req, res) {
	var date = req.params.date;
	var array_json = [];
	var users = [];
	console.log(date);
	var rd = readline.createInterface({
		input: fs.createReadStream('data/' + date + '.csv'),
		output: process.stdout,
		terminal: false
	});
	var bandera = true;
	var array_objs = [];
	rd.on('line', function(line) {
		if (bandera) {
			var users = line.split(',');
			for (var i = 1; i < users.length; i++) {
				var user = new objs();
				user.key = users[i];
				array_objs.push(user)

			};
			bandera = false;
		} else {


			var data = line.split(',');
			for (var i = 1; i < data.length - 1; i++) {
				array_objs[i].values.push({
					x: data[0],
					y: data[i]
				});

			};

		}

	}).on('close', function() {

		res.json(array_objs);
		//process.exit(0);
	});
});

app.listen(process.env.PORT || 3021);