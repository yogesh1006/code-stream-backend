var mongoose= require('mongoose');
const { encrypt }= require('../utils/encrypt');
const {Schema} = mongoose

const userSchema=new mongoose.Schema({
    username:{
      type:String,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     likedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    savedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    playlist: [
        {
            playlistName: { type: String },
            videos: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Video'
                }
            ]
        }
    ],
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    var userSchema = this
    userSchema.password= encrypt(userSchema.password)
    userSchema.created_at = userSchema.updated_at = Date.now
    next()
})

userSchema.pre('update', function (next) {
    this.update({}, {
        $set: {
            updated_at: Date.now
        }
    })
    next()
})


const User = mongoose.model("User", userSchema)

module.exports= User;