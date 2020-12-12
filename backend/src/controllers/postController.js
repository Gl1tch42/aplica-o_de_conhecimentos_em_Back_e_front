const Post = require('./../models/post');
const User = require('./../models/user');

const postCtrl = {
    /**
     * Controller de registro de posts basica
     */
    creatPost: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const post = await new Post(req.body);

            post.author.id = user._id;
            post.author.name = user.name;

            post.save((err, post) => {
                if(err) {
                    return res.status(400).json({
                        err:'the registration so post is not fineshed'
                    });
                }
            });

            res.json({post});

        } catch (err) {
            return res.status(400).json({
                error: 'badrequest, it is not possible complete action post'
            });
        }
    },



    /*
     * controller de get basica
     */
    listPost: async (req, res) => {

        try{
            const posts = await Post.find();
            res.json({posts});

        } catch (err) {
            return res.status(400).json(
                {error: 'bad request, it is not possible complete action get'
            });
        }  
    },



    /*
     * controller de put basica
     */
    updatePost: async (req, res) => {

        try {
            const {body} = req.body;
            await Post.findOneAndUpdate({_id: req.params.id},{body});

            res.json({msg:"update in post is complete"});
        }catch (err) {
            return res.status(400).json({
                error: 'bad request, it is not possible complete action update'
            });
        }
    },



    /*
     * controller de delete basica
     */
    deletePosts: async (req, res) => {
        try{
            await Post.findByIdAndDelete(req.params.id);
            res.json({msg:"the post are delete"});

        }catch (err) {
            return res.status(400).json({
                error: 'bad request, it is not possible complete action delete'
            });
        }
    },

    /**
     * comentarios
     */
    createComent: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const post = await Post.findByIdAndUpdate({_id: req.params.id},{comments});



        }catch (err) {
            return res.status(400).json({
                error: 'bad request, it is not possible complete action comments'
            });
        }
        

    }

    
}

module.exports = postCtrl;