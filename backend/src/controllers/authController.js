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

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*1000 //7d
            });

            return res.json({accessToken});
        } catch (err) {
            return res.status(500).json({msg: "Try register again"})
        }


    }
}