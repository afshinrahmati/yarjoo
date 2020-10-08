const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const { body, validationResult } = require('express-validator')
module.exports = new class DashboardController extends Controllr {
    //Get Regester
    async RegesterGet(req, res, next) {
            try {

                return res.render('auth/Regester.ejs', { error: req.flash("errorsValidator"), Threris: req.flash("Threis") })
            } catch (error) {

            }
        }
        //Post Regester
    async PostRegestedr(req, res, next) {
        try {

            const us = await User.findOne({
                moblie: req.body.mobile
            });
            if (us) {
                req.flash("Threis", "شما قبلا ثبت نام کرده اید.")
                return res.redirect("/user/Regester");
            }


            //mmone now this min +3
            let dateshow = momment().add(3, 'minutes');

            let Code = Math.floor(10000 + Math.random() * 90000);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let MyErrors = errors.array().map(err => err.msg);
                req.flash("errorsValidator", MyErrors);
                return res.redirect("/user/Regester");
            };

            const NewUser = new User({
                moblie: req.body.mobile,
                active: 1
            });

            await NewUser.save();

            return res.redirect("/user/Regester");
        } catch (e) {

        }
    }
}