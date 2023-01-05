const { Schema, model, Types } = require('mongoose');
// import momnet to format timestamp
const moment = require('moment');


// thought schema
const thoughtSchema = new Schema (
    {
        // THOUGHT TEXT MUST BE STRING, REQUIRED, MIN=1, MAX=280
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // CREATED AT TIMESTAMP DATE, SET DEFAULT VALUE TO CURRENT TIMESTAMP,
        // USE A GETTER METHOD TO FORMAT THE TIMESTAMP
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        // USERNAME MUST BE STRING, REQUIRED
        username: {
            type: String,
            required: true,
        },
        // Array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)
// create a virtual called reactionCount that retrieves 
// the length of the thought's reactions array field query
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;



