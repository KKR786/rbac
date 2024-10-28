const express = require('express')

const { loginUser, signupUser, updateUserProfile, updateUserPassword } = require('../controllers/auth')
const { newRole, getRoleList } = require('../controllers/roleController')

const requireAuth = require('../middlewares/requireAuth')
const access = require('../middlewares/roleBasedAccess')

const router = express.Router()
router.use(requireAuth)


router.post('/user/login', loginUser)
router.post('/user/signup', signupUser)

router.post('/role/create', newRole)
router.get('/role/all', access.checkPermission('read_record'), getRoleList)



//update user info
router.patch('/user/profile/:_id', updateUserProfile)
router.patch('/user/change_password/:_id', updateUserPassword)



module.exports = router