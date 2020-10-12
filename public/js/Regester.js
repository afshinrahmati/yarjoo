$("#ul-hast").hide();

function toEnNumber(inputNumber2) {
    if (inputNumber2 == undefined) return '';
    var str = $.trim(inputNumber2.toString());
    if (str == "") return "";
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
}

function startTimer(duration, display, callback) {
    var timer = duration,
        minutes, seconds;

    var myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        minutes = toEnNumber(minutes);
        seconds = toEnNumber(seconds);

        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;

            // clear the interal
            clearInterval(myInterval);

            // use the callback
            if (callback) {
                callback();
            }
        }
    }, 1000);
}

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
    
    
    },
    messages: {
    mobile: {
        required: "فیلد موبایل الزامی است",
        number: "فیلد موبایل نامعتبر است",
        minlength: "فیلد موبایل نباید کمتر از 11 کاراکتر باشد",
        maxlength: "فیلد موبایل نباید بیشتر از 11 کاراکتر باشد",
    }
    
    },
    
    // errorClass: "my-error-class",
    // validClass: "my-valid-class",
    submitHandler: function (form) {
    
    
    $.ajax({
        url: form.action,
        method: form.method,
        data: $(form).serialize(),
        success: function (response) {
    
    
    
        if(response.status == 'dashboard')
        {
        console.log(1);
        console.log(response);
        window.location.href = response.Url;
        }
            // console.log($(form).serialize());
            if (response.status == 'success') {
                console.log(1);
                $("#verify_form").show();
                
                $('#form_get_mobile').hide();
            $("#Timeis").innerHTML =response.TimenoFinish
                // $('#message-error-code').html(response.message);
                $('.timer_send_code').html(' زمان ارسال کد &nbsp;' + '<span id="time">۰۳:۰۰</span>');
    
                var time = 60 * 3,
                    display = document.querySelector('#time');
                startTimer(time, display, function () {
                    $('.timer_send_code').text(' ');
                    $('#message-error-code').html('زمان تایید کد به پایان رسید بر روی دوباره ارسال کلیک کنید');
                });
    
                $('#mobile_verify').val(response.moblie);
                $('#mobile_old').val(response.old);
                $('#mobile_repeat_verify').val(response.moblie);
    
            } else if (response.status == 'sendCode') {
    
               
                $("#verify_form").show();
                $('#form_get_mobile').hide();
                $('#message-error-code').html(response.message);
    
                $('#mobile_verify').val(response.mobile);
                $('#mobile_repeat_verify').val(response.mobile);
    
                var time = response.time,
                    display = document.querySelector('#time');
                startTimer(time, display, function () {
                    $('.timer_send_code').text(' ');
                    $('#message-error-code').html('زمان تایید کد به پایان رسید بر روی دوباره ارسال کلیک کنید');
    
                });
    
            } else {
                $('#message-error').html(response.message);
            }
           
        }
        ,
        error: function (error) {     
            $("#ul-hast").show();
            document.getElementById("hast").innerHTML = error.responseText;
            
    
        }
    
    });
    }
    });
    
    

    $("#verify_form_code").validate({
        ignore: [], //Fixes your name issue
        rules: {
        code: {
            required: true,
            digits: 5,
            number: true
        }
        
        
        },
        messages: {
        mobile: {
            required: "فیلد code الزامی است",
            number: "فیلد code نامعتبر است",
            minlength: "فیلد code نباید کمتر از 11 کاراکتر باشد",
            maxlength: "فیلد code نباید بیشتر از 11 کاراکتر باشد",
        }
        
        },
        
        // errorClass: "my-error-class",
        // validClass: "my-valid-class",
        submitHandler: function (form) {
        
        
        $.ajax({
            url: form.action,
            method: form.method,
            data: $(form).serialize(),
            success: function (response) {
                if(response.status == 'nocode')
                {
              document.getElementById("codeis").innerHTML = "لطفا کد را وارد کنید"
                }
        
        
            if(response.status == 'dashboard')
            {
            console.log(1);
            console.log(response);
            window.location.href = response.Url;
            }
                // console.log($(form).serialize());
             
               
            }
            ,
            error: function (error) {     
                console.log(error);
                // $("#ul-hast").show();
                // document.getElementById("hast").innerHTML = error.responseText;
                
        
            }
        
        });
        }
        });
        
        
            