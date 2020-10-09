const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const { body, validationResult } = require('express-validator')
module.exports = new class DashboardController extends Controllr {
    //Get Regester
    async RegesterGet(req, res, next) {
            try {
                let a = await User.find({ moblie: req.flash("me") });



                if (a.length === 1) {
                    let me_code = a[0].expiencode;

                    let x1 = momment().add(3, 'minutes');
                    var x = setInterval(function() {

                        var distance = me_code - momment();
                        // console.log(typeof(distance));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        let o = minutes + ":" + seconds;
                        console.log(o);

                        if (distance < 0) {
                            clearInterval(x);
                            return res.redirect('/user/Regester')
                        }

                    }, 1000)


                    return res.render('auth/add-code.ejs')
                }


                //if mobile bod
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
                active: 1,
                expiencode: momment().add(3, 'minutes')


            });

            await NewUser.save();

            req.flash("me", req.body.mobile)
            return res.redirect("/user/Regester");
        } catch (e) {

        }
    }
}