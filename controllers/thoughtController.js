const { User, Thought } = require('../models');

module.exports  ={
    // GET all thoughts
    async getThought(req, res) {
        await Thought.find()
        .then((thought) => res.status(200).json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // GET single thought
    async getSingleThought(req, res) {
        await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No Thought found with that ID!"})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // CREATE a thought
    async createThought(req, res) {
        await Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: _id}},
                { runValidators: true, new: true }
            );
        })
        .then((thought) => 
            !thought    
                ? res.status(404).json({ message: "No User found with this ID!"})
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // UPDATE a thought
    async updateThought(req, res) {
        await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res. status(404).json({ message: "No Thought found with this ID!"})
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought
    async deleteThought(req, res) {
        await Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => 
            !thought
                ? res.status(404).json({ mesasage: "No Thought found with this ID!"})
                : res.status(200).json(thought)  
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "Thought deleted but user not found"})
                : res.status(200).json({ message: "The thought was succesfully deleted"})
        )
        .catch((err) => res.status(500).json(err));
    },
    //create a reaction
    async createReaction(req, res) {
        await Thought.updateOne(
            {_id: req.params.thoughtId },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true}
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No Thought found with this ID!"})
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Remove a reaction
    async deleteReaction(req, res) {
        await Thought.updateOne(
            {_id: req.params.thougthId },
            { $pull: { reactions: req.params.reactionId }},
            { new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No Thought found with this ID!"})
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};