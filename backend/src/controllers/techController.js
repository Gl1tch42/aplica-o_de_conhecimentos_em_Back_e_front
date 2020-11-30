const Tech = require('./../models/categoryTech');

const techController = {

    /*
     * controller para pegar as categorias tech
     */
    techList: async (req, res) => {
        try {

            const tech = await Tech.find();
            res.json({tech});

        } catch (err){
            return res.status(400).json(
                {err:'its not possible made the method get in tech'
            })
        }
    },


    /*
     * controller para a criaçao de uma categoria
     */
    createTech: async (req, res) => {
        try {
            const tech = await new Tech(req.body);

            tech.save((err, tech) => {
                if(err){
                    return res.status(400).json({
                        err:'it not possible create a category tech'
                    });
                }
            });

            res.json({tech});

        } catch (err) {
            return res.status(400).json({
                err:'its not possible made the method post in tech'
            })
        }
    },




    /*
    *controller de edição de categoria
    */
   updateTech: async (req, res ) => {
       try {

           const {name} = req.body;
           await Tech.findByIdAndUpdate({_id: req.params.id},{name});

           res.json({msg:"update in tech is complete"});

       } catch (err) {
           return res.status(400).json({
            err:'its not possible made the method put in tech'
           });
        }
    },




   /**
    * controller para deletar uma tech
    */
   deleteTech: async (req, res) => {
       try {

           await Tech.findByIdAndRemove({_id: req.params.id});

           res.json({msg:'the category are deleted'});

       } catch (err) {
           return res.status(400).json({
               err:'its not possible made the method delete in tech'
           });
        }
    }


}

module.exports = techController;