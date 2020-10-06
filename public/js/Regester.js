
jQuery.validator.addMethod("phonenu", function (value, element) {
    if (/(09)[0-9]{9}/.test(value)) {
        return true;
    } else {
        return false;
    }

}, "فیلد موبایل نامعتبر است");


$("#form_get_mobile").validate({
    ignore: [], //Fixes your name issue
    rules: {
        mobile: {
            required: true,
            digits: 11,
            phonenu: true,
            number: true
        }
        // , password: {
        //     required: true,
        //     minlength: 6,
        // }, password_confirmation: {
        //     required: true,
        //     minlength: 6,
        // },

    },
    messages: {
        mobile: {
            required: "فیلد موبایل الزامی است",
            number: "فیلد موبایل نامعتبر است",
            minlength: "فیلد موبایل نباید کمتر از 11 کاراکتر باشد",
            maxlength: "فیلد موبایل نباید بیشتر از 11 کاراکتر باشد",
        }
        // , password: {
        //     required: "فیلد پسورد الزامی است",
        //     minlength: "فیلد پسورد نباید کمتر از 6 کاراکتر باشد",
        // },
        // password_confirmation: {
        //     required: "فیلد تاییدیه ی رمز عبور الزامی است",
        //     minlength: "فیلد تاییدیه ی رمز عبور نباید کمتر از 6 کاراکتر باشد",
        // },
    },
    errorClass: "my-error-class",
    validClass: "my-valid-class",

  
});