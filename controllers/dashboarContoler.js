const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');
const { body, validationResult } = require('express-validator');
const { use } = require('../Routers/dashboard');

module.exports = new class DashboardController extends Controllr {

    // *******Profile *****go to render=> profile +karjo =>ridirect*****
    async Profile(req, res, next) {

        if (req.session.userkarjo) {
            if (req.session.userkarjo.active === 2 && req.session.userkarjo.role === "karjo") {
                return res.redirect(`/dashboard/karjo`)
            }
            if (req.session.userkarjo.active === 2 && req.session.userkarjo.role === "karfarma") {
                return res.redirect(`/dashboard/karfarma`)
            }
        }
        if (req.session.user.active === 1 || !req.session.userkarjo) {
            return res.render('panel/Profile.ejs', { errorsValidator: req.flash('errorsValidator'), valelastname: req.flash("valuelastname"), valename: req.flash("valuename"), valeemail: req.flash("valueEmail"), number: req.session.user.moblie, DonTmach: req.flash("DonTmach"), Empty: req.flash("erroEmpth") })
        }
    };

    // **************Sing Up in profile **********
    async ProfilePost(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let MyErrors = errors.array().map(err => err.msg);
            console.log(MyErrors);
            req.flash("errorsValidator", MyErrors);
            return res.redirect("/dashboard");
        };
        //*empty eeror
        //*password dont mach
        if (req.body.password != req.body.aginpassword) {
            req.flash("valueEmail", req.body.email);
            req.flash("valuename", req.body.name);
            req.flash("valuelastname", req.body.lastname);
            req.flash("DonTmach", "متاسفانه  پسورد باهم هماهنگی ندارد");
            return res.redirect("/dashboard");
        }

        let data = {
            password: req.body.password,
            active: 2,
        }

        // *karjo
        if (req.body.exampleRadios == "karjo") {
            if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password) {
                req.flash("erroEmpth", "لطفا فرم را با دقت بیشتری پرنماید")
                return res.redirect("/dashboard");
            }
            data.role = req.body.exampleRadios,
                data.name = req.body.name,
                data.lastname = req.body.lastname,
                data.email = req.body.email

        }

        // *karfarma
        if (req.body.exampleRadios == "karfarma") {
            if (!req.body.CompanyName || !req.body.password) {
                req.flash("erroEmpth", "لطفا فرم را با دقت بیشتری پرنماید")
                return res.redirect("/dashboard");
            }
            data.role = req.body.exampleRadios,
                data.CompanyName = req.body.CompanyName
        }

        // *admin
        if (req.body.exampleRadios == "admin") {
            data.role = req.body.exampleRadios
        }
        if (req.file) {
            data.img = req.file.path.replace(/\\/g, '/').substring(6);
        }
        await User.findOneAndUpdate({ _id: req.session.user._id }, { $set: data });
        let userkarjo = await User.findById({ _id: req.session.user._id });

        console.log(userkarjo);
        req.session.userkarjo = userkarjo;

        if (userkarjo.role == 'karjo') {
            return res.redirect(`/dashboard/karjo`)
        }
        if (userkarjo.role == 'karfarma') {
            return res.redirect(`/dashboard/karfarma`)
        }
    };
    // panel render karjo
    async karjopanel(req, res, next) {
        try {
            let userkarjo = await User.findById({ _id: req.session.user._id });

            if (userkarjo.role == 'karfarma') {
                return res.status(400).redirect('/dashboard/karfarma');
            }
            if (userkarjo.active == 2 && userkarjo.id === req.session.user._id) {
                return res.render('panel/karjo.ejs', { user: userkarjo });
            } else {
                return res.redirect('/undifine')
            }

        } catch (error) {

        }
    };



}