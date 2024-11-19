const express = require('express')

const { loginUser, signupUser, updateUserProfile, updateUserPassword } = require('../controllers/auth')
const { getProductList } = require('../controllers/product')

const router = express.Router()


router.post('/user/login', loginUser)
router.post('/user/signup', signupUser)


//update user info
router.patch('/user/profile/:_id', updateUserProfile)
router.patch('/user/change_password/:_id', updateUserPassword)

router.get('/products', getProductList);



module.exports = router