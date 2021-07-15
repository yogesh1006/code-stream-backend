const User = require("../models/user");
const Video = require("../models/video");

module.exports = {
  getAllLikedVideos: async (req, res) => {
    try {
      const { _id } = req.user;

      const likedVideos = await User.findOne({ _id }).populate("likedVideos");
      res.json({
        status : 'success',
        message : 'Likedvideos list.',
        data: likedVideos,
      });
    } catch (error) {
      res.status(400).json({
        message: (error && error.message) || "Oops! Failed to get LikedVideos.",
      });
    }
  },

  addToLikeVideo: async (req, res) => {
    try {
       const updatedData = await User.findOneAndUpdate({ username: req.body.username }, { $push: { likedVideos: req.body.id } },{new:true})
            res.json({
                status: 'success',
                result: "Added to the Liked Videos.",
                data:updatedData
            })
    } catch (error) {
       res.status(400).json({
        message: (error && error.message) || "Oops! Failed to Like Video.",
      });
    }
  },

  
  removeLikedVideo: async (req, res) => {
    try {
       const deletedData = await User.findOneAndUpdate({ username: req.body.username }, { $pull: { likedVideos: req.body.id } },{new:true});
            res.json({
                success: true,
                result: "Video removed from liked videos.",
                data:deletedData
            })
    } catch (error) {
        res.status(400).json({
            message: (error && error.message) || 'Oops! Failed to remove video.'
        })
    }

  }
};
