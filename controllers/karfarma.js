const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');


module.exports = new class karfarmaControler extends Controllr {

    // **********karffarma
    async karfarmapaner(req, res, next) {
        try {
            console.log(1);
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


}