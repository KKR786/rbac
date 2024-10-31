const express = require('express')

const { newRole, getRoleList, deleteRole } = require('../controllers/roleController')

const requireAuth = require('../middlewares/requireAuth')
const access = require('../middlewares/roleBasedAccess')

const router = express.Router()
router.use(requireAuth)

router.post('/role/create', access.checkPermission('create_record'), newRole)
router.delete('/role/:id', access.checkPermission('delete_record'), deleteRole)
router.get('/role/all', access.checkPermission('read_record'), getRoleList)


module.exports = router