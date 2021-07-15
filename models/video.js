var mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  id:{
    type:String
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  channelName: {
    type: String,
  },
  thumbnailImgUrl: {
    type: String,
  },
  channelImageUrl: {
    type: String,
  },
  published_date: {
    type: String,
  },
  likes: {
    type: Number,
  }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
