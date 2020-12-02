const User = require('./../models/user');
const Post = require('./../models/post');


const authMe = async (req, res, next) => {
    try {
        const post = await Post.findById({_id:req.params.id});
        const user = await User.findOne({_id: req.user.id});

        if (user._id != post.author.id) { return res.status(500).json({msg:"you are not the author"})}

        next();

    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}

module.exports = authMe;