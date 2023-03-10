const { User, Thought } = require('../models');

module.exports  ={
    // GET all users
    async getUser(req, res) {
        try {
            const users = await User.find({})
            .populate('friends')
            .populate('thoughts');

            res.status(200).json(users)
        }
        catch (error) {
            res.status(500).json(err)
        }
    },
    // GET single user
    async getSingleUser(req, res) {
            await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No User found with that ID!"})
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // CREATE a user
    async createUser(req, res) {
        await User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // UPDATE a user
    async updateUser(req, res) {
        await User.updateOne(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res. status(404).json({ message: "No User found with this ID!"})
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a user
    async deleteUser(req, res) {
        await User.deleteOne({ _id: req.params.userId})
        .then((user) => 
            !user
                ? res.status(404).json({ mesasage: "No User found with this ID!"})
                // BONUS: Remove a user's associated thoughts when deleted
                : Thought.deleteMany({ _id: {$in: user.thoughts}})    
        )
        .then(() => res.json({ message: "User and their thought have been deleted!"}))
        .catch((err) => res.status(500).json(err))
    },
    //Add a friend to a user's friend list
    async addFriend(req, res) {
        await User.updateOne(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId }},
            { runValidators: true, new: true}
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No User found with this ID!"})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Remove a friend from a user's friend list
    async deleteFriend(req, res) {
        await User.updateOnee(
            {_id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No User found with this ID!"})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }

};