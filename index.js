const AWS = require('aws-sdk');
const express = require("express");
const path = require("path");
const s3 = new AWS.S3();

const app = express();

const s3_params = {
	Bucket: 'johnbarboza-www'
};

app.get('/', function(req, res) {
	var stream = s3.getObject({ ...s3_params, Key: 'public/index.html' }).createReadStream();

	// Listen for errors returned by the service
	stream.on('error', function(err) {
		console.error(err);
		stream.end();
	});

	stream.pipe(res);
});

app.use('/resume', require('./resume'));

// Set port
const PORT = process.env.PORT || 80;

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
