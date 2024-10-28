const express = require('express')

const { newRole, getRoleList } = require('../controllers/roleController')

const requireAuth = require('../middlewares/requireAuth')
const access = require('../middlewares/roleBasedAccess')

const router = express.Router()
router.use(requireAuth)

router.post('/role/create', access.checkPermission('create_record'), newRole)
router.get('/role/all', access.checkPermission('read_record'), getRoleList)


module.exports = router