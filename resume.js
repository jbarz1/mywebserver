const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const s3_params = {
	Bucket: 'johnbarboza-www'
};
const s3BucketPrefix = 'public/resume/';

function middleware(page, outStream) {
	var stream = s3.getObject({
		...s3_params,
		Key: s3BucketPrefix + page
	}).createReadStream();

	// Listen for errors returned by the service
	stream.on('error', function(err) {
		console.error(err);
		stream.end();
	});

	stream.pipe(outStream);
}


router.get('/', (req, resp) => middleware('index.html', resp));
router.get('/:page', (req, resp) => middleware(req.params.page, resp));

module.exports = router
