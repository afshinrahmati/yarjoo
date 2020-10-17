const Validator = require('./Validator');
const { check, validationResult } = require("express-validator");


module.exports = new class authValidator extends Validator {
    Profile() {
        return [
            check('password', 'طول پسورد باید بیشتر از ۵ باشد').isLength({ max: 5 }),
        ]
    };




}