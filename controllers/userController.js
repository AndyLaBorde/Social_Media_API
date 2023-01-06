const { User, Thought } = require('../models');

module.exports  ={
    // GET all users
    getUser(req, res) {
        User.find({})
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },
    // GET single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No User found with that ID!"})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // CREATE a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // UPDATE a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res. status(404).json({ message: "No User found with this ID!"})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a user

    // BONUS: Remove a user's associated thoughts when deleted

    //Add a friend to a user's friend list

    //Remove a friend from a user's friend list


}