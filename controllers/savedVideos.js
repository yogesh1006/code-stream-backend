const User = require("../models/user");
const Video = require("../models/video");

module.exports = {
  getAllSavedVideos: async (req, res) => {
    try {
      const { _id } = req.user;

      const savedVideos = await User.findById({ _id }).populate("savedVideos");

      res.json({
        status: "success",
        message: "Saved Videos.",
        data: savedVideos,
      });
    } catch (error) {
      console.log("error");
      res.status(400).json({
        message: (error && error.message) || "Oops! Failed to get SavedVideos.",
      });
    }
  },

  addToSavedVideo: async (req, res) => {
    try {
      let user = await User.findById(req.user._id);
      user = user.toJSON();
      if (!user.savedVideos.includes(req.body.id)) {
        user.savedVideos.push(req.body.id);
      }

      const updatedUser = User.findByIdAndUpdate(
        req.user._id,
        { savedVideos: user.savedVideos },
        { new: true }
      );
      res.json({
        status: "success",
        result: "Added to the Saved Videos.",
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        message: (error && error.message) || "Oops! Failed to save Video.",
      });
    }
  },

  // addToSavedVideo: async (req, res) => {
  //   try {
  //      const updatedData = await User.findOneAndUpdate({ username: req.body.username }, { $push: { savedVideos: req.body.id } },{new:true})
  //           res.json({
  //               status: 'success',
  //               result: "Added to the Saved Videos.",
  //               data:updatedData
  //           })
  //   } catch (error) {
  //      res.status(400).json({
  //       message: (error && error.message) || "Oops! Failed to save Video.",
  //     });
  //   }
  // },

  removeSavedVideo: async (req, res) => {
    try {
      const deletedData = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { savedVideos: req.body.id } },
        { new: true }
      );
      res.json({
        status: "success",
        result: "Video removed from saved videos.",
        data: deletedData,
      });
    } catch (error) {
      res.status(400).json({
        message:
          (error && error.message) || "Oops! Failed to remove saved video.",
      });
    }
  },
};
