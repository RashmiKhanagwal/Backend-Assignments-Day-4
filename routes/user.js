const router = require('express').Router();
const User = require("../controllers/user");
const Admin = require("../middleware/admin")

router.get('/showallUser', Admin, User.getAllTodo)
router.post('/register', User.createUser)
router.post('/login', User.login)
router.get('/showUser/:id', Admin, User.getUser)
router.patch('/updateUser/:id', Admin, User.updateUser)
router.delete('/deleteallUser', Admin, User.deleteAllUser)
router.delete('/deleteUser/:id', Admin, User.deleteUser)

module.exports = router;