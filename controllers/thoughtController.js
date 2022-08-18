const { runInNewContext } = require('vm');
const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    getThoughtbyId(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactons: req.params.reactionId } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    }
}

module.exports = thoughtController;