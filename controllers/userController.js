const { User } = require('../models');

// User Controller
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => console.log(err))
    },
    // Get a single user through url /users/:userId
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .then(userData => res.json(userData))
            .catch(err => console.log(err));
    },
    // Create new user
    createNewUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    // Update user through url /users/:userId
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    // Delete user through url /users/:userId
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    //Add friend through url /users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    //Delete friend through url /users/:userId/friends/:friendId
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(user => res.json(user))
            .catch(err => console.log(err));
    }
};

module.exports = userController;