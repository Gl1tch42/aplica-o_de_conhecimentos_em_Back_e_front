const Post = require('./../models/post');

const postCtrl = {
    /**
     * Controller de registro de posts basica
     * @param req de requisissao
     * @param res de resposta
     */

    creatPost: async (req, res) => {
        try {
            const post = await new Post(req.body);

            post.save((err, post) => {
                if(err) return res.status(400).json({err:'the registration so post is not fineshed'});
            });

            res.json({post});

        }catch (err) {return res.status(400).send({error: 'badrequest, it is not possible complete action post'}); }
    },

    /**
     * controller de get basica
     * @param req de requisissao
     * @param res de resposta
     */
    listPost: async (req, res) => {

        try{
            const posts = await Post.find();
            res.json({posts});

        }catch (err) {return res.status(400).send({error: 'bad request, it is not possible complete action get'}); }
        
    },
    /**
     * controller de put basica
     * @param req de requisissao
     * @param res de resposta
     */
    updatePost: async (req, res) => {

        try {
            const {body} = req.body;
            await Post.findOneAndUpdate({_id: req.params.id},{body});

            res.json({msg:"update in post is complete"});
        }catch (err) {return res.status(400).send({error: 'bad request, it is not possible complete action update'}); }
    },
    /**
     * controller de delete basica
     * @param req de requisissao
     * @param res de resposta
     */
    deletePosts: async (req, res) => {
        try{
            await Post.findByIdAndDelete(req.params.id);
            res.json({msg:"the post are delete"})
        }catch (err) {return res.status(400).send({error: 'bad request, it is not possible complete action delete'}); }
    }
}

module.exports = postCtrl;