const api_router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../controllers/userController');

const {
    getAllThoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../controllers/thoughtController')

api_router.route('/users')
    .get(getAllUsers)
    .post(createNewUser);

api_router.route('/users/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

api_router.route('/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

api_router.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought);

api_router.route('/thoughts/:thoughtId')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought);

api_router.route('/thoughts/:thoughtId/reactions')
    .post(createReaction);
    
api_router.route('/thoughts/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = api_router;