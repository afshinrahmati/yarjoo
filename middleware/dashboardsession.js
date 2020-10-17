module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/user/Regester")
    } else {
        return next();
    }
}