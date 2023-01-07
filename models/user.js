const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        // USERNAME MUST BE
        // STRING,UNIQUE,REQUIRED,TRIMMED
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // EMAIL MUST BE
        // STRING, REQUIRED, UNIQUE, MATCH A VALID EMAIL ADDRESS(LOOK INTO MONGOOES'S MATCHING VALIDATION)
        email: {
            type: String,
            required: true,
            unique: true,
            // email verification regex
            match: /.+\@.+\..+/,
        },
        // THOUGHTS MUST BE
        // array of `_id` values referencing the thought model
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Thought",
            },
        ],
        // FRIENDS MUST BE
        // array of `_id` values referencing the user model(self-reference)
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;

