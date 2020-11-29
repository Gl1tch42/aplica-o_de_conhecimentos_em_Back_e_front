const Post = require('./../models/post');

/**
 * Controller de registro de posts
 */

exports.blogPost = async (req, res) => {
    try {
        const post = await new Post(req.body);

        post.save((err, post) => {
            if(err) return res.status(400).json({er:'the registration so post is not fineshed'});
        });

        res.json({post});

    }catch (err) {return res.status(400).send({error: 'badrequest, it is not possible complete that action'}); }
}