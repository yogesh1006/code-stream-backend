const User = require('../models/user');
const Video = require('../models/video');


module.exports = {

    createPlaylist: async (req, res) => {
       const { username, playlistName, videoId } = req.body;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { playlist: { playlistName: playlistName, videos: videoId } } });
            const { playlist } = await User.findOne({ username: username }).populate({ path: 'playlist', populate: { path: 'videos', populate: 'Video' } });
            res.json({
                success: true,
                result: playlist
            })
        }catch(e){
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to create new playlist.'
            })
        }
       
    },
  

    addToPlaylist : async (req, res)=> {
        const { username, videoId } = req.body;
        const { id } = req.params;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username, "playlist._id": id }, { $push: { "playlist.$.videos": videoId } })
            res.json({
                status: 'success',
                result: "Playlist updated successfully."
            })
        }catch(e){
             res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to update playlist.'
            })
        }

    },
    
     getUserPlaylists : async (req, res) => {
        const { _id } = req.user
        try {
            const user = await User.findById({ _id }).populate({ path: 'playlist', populate: { path: 'videos', populate: 'Video' } })
            res.json({
                status: "success",
                message: "Playlist list.",
                data:user.playlist,
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get Playlist.'
            })
        }
    
    },


     removeFromPlaylist: async (req,res)=> {
        const { username, videoId } = req.body;
        const { id } = req.params;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username, "playlist._id": id }, { $pull: { "playlist.$.videos": videoId } })
            res.json({
                status: 'success',
                result: "Playlist updated."
            })
        }catch(e){
             res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to update playlist.'
            })
        }
     },

     deletePlaylist: async (req, res) => {
        const {  playlistName } = req.body;
        try{
            const user = await User.findById(req.user._id);
            let playlist=user.playlist.filter(play=>play.playlistName!=playlistName)
            const updateUser = await User.findByIdAndUpdate(req.user._id,{playlist:playlist},{new : true})
            res.json({
                status: 'success',
                result: "Playlist deleted successfully."
            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to delete playlist.'
            })
         }
     }
}