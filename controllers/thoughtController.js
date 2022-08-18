const { User, Thought } = require('../models');

//Thought controller
const thoughtController = {
    //Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    //Get a single thought by putting thoughtId in url /thoughts/:thoughtId
    getThoughtbyId(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    //Create thought
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
    // Update thought through url /thoughts/:thoughtId
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    // Delete thought through url /thoughts/:thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    // Create reaction through url /thoughts/:thoughtId/reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    },
    // Delete reaction through url /thoughts/:thoughtId/reactions/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => console.log(err));
    }
};

module.exports = thoughtController;