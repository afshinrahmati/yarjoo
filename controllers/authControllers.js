const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const { body, validationResult } = require('express-validator')
module.exports = new class DashboardController extends Controllr {

    // *************REgesterGet***************
    async RegesterGet(req, res, next) {
        try {

            return res.render('auth/Regester.ejs', { error: req.flash("errorsValidator") })
        } catch (error) {}
    }

    // ************PostRegestedr****************
    async PostRegestedr(req, res, next) {
        try {
            //Sms code  random
            let Code = Math.floor(10000 + Math.random() * 90000);
            //ValidatorError 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let MyErrors = errors.array().map(err => err.msg);
                req.flash("errorsValidator", MyErrors);
                return res.send("/user/Regester");
            };
            // your Reget or no and save
            const us = await User.findOne({
                moblie: req.body.mobile
            });

            if (us) {
                let FinisgTime = -1;
                if (FinisgTime < 0) {
                    if (us.active == 0 || us.active == 1) {
                        let data = {
                            expiencode: momment().add(3, 'minutes'),
                            code: Math.floor(10000 + Math.random() * 90000)
                        }
                        await User.findOneAndUpdate({ _id: us.id }, { $set: data })
                        return res.status(200).send({
                            "status": "success",
                            "user": us,
                            "moblie": us.moblie
                        })
                    } if (us.active > 1) {
                        return res.status(400).send("شما قبلا  ثبت نام کرده اید.");
                    }
                    
                } else {
                    return res.status(200).send({
                        "status": "success",
                        "user": us,
                        "moblie": us.moblie,
                        "TimenoFinish": "واسایا ۳ "
                    })
                }
            } else {
                const NewUser = new User({
                    moblie: req.body.mobile,
                    active: 0,
                    expiencode: momment().add(3, 'minutes'),
                    code: Code,

                });

                await NewUser.save();
                return res.status(201).send({
                    "status": "success",
                    "user": NewUser,
                    "moblie": NewUser.moblie
                });
            }
        } catch (e) {

        }
    }

    // ************Postverify****************
    async Postverify(req, res, next) {
        try {
            let UserCode = await User.findOne({ moblie: req.body.moblie });

            if (UserCode.active == 0 || UserCode.active == 1) {
                
                if (req.body.code == UserCode.code) {
                    let data = {
                        active: 1,
                        OKy: true,
                        // role: "admin"
                    }
                    await User.findOneAndUpdate({ _id: UserCode.id }, { $set: data });
                    let user = await User.findOne({ moblie: UserCode.moblie });
                    req.session.user = user

                    return res.status(200).send({
                        "status": "dashboard",
                        "Url": '/dashboard',
                        "user": user,
                        "moblie": user.moblie
                    })

                } else {
                    let user = await User.findOne({ moblie: UserCode.moblie });
                    return res.status(200).send({
                        "status": "nocode",
                        "user": user,
                        "moblie": user.moblie
                    })
                }
            }
        } catch (error) {

        }
    }

}