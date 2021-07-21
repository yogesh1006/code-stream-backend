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

  // addToLikeVideo: async (req, res) => {
  //   try {
  //      const updatedData = await User.findOneAndUpdate({ username: req.body.username }, { $push: { likedVideos: req.body.id } },{new:true})
  //           res.json({
  //               status: 'success',
  //               result: "Added to the Liked Videos.",
  //               data:updatedData
  //           })
  //   } catch (error) {
  //      res.status(400).json({
  //       message: (error && error.message) || "Oops! Failed to Like Video.",
  //     });
  //   }
  // },
  addToLikeVideo: async (req, res) => {
    try {
      let user = await User.findById(req.user._id);
      let updatedLikedVideo = user.likedVideos.map(item=>item)
      if(!user.likedVideos.includes(req.body.id)){
        updatedLikedVideo.push(req.body.id)
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { likedVideos: updatedLikedVideo },
        { new: true }
      );
      res.json({
        status: "success",
        result: "Added to the Saved Videos.",
        data: updatedUser,
      });
    } catch (error) {
       res.status(400).json({
        message: (error && error.message) || "Oops! Failed to Like Video.",
      });
    }
  },

  
  removeLikedVideo: async (req, res) => {
    try {
           const user = await User.findById(req.user._id);
           const updatedLikedVideos =  user.likedVideos.filter((item)=>item!=req.body.id)
           const updatedUser = await User.findByIdAndUpdate(req.user._id,{likedVideos:updatedLikedVideos},{new:true})
            res.json({
                success: true,
                result: "Video removed from liked videos.",
                data:updatedUser
            })
    } catch (error) {
        res.status(400).json({
            message: (error && error.message) || 'Oops! Failed to remove video.'
        })
    }

  }
};
