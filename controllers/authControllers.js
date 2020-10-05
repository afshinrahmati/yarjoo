const Controllr = require('../controllers/Controllr');
const Regester = require('../models/RegesterModels');
module.exports = new class DashboardController extends Controllr {
    //Get Regester
    async RegesterGet(req, res, next) {
            try {
                return res.render('auth/Regester.ejs')
            } catch (error) {

            }
        }
        //Post Regester
    async PostRegestedr(req, res, next) {
        try {
            const NewUser = new Regester({
                number: req.body.number
            })
            await NewUser.save();
            res.redirect('/user/Regester')
        } catch (e) {

        }
    }
}