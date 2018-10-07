const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();
router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

module.exports = router;