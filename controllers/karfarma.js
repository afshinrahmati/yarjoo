const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const allostan = require("../models/ostan");

module.exports = new class karfarmaControler extends Controllr {

    // **********karffarma#########
    async karfarmapaner(req, res, next) {
        try {
         
            let userkarfarma = await User.findById({ _id: req.session.user._id });

            if (userkarfarma.role == 'karjo') {
                return res.status(400).redirect("/dashboard/karjo");
            }

            if (userkarfarma.active == 2 && userkarfarma.id === req.session.user._id) {
                return res.render('panel/karfarma/karfarma.ejs', { user: userkarfarma })
            } else {
                return res.redirect('/undifine')
            }

        } catch (error) {

        }
    };

 // **********about work###########
 async aboutwork(req, res, next) {
    try {
     
       let ostan = await allostan.find({parent_id :0});
      
        let userkarfarma = await User.findById({ _id: req.session.user._id });

       if(!userkarfarma)
       {
           return res.redirect('/undifine');
       }
       return res.render('panel/karfarma/aboutwork.ejs',{user:userkarfarma,allostan:ostan})

    } catch (error) {

    }
};

// ****Iran*****
async OstanFind(req,res,next){
    try {
        let shara = await allostan.find({parent_id :req.params.id});
        return res.status(200).send({
            "City":shara
        })

    } catch (error) {
        
    }
}
}