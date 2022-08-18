const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => console.log(err))
    },
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
    createNewUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then(user => res.json(user))
            .catch(err => console.log(err));
    },
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