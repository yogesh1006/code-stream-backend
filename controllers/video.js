const Video= require('../models/video')


module.exports = {

    getAllVideos: async (req,res)=>{
        try {
            const videos= await Video.find()
            res.json({
                status:'success',
                message:'video list',
                data:videos

            })
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get videos.'
            })
        }
    },

    

    getVideo: async (req,res)=>{
        try {
          let {id} = req.params
          let video = await Video.findOne({id:id}) 
          res.json({
            status: 'success',
            message: 'video detail.',
            data: video
        }) 
        } catch (error) {
            res.status(400).json({
                message: (error && error.message) || 'Oops! Failed to get video.'
            })
        }
    }

}


