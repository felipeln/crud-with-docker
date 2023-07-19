const controllers = require('../controllers/users')

const router = require('express').Router()


//* CRUD ROUTES  /users

// ? create user
router.post('/', controllers.createUser) // /users

// ? get all users
router.get('/',controllers.getUsers) // /users



// ? get single user
router.get('/edit/:userId', controllers.getUser) // /users/:userId


// ? update user
router.put('/:userId', controllers.updateUser ) // /users/:userId

// ? delete user
router.delete('/:userId', controllers.deleteUser) // /users/:userId



module.exports = router