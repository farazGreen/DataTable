var username = localStorage.getItem("USERNAME");
var type;
var sNum;
var maxR = '5';
if (localStorage.getItem("emp_id") && localStorage.getItem("skin")) {
    type = "css/" + localStorage.getItem("skin") + "/bootstrap.min.css";
    $('link[href*="bootstrap.min.css"]').attr('href', type);
}
$(function () {
    $('.user-image, .img-circle').attr('src', localStorage.getItem("BASE_CODE"));
    $('.user-image, .img-circle').attr('onerror', "imgError(this);");
    $('.dropdown-toggle > .hidden-xs').html(username);
    $('.dropdown-menu label').html();
    if (localStorage.getItem("EMP_SHORTNAME") !== "") {
        $('.dropdown-menu label').html(username + " (" + localStorage.getItem("EMP_SHORTNAME") + ")");
    }
    $('.user-header p').html(username + "<small>Logged in at " + localStorage.getItem("LOGIN_TIME") + "</small>");
    $('.user-panel .info p').html(username);
    $('.dropdown sap').html(username);
});

function imgError(image){
	localStorage.setItem("BASE_CODE", "hmsImages/noImage.png");
	$(image).attr("src",localStorage.getItem("BASE_CODE"));
}

$.ajaxSetup({'beforeSend': function (xhr) {
        if (xhr.overrideMimeType)
            xhr.overrideMimeType("text/plain");
    }
});
var loc;
$(function () {
//    $('body').addClass("sidebar-mini sidebar-collapse");
    loc = window.location.href;
    loc = (loc.split('/')[loc.split('/').length - 1]);
    $('.sidebar-menu').find('a').each(function () {
        if ($(this).attr('href') == loc)
        {
            $(this).parent().addClass("active");
            $(this).parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().addClass("active");
        }
//        $(this).click(function () {
//            return false;
//        });
//
//        $(this).dblclick(function () {
//            if ($(this).prop("href") != "") {
//                window.location.href = $(this).attr("href");
//            }
//        });
    });

    $('input').each(function () {
        $(this).attr('autocomplete', 'off');
//        $(this).attr('placeholder', 'Enter text');
    });


    $('[isPhoneKey]').each(function () {
        $(this).keypress(function (event) {
            return isPhoneKey(event, this.value);
        });
        $(this).bind('cut copy paste drop', function () {
            return false;
        });
    });

    $('[isAlphabet]').each(function () {
        $(this).keypress(function () {
            return isAlphabet(event, this.value);
        });
        $(this).bind('cut copy paste drop', function () {
            return false;
        });
    });

    $('[isAlphabetName]').each(function () {
        $(this).keypress(function (event) {
            return isAlphabetName(event, this.value);
        });
        $(this).bind('paste drop', function () {
            return false;
        });
    });

    $('[isDecimalKey]').each(function () {
        $(this).keypress(function (event) {
            return isDecimalKey(event, this.value);
        });
        $(this).bind('cut copy paste drop', function () {
            return false;
        });
    });

    $('[isNumberKey]').each(function () {
        $(this).keypress(function (event) {
            return isNumberKey(event, this.value);
        });
        $(this).bind('cut copy paste drop', function () {
            return false;
        });
    });

    $('[isNameKey]').each(function () {
        $(this).keypress(function (event) {
            return isNameKey(event, this.value);
        });
        $(this).bind('cut copy paste drop', function () {
            return false;
        });
    });


});
function exist() {
    $('input').each(function () {//setting input border color red for existing columns
        if ($(this).attr('exist')) {
            $(this).focusin(function () {
                $(this).css('border-color', '#66AFE9');
                $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
            });
            $(this).focusout(function () {
                $(this).css('border-color', '#CCC');
                $(this).css('box-shadow', 'none');
            });
            $(this).css('border-color', '#a94442');
            $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
        }
    });
    $('select').each(function () {//setting select border color red for existing columns
        if ($(this).attr('exist')) {
            var itemmm = $(this).parent().find("span.select2-selection");
            itemmm.focusin(function () {
                itemmm.css('border-color', '#66AFE9');
                itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
            });
            itemmm.focusout(function () {
                itemmm.css('border-color', '#CCC');
                itemmm.css('box-shadow', 'none');
            });
            itemmm.css('border-color', '#a94442');
            itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');

        }
    });
}
function getAge(dateString) {

    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
//mm/dd/yyyy
    var dob = new Date(dateString.substring(6, 10),
            dateString.substring(3, 5) - 1,
            dateString.substring(0, 2)
            );
    // console.log(dob);
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;

        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };
    var YMD = [age.years + yearString, age.months + monthString, age.days + dayString];
    return YMD;
}


function ultimateAlert(msg, duration)
{
    $.blockUI({
        message: '<h4>' + msg + '</h4>',
        css: {
            border: 'none',
            padding: '5px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            zIndex: '1500'
        }});
    setTimeout($.unblockUI, duration);
}

function ultimateAlertNoClose(msg)
{
    $.blockUI({
        message: '<h4>' + msg + '</h4>',
        css: {
            border: 'none',
            padding: '5px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }});
}

function ultimateAlertClickClose(msg)
{
    $.blockUI({
        message: '<h4>' + msg + '</h4>',
        css: {
            border: 'none',
            padding: '5px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }});
    $('.blockOverlay').click($.unblockUI);
}

function ultimateAlertRightCorner(msg)
{
    $.blockUI({
        message: '<div class="growlUI"><h4>' + msg + '</h4></div>',
        fadeIn: 1500,
        fadeOut: 1500,
        timeout: 2000,
        showOverlay: false,
        centerY: false,
        css: {
            width: '350px',
            top: '55px',
            left: '',
            right: '10px',
            border: 'none',
            padding: '5px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .6,
            color: '#fff'
        }
    });
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//return isPhoneKey(event, this.value);
//a-97 z-122 A-65 Z-90 _95
function isAlphabet(evt, valz) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 95)
        return true;
    else
        return false;
}
function isAlphabetName(evt, valz) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 95 || charCode === 32)
        return true;
    else
        return false;
}
function isDecimalKey(evt, valz) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode === 46) {
        if (valz.indexOf(".") === -1) {
            return true;
        }
        else {
            return false;
        }
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


function isPhoneKey(evt, valz) {
    if (valz.length < 15)
    {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode === 43) {
            if (valz.indexOf("+") === -1) {
                return true;
            }
            else {
                return false;
            }
        }
        if (charCode === 45) {
            if (valz.indexOf("-") === -1) {
                return true;
            }
            else {
                return false;
            }
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 43 && charCode !== 45) {
            return false;
        }
        return true;
    }
    else
    {
        return false;
    }
}

function isNumberKey(evt, valz) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isNameKey(evt, valz) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 95 || charCode === 32)
        return true;
    else
        return false;
}
function myFormValidator(thisId) {
    var ii = 0;
    var Flag = true;
    if ($('[type=text]')) {
        $(thisId).closest('form').find('[text=1]').each(function () {
            if ($(this).val().trim() === "") {
                console.log($(this).attr("id"));
                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            } else if ($(this).attr("textDate") == "1") {
                if (toDate($(this).val()) == "Invalid Date")
                {
                    $(this).focusin(function () {
                        $(this).css('border-color', '#66AFE9');
                        $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    $(this).focusout(function () {
                        $(this).css('border-color', '#CCC');
                        $(this).css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        $(this).focus();
                    }
                    $(this).css('border-color', '#a94442');
                    $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            }
        });
    }
    if ($('[type=select]')) {
        $(thisId).closest('form').find('[select=1]').each(function () {
            if ($(this).val() === "0") {
                console.log($(this).attr("id"));
                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
//                $(this).css('border-color', '#CCC');
//                $(this).css('box-shadow', 'none');
                Flag = false;
            }
        });
    }
    if ($('[type=select]')) {
        $(thisId).closest('form').find('[emptySelect=1]').each(function () {
            if ($(this).val() === "") {
                console.log($(this).attr("id"));

                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
//                $(this).css('border-color', '#CCC');
//                $(this).css('box-shadow', 'none');
                Flag = false;
            }
        });
    }
    return Flag;
}


function myValidator()
{
    var ii = 0;
    var Flag = true;
    if ($('[type=text]')) {
        $('[text=1]').each(function () {
            if ($(this).val().trim() === "") {
                console.log($(this).attr("id"));
                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            } else if ($(this).attr("textDate") == "1") {
                if (toDate($(this).val()) == "Invalid Date")
                {
                    $(this).focusin(function () {
                        $(this).css('border-color', '#66AFE9');
                        $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    $(this).focusout(function () {
                        $(this).css('border-color', '#CCC');
                        $(this).css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        $(this).focus();
                    }
                    $(this).css('border-color', '#a94442');
                    $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            }
        });
    }
    if ($('[type=select]')) {
        $('[select=1]').each(function () {
            if ($(this).val() === "0" || $(this).val() === "" || $(this).val() == null) {
                console.log($(this).attr("id"));
                var itemmm = $(this).parent().find("span.select2-selection");
                itemmm.focusin(function () {
                    itemmm.css('border-color', '#66AFE9');
                    itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                itemmm.focusout(function () {
                    itemmm.css('border-color', '#CCC');
                    itemmm.css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    itemmm.focus();
                }
                itemmm.css('border-color', '#a94442');
                itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            }
        });
    }
    if ($('[type=select]')) {
        $('[selectDisable=1]').each(function () {
            if ($(this).prop("disabled") == false) {
                if ($(this).val() === "0" || $(this).val() === "" || $(this).val() == null) {
                    console.log($(this).attr("id"));
                    var itemmm = $(this).parent().find("span.select2-selection");
                    itemmm.focusin(function () {
                        itemmm.css('border-color', '#66AFE9');
                        itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    itemmm.focusout(function () {
                        itemmm.css('border-color', '#CCC');
                        itemmm.css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        itemmm.focus();
                    }
                    itemmm.css('border-color', '#a94442');
                    itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            } else {
                $(this).css('border-color', '#CCC');
                $(this).css('box-shadow', 'none');
            }
        });
    }
    return Flag;
}


function myValidatorSub()
{
    var ii = 0;
    var Flag = true;
    if ($('[type=text')) {
        $('[textsub=1]').each(function () {
            if ($(this).val().trim() === "") {
                console.log($(this).attr("id"));
                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            } else if ($(this).attr("textsubDate") == "1") {
                if (toDate($(this).val()) == "Invalid Date")
                {
                    $(this).focusin(function () {
                        $(this).css('border-color', '#66AFE9');
                        $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    $(this).focusout(function () {
                        $(this).css('border-color', '#CCC');
                        $(this).css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        $(this).focus();
                    }
                    $(this).css('border-color', '#a94442');
                    $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            }
        });
    }
    if ($('[type=select]')) {
        $('[selectsub=1]').each(function () {
            if ($(this).val() === "0" || $(this).val() === "") {
                console.log($(this).attr("id"));
                var itemmm = $(this).parent().find("span.select2-selection");
                itemmm.focusin(function () {
                    itemmm.css('border-color', '#66AFE9');
                    itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                itemmm.focusout(function () {
                    itemmm.css('border-color', '#CCC');
                    itemmm.css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    itemmm.focus();
                }
                itemmm.css('border-color', '#a94442');
                itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            }
        });
    }
    if ($('[type=Select]')) {
        $('[emptySelectsub=1]').each(function () {
            if ($(this).val() === "") {
                console.log($(this).attr("id"));
                var itemmm = $(this).parent().find("span.select2-selection");
                itemmm.focusin(function () {
                    itemmm.css('border-color', '#66AFE9');
                    itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                itemmm.focusout(function () {
                    itemmm.css('border-color', '#CCC');
                    itemmm.css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    itemmm.focus();
                }
                itemmm.css('border-color', '#a94442');
                itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            }
        });
    }
    return Flag;
}

function myValidatorModal(thisModal)
{
    var modalBody = $(thisModal).parent().parent().find(".modal-body");
    var ii = 0;
    var Flag = true;
    if ($('[type=text]')) {
        $(modalBody).find('[textModal=1]').each(function () {
            if ($(this).val().trim() === "") {
                console.log($(this).attr("id"));
                $(this).focusin(function () {
                    $(this).css('border-color', '#66AFE9');
                    $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                $(this).focusout(function () {
                    $(this).css('border-color', '#CCC');
                    $(this).css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    $(this).focus();
                }
                $(this).css('border-color', '#a94442');
                $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            } else if ($(this).attr("textModalDate") == "1") {


                if (toDate($(this).val()) == "Invalid Date")
                {
                    console.log($(this).attr("id"));
                    $(this).focusin(function () {
                        $(this).css('border-color', '#66AFE9');
                        $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    $(this).focusout(function () {
                        $(this).css('border-color', '#CCC');
                        $(this).css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        $(this).focus();
                    }
                    $(this).css('border-color', '#a94442');
                    $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            }
        });
        $(modalBody).find('[textMultiModal=1]').each(function () {
            if ($(this).attr("textMultiModal") == "1") {
                var totalCount = 0;
                var emptyCount = 0;
                $(this).parent().find('[textMultiModal=1]').each(function () {
                    if ($(this).val() == "") {
                        emptyCount = emptyCount + 1;
                    }
                    totalCount = totalCount + 1
                });
                if (emptyCount != totalCount && emptyCount != 0) {
                    $(this).focusin(function () {
                        $(this).css('border-color', '#66AFE9');
                        $(this).css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                    });
                    $(this).focusout(function () {
                        $(this).css('border-color', '#CCC');
                        $(this).css('box-shadow', 'none');
                    });
                    if (ii === 0)
                    {
                        ii++;
                        $(this).focus();
                    }
                    $(this).css('border-color', '#a94442');
                    $(this).css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                    Flag = false;
                }
            }
        });

    }
    if ($('[type=select]')) {
        $(modalBody).find('[selectModal=1]').each(function () {
            if ($(this).val() === "0") {
                console.log($(this).attr("id"));
                var itemmm = $(this).parent().find("span.select2-selection");
                itemmm.focusin(function () {
                    itemmm.css('border-color', '#66AFE9');
                    itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                itemmm.focusout(function () {
                    itemmm.css('border-color', '#CCC');
                    itemmm.css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    itemmm.focus();
                }
                itemmm.css('border-color', '#a94442');
                itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            }
        });
        $(modalBody).find('[selectModalNormal=1]').each(function () {
            if ($(this).val() === "0") {
                if ($(this).find('option').length > 1) {
                    var validateSelect = true;
                    var existWith = $(this).attr("existWith");
                    if (existWith != undefined) {
                        if ($(this).parent().parent().find('[' + existWith + ']').val() == "") {
                            validateSelect = false;
                        }
                    }
                    if (validateSelect) {
                        console.log($(this).attr("id"));
                        var itemmm = $(this);
                        itemmm.focusin(function () {
                            itemmm.css('border-color', '#66AFE9');
                            itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                        });
                        itemmm.focusout(function () {
                            itemmm.css('border-color', '#CCC');
                            itemmm.css('box-shadow', 'none');
                        });
                        if (ii === 0)
                        {
                            ii++;
                            itemmm.focus();
                        }
                        itemmm.css('border-color', '#a94442');
                        itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                        Flag = false;
                    }
                }
            }
        });
    }
    if ($('[type=Select]')) {
        $(modalBody).find('[emptySelectModal=1]').each(function () {
            if ($(this).val() == "") {
                console.log($(this).attr("id"));
                var itemmm = $(this).parent().find("span.select2-selection");
                itemmm.focusin(function () {
                    itemmm.css('border-color', '#66AFE9');
                    itemmm.css('box-shadow', '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6)');
                });
                itemmm.focusout(function () {
                    itemmm.css('border-color', '#CCC');
                    itemmm.css('box-shadow', 'none');
                });
                if (ii === 0)
                {
                    ii++;
                    itemmm.focus();
                }
                itemmm.css('border-color', '#a94442');
                itemmm.css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483');
                Flag = false;
            }
        });
    }
    return Flag;
}

function toFloat(floatValue)
{
    var fv = parseFloat(floatValue);
    if (fv !== parseFloat(fv)) {
        fv = 0.00;
    }
    return fv;
}

function toDecimalStr(floatValue)
{
    return toFloat(floatValue).toFixed(2);
}


var th = ['', 'thousand', 'Million', 'Billion', 'Trillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function toWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');

    if (s != parseFloat(s))
        return 'not a number';

    var x = s.indexOf('.');
    if (x == -1)
        x = s.length;
    if (x > 15)
        return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++)
    {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0)
                str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk)
                str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++)
            str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}


function myDateDiff(date1, date2, interval) {
    var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    //length = 22 means date contains seconds
    if(date1.length == 22){
    	date1 = toDateTimeWithSeconds(date1);
    }else{
    	date1 = toDateTime(date1);	
    }
    if(date2.length == 22){
    	date2 = toDateTimeWithSeconds(date2);
    }else{
    	date2 = toDateTime(date2);	
    }
    var timediff = date2 - date1;
    if (isNaN(timediff))
        return NaN;
    switch (interval) {
        case "years":
            return date2.getFullYear() - date1.getFullYear();
        case "months":
            return (
                    (date2.getFullYear() * 12 + date2.getMonth())
                    -
                    (date1.getFullYear() * 12 + date1.getMonth())
                    );
        case "weeks"  :
            return Math.floor(timediff / week);
        case "days"   :
            return Math.floor(timediff / day);
        case "hours"  :
            return Math.floor(timediff / hour);
        case "minutes":
            return Math.floor(timediff / minute);
        case "seconds":
            return Math.floor(timediff / second);
        default:
            return undefined;
    }
}

function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}

function minusDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() - numDays);
    return dateObj;
}


function toDate(stringDate) {
    var parts = stringDate.split('-');
    var myDate = new Date(parts[2], parts[1] - 1, parts[0]);
    return myDate;
}

function toDateTime(stringDate) {
    var part = stringDate.split(' ');

    var partsDate = part[0].split('-');
    var partsTime = part[1].split(':');
    var amPM = part[2];

    var hour = partsTime[0];
    var minutes = partsTime[1];
    if (amPM == "PM") {
        if (hour != 12) {
            hour = parseInt(hour) + 12;
        }
    } else if (amPM == "AM") {
        if (hour == "12") {
            hour = "00";
        }
    }
    var myDate = new Date(partsDate[2], partsDate[1] - 1, partsDate[0], hour, minutes);
    return myDate;
}

function toDateTimeWithSeconds(stringDate) {
    var part = stringDate.split(' ');

    var partsDate = part[0].split('-');
    var partsTime = part[1].split(':');
    var amPM = part[2];

    var hour = partsTime[0];
    var minutes = partsTime[1];
    var seconds = partsTime[2];
    if (amPM == "PM") {
        if (hour != 12) {
            hour = parseInt(hour) + 12;
        }
    } else if (amPM == "AM") {
        if (hour == "12") {
            hour = "00";
        }
    }
    var myDate = new Date(partsDate[2], partsDate[1] - 1, partsDate[0], hour, minutes, seconds);
    return myDate;
}


function getCurrentDate()
{
    return toDateFromBigdate(new Date());
}
function getCurrentDateNew()
{
    return toDateFromBigdateNew(new Date());
}
//get year before 'count' years
function getYearBefore(count)
{
    var date = new Date;
    date.setFullYear(date.getFullYear() - count);
    return toDateFromBigdate(date);
}
//get year after 'count' years
function getYearAfter(count)
{
    var date = new Date;
    date.setFullYear(date.getFullYear() + count);
    return toDateFromBigdate(date);
}

function getLastMonth()
{
    var date = new Date;
    date.setMonth(date.getMonth() - 1);
    return toDateFromBigdate(date);
}

function getLastMonthAsDate()
{
    var date = new Date;
    date.setMonth(date.getMonth() - 1);
    return date;
}


function getLastMonthNew()
{
    var date = new Date;
    date.setMonth(date.getMonth() - 1);
    return toDateFromBigdateNew(date);
}
function getLastWeek()
{
    var date = new Date;
    date.setDate(date.getDate() - 7);
    return toDateFromBigdate(date);
}

function getCurrentTime()
{
    var date = new Date,
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            seconds = date.getSeconds(),
            ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12; // zero = 12

    minute = minute > 9 ? minute : "0" + minute;
    seconds = seconds > 9 ? seconds : "0" + seconds;
    hour = hour > 9 ? hour : "0" + hour;

    time = hour + ":" + minute + ":" + seconds + " " + ampm;
    return time;
}

function getCurrentTimeWithoutSec()
{
    var date = new Date,
            hour = date.getHours(),
            minute = date.getMinutes(),
            ampm = hour > 11 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // zero = 12

    minute = minute > 9 ? minute : "0" + minute;
    hour = hour > 9 ? hour : "0" + hour;

    time = hour + ":" + minute + " " + ampm;
    return time;
}

function toDateFromBigdate(date) {
    var d = new Date(date || Date.now());
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

function toDateFromBigdateNew(date) {
    var d = new Date(date || Date.now());
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}

function to12HourFrom24(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}
$(window).resize(function () {
    tableResize();
    frameResize(65);
    addPopUpOnResizeOrScroll();
});
$(window).scroll(function () {
    addPopUpOnResizeOrScroll();
});
function panelResize() {
    var table = $(document).find('.panel').html();
    if (table !== undefined) {
        var c = window.innerHeight - $('.panel').offset().top - 10;
        if (c <= 175) {
            c = 175;
        }
        $('.panel-body').css({'height': c + 'px', 'overflow': 'scroll'});
    }
}
function tableResize() {//Resize table height to fit within page
    var table = $(document).find('#showGrid').html();
    if (table !== undefined) {
        var c = window.innerHeight - $('#showGrid').offset().top - 10;
        if (c <= 175) {
            c = 175;
        }
        $('#table').css('max-height', c);
    }
}
function frameResize(sub) {
	sub = 65;//Value is now fixed to 65. It varied earlier.
    var frame = $(document).find('iframe');
    if (frame !== undefined) {
        if ($('iframe').offset() !== undefined) {
            var d = window.innerHeight - $('html').offset().top - sub;
            if (d <= 400) {
                d = 400;
            }
            $('iframe').css({'height': d + 'px', 'border': 'none', 'width': '100%'});
        }

    }
}

function tableResize2(id) {//Resize table height to fit within page
    var table = $(document).find('#' + id).html();
    if (table !== undefined) {
        var c = window.innerHeight - $('#' + id).offset().top - 10;
        if (c <= 350) {
            c = 350;
        }
        $('.table-responsive').css('max-height', c);
    }
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
function toTimeScreen(DateStr) {
    var d = new Date(DateStr);
    var H = d.getHours();
    var M = d.getMinutes();
    var S = d.getSeconds();
    var retn = padDigits(H, 2) + ":" + padDigits(M, 2) + ":" + padDigits(S, 2) + " AM";
    if (H > 11) {
        h = H - 12;
        if (h == 0) {
            retn = "12" + ":" + padDigits(M, 2) + ":" + padDigits(S, 2) + " PM";
        } else {
            retn = padDigits(h, 2) + ":" + padDigits(M, 2) + ":" + padDigits(S, 2) + " PM";
        }
    }
    return retn;
}
function DateFormate(DateStr) {
    var s = DateStr.toString().split(" ")[0].split("-");
    return(s[2] + "-" + s[1] + "-" + s[0]);
}
function toDateScreen(DateStr) {
    var d = new Date(DateStr);
    var M = d.getMonth();
    var Y = d.getFullYear();
    var D = d.getDate();
    var retn;
    if (M < 10 && D < 10) {
        retn = "0" + D + "" + "-" + "0" + (M + 1) + "-" + Y;
    } else if (M > 10 && D > 10) {
        retn = D + "" + "-" + (M + 1) + "-" + Y;
    }
    else if (M < 10) {
        retn = D + "" + "-" + "0" + (M + 1) + "-" + Y;
    }
    else if (D < 10) {
        retn = "0" + D + "" + "-" + (M + 1) + "-" + Y;
    }
    return retn;
}
function searchTable() {
    // Write on keyup event of keyword input element
    $('#table_filter label input').keyup(function () {
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($("#table tbody").find("tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
    return false;
}

function dynTable() {
    var curr = $('.pagination li.active');
    var liSize = $('.pagination li').size() - 2;
    switch (curr.text()) {
        case '1':
            curr.removeClass('hide');
            curr.next().removeClass('hide');
            curr.next().next().removeClass('hide');
            curr.next().next().next().removeClass('hide');
            curr.next().next().next().next().removeClass('hide');
            break;
        case liSize.toString():
            curr.removeClass('hide');
            curr.prev().removeClass('hide');
            curr.prev().prev().removeClass('hide');
            curr.prev().prev().prev().removeClass('hide');
            curr.prev().prev().prev().prev().removeClass('hide');
            break;
        case '2':
            curr.prev().removeClass('hide');
            curr.removeClass('hide');
            curr.next().removeClass('hide');
            curr.next().next().removeClass('hide');
            curr.next().next().next().removeClass('hide');
            break;
        case (liSize - 1).toString():
            curr.prev().removeClass('hide');
            curr.prev().prev().removeClass('hide');
            curr.prev().prev().prev().removeClass('hide');
            curr.removeClass('hide');
            curr.next().removeClass('hide');
            break;
        default:
            curr.prev().removeClass('hide');
            curr.prev().prev().removeClass('hide');
            curr.removeClass('hide');
            curr.next().removeClass('hide');
            curr.next().next().removeClass('hide');
            break;
    }
    $('.pagination li:not(.disabled)').click(function () {
        sNum = $('#current').text();
        $('.pagination li').removeClass('active');
        if ($(this).hasClass('next')) {
            sNum = parseInt(sNum) + 1;
            tableLength(sNum);
        } else if ($(this).hasClass('prev')) {
            sNum = parseInt(sNum) - 1;
            tableLength(sNum);
        } else {
            sNum = $(this).text();
            tableLength(sNum);
        }
        $('#table').block({
            message: '<h1></h1>',
            css: {
                'border': '0px',
                'background': 'url(data:image/gif;base64,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) no-repeat center'
            }
        });
        return false;
    });
    $('#table_length label select').change(function () {
        maxR = $(this).val();
        tableLength(1);
        $('#table_length label').block({
            message: '<h1></h1>',
            css: {
                'border': '0px',
                'background': 'url(data:image/gif;base64,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) no-repeat center'
            }
        });
    });
    searchTable();
    return false;
}


var _ = function (nim) {
    alert(nim);
};// alert(); to _(); 
var __ = function (nim) {
    console.log(nim);
};// console.log(); to __();

function confirmOnDBLClick(toggler) {
    var temp = false;
    setInterval(function () {
        temp = false;
    }, 700);
    $('[data-toggle=' + toggler + ']').on('click', function (e) {
        if (!temp) {
            temp = true;
            e.stopImmediatePropagation();
        } else {
            temp = false;
        }
    });
}
function setReportPrintLink(url) {
    $('#table> tbody > tr').each(function () {
        $(this).find('td:eq(0)').append('<a class="prints hidden" data-toggle="tooltip" title="" data-original-title="Print"></a>');
        $(this).find('td:eq(0)').find("a").printPage({
            url: url + "?id=" + $(this).find('td:eq(0)').attr('id'),
            attr: "href",
            message: "Your document is being created"
        });
    });
}
function setViewPrintLink(url, tdNo) {//last Column No
    $('#table> tbody > tr').each(function () {
        $(this).attr('data-toggle', 'print');
        $(this).find('td:last-child').find('a:eq(1)').printPage({
            url: url + "?id=" + $(this).find('td:last-child').find('a:eq(1)').attr('deleteid'),
            attr: "href",
            message: "Your document is being created"
        });
    });
}
function setViewPrintLinkWithATM(url1, url2, tdNo) {//last Column No
    $('#table> tbody > tr').each(function () {
        $(this).attr('data-toggle', 'print');
        $(this).find('td:eq(' + tdNo + ')').append($("<a></a>").hide());
        $(this).find('td:eq(' + tdNo + ')').append($("<a></a>").hide());
        var jData = JSON.parse($(this).find('td:eq(' + tdNo + ')').find('a:eq(1)').attr('deleteid'));
        $(this).find('td:eq(' + tdNo + ')').find('a:eq(2)').printPage({
            url: url1 + "?id=" + jData[0].VISIT_ID,
            attr: "href",
            message: "Your document is being created"
        });
        $(this).find('td:eq(' + tdNo + ')').find('a:eq(3)').printPage({
            url: url2 + "?id=" + jData[0].VISIT_ID,
            attr: "href",
            message: "Your document is being created"
        });
    });
}
function setViewPrintLinkWithNoDElete(url1, url2, tdNo) {//last Column No
    $('#table> tbody > tr').each(function () {
        $(this).attr('data-toggle', 'print');
        $(this).find('td:eq(' + tdNo + ')').append($("<a></a>").attr("id", "0").hide());
        $(this).find('td:eq(' + tdNo + ')').append($("<a></a>").attr("id", "1").hide());
        $(this).find('td:eq(' + tdNo + ')').find('#0').printPage({
            url: url1 + "?id=" + $(this).find('td:eq(' + tdNo + ')').attr('prtId'),
            attr: "href",
            message: "Your document is being created"
        });
        $(this).find('td:eq(' + tdNo + ')').find('#1').printPage({
            url: url2 + "?id=" + $(this).find('td:eq(' + tdNo + ')').attr('prtId'),
            attr: "href",
            message: "Your document is being created"
        });
    });
}
function setViewPrintLinkWithDelete(url, tdNo) {//last Column No
    $('#table> tbody > tr').each(function () {
        $(this).attr('data-toggle', 'print');
        $(this).find('td:eq(' + tdNo + ')').append($("<a></a>").hide());
        $(this).find('td:eq(' + tdNo + ')').find('a:eq(2)').printPage({
            url: url + "?id=" + $(this).find('td:eq(' + tdNo + ')').find('a:eq(1)').attr('deleteid'),
            attr: "href",
            message: "Your document is being created"
        });
    });
}
function export2Excel(data, filename) {
	if(data){
		var dateTime = getDateTime();
		var fname = filename + "" + dateTime[0].year + "" + dateTime[0].month + "" + dateTime[0].day + "-" + dateTime[0].hours + "" + dateTime[0].minutes + "" + dateTime[0].seconds;
		var table = data;
		$('<table>').append($(table).find('tr').clone()).table2excel({
			exclude: ".excludeThisClass",
			name: "Worksheet Name",
			filename: fname //do not include extension
		});
	}
}

function getDateTime() {
    var dateTime = [];
    var date = new Date();
    year = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    if (m < 10) {
        month = "0" + m;
    } else {
        month = m;
    }
    if (d < 10) {
        day = "0" + d;
    } else {
        day = d;
    }
    if (hr < 10) {
        hours = "0" + hr;
    } else {
        hours = hr;
    }
    if (min < 10) {
        minutes = "0" + min;
    } else {
        minutes = min;
    }
    if (sec < 10) {
        seconds = "0" + sec;
    } else {
        seconds = sec;
    }
    dateTime.push({
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });

    return dateTime;
}

//	document.addEventListener('DOMContentLoaded', function () {
//	  if (Notification.permission !== "granted")
//	    Notification.requestPermission();
//	});

function addPopUp(message_data) {
	
			//notification
//	console.log(Notification);
//  	  if (!Notification) {
//  	    alert('Desktop notifications not available in your browser. Try Chromium.'); 
//  	    return;
//  	  }
//  	  if (Notification.permission !== "granted")
//  	    Notification.requestPermission();
//  	  else {
//  	    var notification = new Notification(title, {
//  	      icon: '',//icon:  image location
//  	      body: message,
//  	      data: "message Data",
////  	      renotify: true,
////  	      tag: "tags",//replace if tag is same(act as ID)
////  	      requireInteraction: true,//close only on interaction
//  	      data: 'testing data',
//  	      noscreen: false
//  	      
//  	    });
//  	    console.log(notification);
//  	    notification.onclick = function () {
//  	      window.open("http://" + document.location.host + "/medi_soft/Home");      
//  	    };
//  	    notification.onerror = function () {
//  	    	addPopUp("ERROR!!", "Failed Receiving a notification", "");      
//    	    };
//    	    setTimeout(notification.close.bind(notification), 1000);// close in given seconds
//  	    console.log(notification);
//  	  }
	
	var title = message_data.title;
	var message = message_data.message;
	var sender = message_data.user;
	var duration = message_data.duration;
	var displayId = message_data.displayId;
	
  if ($('#message-box').html() !== undefined) {
      $('#message-box').remove();
  }
  var countTimer = "";
  if(parseInt(duration)>0){
	  countTimer = " Restart's After <label id='"+ displayId +"'></label>";
  }
  var winHeight = window.innerHeight - $('body').height() - 115 + getVisibleTop('body');
  var winWidth = window.innerWidth - 300;
  $('<div></div>').attr('id', 'message-box').addClass('box-body').appendTo('body');
  $('<div></div>').attr('id', 'popUpMessage').addClass('alert alert-danger alert-dismissible33').appendTo('#message-box');
  $('<button type="button"/>').addClass('close').attr('data-dismiss', 'alert').attr('aria-hidden', 'true').text('x').appendTo('#popUpMessage');
  $('<h4><i class="icon fa fa-ban"></i> ' + title + '</h4>').appendTo('#popUpMessage');
  $('#popUpMessage').append(message + " " + countTimer);
  $('</br><label class="pull-right"><h5>Message From ' + sender + '</h5></label>').appendTo('#popUpMessage');
  $('#message-box').css({
      'position': 'absolute',
      'height': '100px',
      'width': '280px',
      'top': 'auto !important',
      'bottom': '0px !important',
      'margin': winHeight + 'px -330px 0px ' + winWidth + 'px',
      'zIndex': '2000',
      'border-color': ''
  }).animate({
      'right': '350px',
      'opacity': '0.4'}, "slow")
          .animate({
              'opacity': '1.0'}, "slow");
  if(parseInt(duration)>0){
	  startCountDownTimer(duration, displayId);
  }
}
var timeInterval;
function startCountDownTimer(duration, displayId) {
	if(timeInterval != undefined){//if message send multiple times, clear previous time
		clearInterval(timeInterval);
	}
    var timer = duration, minutes, seconds;
    timeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#'+displayId).text(minutes + ":" + seconds);

        if (--timer < 0) {
        	clearInterval(timeInterval);
        }
    }, 1000);
}

function addPopUpOnResizeOrScroll() {
    if ($('#message-box').html() !== undefined) {
        var winHeight = window.innerHeight - $('body').height() - 115 + getVisibleTop('body');
        var winWidth = window.innerWidth - 300;
        $('#message-box').css({
            'position': 'absolute',
            'height': '100px',
            'width': '280px',
            'top': 'auto !important',
            'bottom': '0px !important',
            'margin': winHeight + 'px -330px 0px ' + winWidth + 'px',
            'zIndex': '2000',
            'border-color': ''
        }).animate({right: '350px'});
    }
}

function getVisibleTop(tag) {
    var $el = $(tag),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    return visibleTop;
}
function getFromDateTime() {
	var d = new Date();
	return d.setHours(00, 00, 00, 00);
}
function getToDateTime() {
	var d = new Date();
	return d.setHours(23, 59, 59, 00);
}

$(window).bind("load", function(){
	var page = window.location.href;
    page = (page.split('/')[page.split('/').length - 1]);
    var formName = $(".formName").text();
    if(formName != "") { page = formName; } 
	$.post('ActiveUsers', {
			mode: "setUser",
			page : page
		}, function(data) {
		
	})
});

$(window).on('beforeunload', function(){
	var page = window.location.href;
    page = (page.split('/')[page.split('/').length - 1]);
    var formName = $(".formName").text();
    if(formName != "") { page = formName; } 
    $.ajax({
    	data: {mode : 'removeMe', page : page},
        url: "ActiveUsers",
        type: "POST",
        async: false
    });
    
//    $.post('ActiveUsers', {
//			mode : 'removeMe',
//			page : page,
//			async : false
//		}, function(data) {
//	});
});