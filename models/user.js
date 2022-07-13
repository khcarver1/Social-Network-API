const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique
      //match stuff here
    },
    thoughts: {
      type: Array
    },
    friends: {
      type: Array
    }
  }
);

const FriendCountSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: true
    },
    commentBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

FriendCountSchema.virtual('username').get(function() {
  return this.username.length;
});

const User = model('user', UserSchema);

module.exports = User;
