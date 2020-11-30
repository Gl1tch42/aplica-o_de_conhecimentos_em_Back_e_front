const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 5569;
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/API_BASIC',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},err => {
        if (err) throw err
        console.log('dataBase are connect!');
});
/**
 * rotas principais
 */
const postController = require('./routes/postRoutes');

app.use('/post', postController);


app.listen(port);