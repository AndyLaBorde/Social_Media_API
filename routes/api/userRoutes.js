const router = require('express').Router();

const {
    getUser,
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require('../../controllers/userController');

// api/users
//GET all and POST
router.route('/').get(getUser).post(createUser);

// api/users/:userId
// GET one user, PUT(update) and DELETE
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// localhost:3001/api/users/:userId/friends:friendId 
// POST and DELETE a friend by id
router.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;