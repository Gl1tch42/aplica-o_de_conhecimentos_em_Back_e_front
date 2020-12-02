const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./../models/user');



const creatRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'7d'
    })
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: '11m'
    })
}


const userCtrl = {

    /**
     * regitro do usuario
     */
    register: async(req, res) => {
        try {
            const {name, email, password} = req.body;

            const user = await User.findOne({email});
            if (user) {
                return res.status(400).json({
                    msg:'the email already exist'
                });
            }

            if (password.lenth < 6) return res.status(400).json({msg:'password is at least 6 characters'});


            /**
             * cripitografia da senha
             */
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: passwordHash
            });

            await newUser.save();

            /**
             * autentificação de token usando jsonwebtoken
             */
            const refreshToken = creatRefreshToken({id: newUser._id});
            const accessToken = createAccessToken({id: newUser._id});

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*1000 //7d
            });

            return res.json({accessToken});
        } catch (err) {
            return res.status(500).json({msg: "Try register again"});
        }
    },



    /**
     * login de usuario
     */
    login: async (req,res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) return res.status(400).json({msg:'user does not exist'});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({msg:'incorret password'});

            const accessToken = createAccessToken({id: user._id});
            const refreshToken = creatRefreshToken({id: user._id});

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path:'/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            });


            return res.json({accessToken});

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },




    /**
     * controller logout
     */
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {path:'/user/refresh_token'});
            return res.json({msg:'logged out'});

        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },




    /**
     * refresh token
     */
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"});

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({msg: "Please Login or Register"});

                const accessToken = createAccessToken({id: user.id});

                res.json({user, accessToken});
            });

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },



    /**
     * pegar usuarios
     */
    getUser: async(req, res) =>{
        try {
            const user = await User.find().select('-password')
            if(!user) return res.status(500).json({msg:"User does not exist"})
    
            res.json(user)

        } catch (error) {
            return res.status(500).json({msg:err.message})
        }
    },





    /**
     * pegar usuarios id
     */
    getUserById: async(req, res) =>{
        try {
            const user = await User.findById({user: req.params.id}).select('-password');
            if(!user) return res.status(500).json({msg:"User does not exist"})
    
            res.json(user)

        } catch (error) {
            return res.status(500).json({msg:err.message})
        }
    },



}

module.exports = userCtrl;