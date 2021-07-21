const express= require('express');
const router= express.Router();
const VideoController= require('../controllers/video')
const UserController= require('../controllers/user')
const PlaylistController= require('../controllers/playlist')
const isUserAuthenticated = require('../middleware/isUserAuthenticated')
const LikedVideosController = require('../controllers/likedVideos')
const SavedVideoController = require('../controllers/savedVideos')

//user apis
router.post('/auth/register',UserController.signup)
router.post('/auth/login',UserController.login)


//middleware
router.all('/api/*',isUserAuthenticated)
router.get('/api/get_user_data',UserController.getUserData)

//video apis
router.get('/auth/get_all_videos',VideoController.getAllVideos)
router.post('/auth/:id',VideoController.getVideo)

//Likedvideos routes
router.get('/api/get_all_liked_videos',LikedVideosController.getAllLikedVideos)
router.post('/api/add_to_liked_videos',LikedVideosController.addToLikeVideo)
router.post('/api/remove_liked_video',LikedVideosController.removeLikedVideo)

//Saved video routes
router.get('/api/get_all_saved_videos',SavedVideoController.getAllSavedVideos)
router.post('/api/add_to_save_videos',SavedVideoController.addToSavedVideo)
router.post('/api/remove_saved_video',SavedVideoController.removeSavedVideo)

//Playlist routes
router.post('/api/create_playlist',PlaylistController.createPlaylist)
router.post('/api/add_to_playlist/:id',PlaylistController.addToPlaylist)
router.get('/api/get_user_playlist',PlaylistController.getUserPlaylists)
router.post('/api/remove_from_playlist/:id',PlaylistController.removeFromPlaylist)
router.post('/api/delete_playlist',PlaylistController.deletePlaylist)

module.exports=router
