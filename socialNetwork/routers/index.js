const router = require('express').Router();
const apiV1 = require('./v1');

router.use([apiV1]);

module.exports = router;