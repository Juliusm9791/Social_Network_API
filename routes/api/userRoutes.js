const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/User
router.route('/').get(getUsers).post(createUser);

// /api/User/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// // /api/User/:userId/thought
// router.route('/:userId/thought').post(addThought);

// // /api/User/:userId/thought/:assignmentId
// router.route('/:userId/thought/:thoughtId').delete(removeThought);

module.exports = router;
