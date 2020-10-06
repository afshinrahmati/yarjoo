const  Validator=require('./Validator');
const { check,validationResult } = require("express-validator");


module.exports=new class authValidator extends Validator{
    Regester()
    {
        
        return[
            // check('email','فرمت ایمیل صحیح نمیباش').isEmail(),
            // check('name','فایل نام خالی میباشد').notEmpty(),
            check('mobile','طول پسورد باید بیشتر از ۵ باشد').isLength({ min: 11 })    
        ]
    };



    
}