
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function cRange(startChar, endChar) {
    return String.fromCharCode(...range(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)))
}

var cPoints ='\u0020'+ cRange('\u2000' , '\u200f'); + cRange('\u2028' , '\u202f');

var cPointsFarsi = cRange('\u0621' , '\u0628') + cRange('\u062A' , '\u063A') + cRange('\u0641' , '\u0642') + cRange('\u0644' , '\u0648') + cRange('\u064E' , '\u0651') + '\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC';
var cPointsArabic = '\u0629\u0643\u0649\u064A\u064B\u064D\u06D5';

let validChar = cPoints + cPointsFarsi + cPointsArabic;

function persianL(persianText) {
    if(!new RegExp("[^\s" + validChar + "]").test(persianText)){
        // valid
        return true;
    }
    return false;
}

function englishL(englishText) {
    return !( new RegExp("[^\sa-zA-Z]").test(englishText));
}

function ssd_check(code){
    var s=0;
    for(var i=0;i<9;i++)
        s+=parseInt(code.substr(i,1))*(10-i);
    s=s%11;
    var c = parseInt(code)%10;
    return (s<2 && c==s) || (s>=2 && c==(11-s));
}

function fname_check(){
    let first_name = document.getElementById("fname").value;
    return first_name.length >= 3 && first_name.length <= 50 && persianL(first_name);
}

function lname_check(){
    let last_name = document.getElementById("lname").value;
    return last_name.length >= 3 && last_name.length <= 100 && persianL(last_name);
}

function fulname_check(){
    let full_name = document.getElementById("fulname").value;
    return full_name.length >= 3 && full_name.length <= 150 && englishL(full_name.replaceAll(' ' , ''));
}

function ssd_valid(){
    let ssd = document.getElementById("ssd").value.split("-").join("");
    return ssd.length == 10 &&
        !( new RegExp("[^\s0-9]").test(ssd)) &&
        ssd_check(ssd)
        ;
}

function email_check(){
    let email = document.getElementById("email").value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function mobile_check(){
    let mobile = document.getElementById("phonenumber").value;
    return mobile.length == 9 &&
        !( new RegExp("[^\s0-9]").test(mobile));
}

function password_check(){
    let password = document.getElementById("password").value;
    let pattern = /^[a-zA-Z0-9=*$#!+\-]{8,24}$/
    return pattern.test(password);
}

function password_confirm_check(){
    let confirm = document.getElementById("password_confirm").value;
    let password = document.getElementById("password").value;
    return password == confirm && password_check();
}

function address_check(){
    return document.getElementById("address").value.length <= 250;
}

function birth_check(){
    let month = document.getElementById("birthmonth").value;
    var maxDay = 31;
    if(!(month == null || month == '')){
        if(parseInt(month) > 6){
            maxDay = 30;
        }
    }
    let day = parseInt(document.getElementById("birthday").value);
    return day > 0 && day <= maxDay;
}

function birthmonth_check(){
    let month = parseInt(document.getElementById("birthmonth").value);
    return month > 0 && month <= 12;
}

function birthyear_check(){
    let year = parseInt(document.getElementById("birthyear").value);
    return year <= 1390 && year >= 1310;
}

function is_marital_status_valid(){
    let marital = document.getElementsByName("marital");
    if (!(marital[0].checked || marital[1].checked)) {
        return false;
    }
    return true;
}

function validate(){
    error_message = "";
    first_name = document.getElementById("fname");
    if(fname_check()){
        first_name.classList.add("valid");
        first_name.classList.remove("invalid");
    }else{
        first_name.classList.add("invalid");
        first_name.classList.remove("valid");
        error_message += "نام  باید فارسی و بین ۳ تا ۳۰ حرف باشد\n";
    }

    last_name = document.getElementById("lname");
    if(lname_check()){
        last_name.classList.add("valid");
        last_name.classList.remove("invalid");
    }else{
        last_name.classList.add("invalid");
        last_name.classList.remove("valid");
        error_message += "نام خانوادگی باید فارسی بین ۳ تا ۱۰۰ حرف باشد\n";
    }

    full_name = document.getElementById("fulname");
    if(fulname_check()){
        full_name.classList.add("valid");
        full_name.classList.remove("invalid");
    }else {
        full_name.classList.add("invalid");
        full_name.classList.remove("valid");
        error_message += "نام کامل انگلیسی باید بین ۳ تا ۱۵۰ حرف باشد\n";
    }

    birth_day = document.getElementById("birthday");
    if(birth_check()){
        birth_day.classList.add("valid");
        birth_day.classList.remove("invalid");
    }else{
        birth_day.classList.add("invalid");
        birth_day.classList.remove("valid");
        error_message += "روز تولد را اصلاح کنید\n";
    }


    birth_month = document.getElementById("birthmonth");
    if(birthmonth_check()){
        birth_month.classList.add("valid");
        birth_month.classList.remove("invalid");
    }else{
        birth_month.classList.add("invalid");
        birth_month.classList.remove("valid");
        error_message += "ماه تولد را اصلاح کنید\n";
    }

    birth_year = document.getElementById("birthyear");
    if(birthyear_check()){
        birth_year.classList.add("valid");
        birth_year.classList.remove("invalid");
    }else{
        birth_year.classList.add("invalid");
        birth_year.classList.remove("valid");
        error_message += "سال تولد را اصلاح کنید\n";
    }

    email = document.getElementById("email");
    if(email_check()){
        email.classList.add("valid");
        email.classList.remove("invalid");
    }else{
        email.classList.add("invalid");
        email.classList.remove("valid");
        error_message += "ایمیل معتبر وارد کنید\n";

    }

    phone = document.getElementById("phonenumber");
    if(mobile_check()){
        phone.classList.add("valid");
        phone.classList.remove("invalid");
    }else{
        phone.classList.add("invalid");
        phone.classList.remove("valid");
        error_message += "شماره موبایل درست وارد کنید.\n";
    }

    national_code = document.getElementById("ssd");
    if(ssd_valid()){
        national_code.classList.add("valid");
        national_code.classList.remove("invalid");
    }else{
        national_code.classList.add("invalid");
        national_code.classList.remove("valid");
        error_message += "کد ملی معتبر وارد کنید\n";
    }

    password = document.getElementById("password");
    if(password_check()){
        password.classList.add("valid");
        password.classList.remove("invalid");
    }else{
        password.classList.add("invalid");
        password.classList.remove("valid");
        error_message += "رمز می‌تواند فقط اعداد، الفبای انگلیسی و =*$#!+- فقط اعداد، الفبای انگلیسی و =*$#!+- باشد و طول آن باید بین ۸ تا ۲۴ باشد\n";
    }

    password_confirm = document.getElementById("password_confirm");
    if(password_confirm_check()){
        password_confirm.classList.add("valid");
        password_confirm.classList.remove("invalid");
    }else{
        password_confirm.classList.add("invalid");
        password_confirm.classList.remove("valid");
        error_message += "تکرار رمز را مجددا بررسی کنید\n";
    }

    address = document.getElementById("address");
    if(address_check()){
        address.classList.add("valid");
        address.classList.remove("invalid");
    }else{
        address.classList.add("invalid");
        address.classList.remove("valid");
        error_message += "طول آدرس نباید بیش از ۲۵۰ حرف باشد\n";
    }

    marital_div = document.getElementById("marital");
    if(is_marital_status_valid()){
        marital_div.classList.remove("invalid");
    }else {
        marital_div.classList.add("invalid");
        error_message += "وضعیت تأهل را مشخص کنید\n";
    }

    document.getElementById("info").innerHTML = (error_message.replaceAll('\n','<br>'));

    return error_message == "";
}