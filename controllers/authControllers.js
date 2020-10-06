const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const {body,validationResult} = require('express-validator')
module.exports = new class DashboardController extends Controllr {
    //Get Regester
    async RegesterGet(req, res, next) {
            try {
                var a = Math.floor(10000 + Math.random() * 90000);
               console.log(a);
                return res.render('auth/Regester.ejs',{error:req.flash("errorsValidator")})
            } catch (error) {

            }
        }
        //Post Regester
    async PostRegestedr(req, res, next) {
        try {
            let dateshow = momment().add(3, 'minutes');
          
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            let MyErrors = errors.array().map(err=>err.msg);
            req.flash("errorsValidator",MyErrors);
            return res.redirect("/user/Regester");
        };
 

            const NewUser = new User({
                moblie: req.body.mobile,
                
            })
            await NewUser.save();
           
        } catch (e) {

        }
    }
}