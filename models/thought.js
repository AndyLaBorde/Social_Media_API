const { mongoose } = require('mongoose');
// import momnet to format timestamp
const moment = require('moment');

// reaction schema
const reactionSchema = new mongoose.Schema (
    {
        // reactionId , mongoose ObjectId data type, default value is set to new ObjectId
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId
        },
        //reactionBody, STRING REQUIRED MAX=280
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // username STRING REQUIRED
        username: {
            type: String,
            required: true,
        },
        // createdAt DATE, set default value to the current timestamp, 
        // use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM Do, YYYY [at] hh:mm a")
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


// thought schema
const thoughtSchema = new mongoose.Schema (
    {
        // THOUGHT TEXT MUST BE STRING, REQUIRED, MIN=1, MAX=280
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // CREATED AT TIMESTAMP DATE, SET DEFAULT VALUE TO CURRENT TIMESTAMP,
        // USE A GETTER METHOD & MOMENT%TO FORMAT THE TIMESTAMP
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM, Do, YYYY [at] hh:mm a"),
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
);

// create a virtual called reactionCount that retrieves 
// the length of the thought's reactions array field query
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

//create the thought model

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;



