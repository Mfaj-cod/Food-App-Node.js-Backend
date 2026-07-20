const express = require('express')
const { testUserController } = require('../controllers/testControllers')

// router
const router = express.Router()

// routes
router.get('/test-user', testUserController);

// export
module.exports = router;
