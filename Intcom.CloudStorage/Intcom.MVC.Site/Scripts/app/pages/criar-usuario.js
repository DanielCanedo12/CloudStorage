$(document).ready(function () {
    new SendForm({ frm: '#frm' });
    $('#ipwSenha').val("");

    checkStrength = function (ipw, exit) {
        exit.removeClass('has-error').removeClass('has-warning').removeClass('has-success');

        exit.find('.alert-danger').removeClass('alert-danger');
        exit.find('.alert-warning').removeClass('alert-warning');
        exit.find('.alert-success').removeClass('alert-success');

        exit.find('.d1, .d2, .d3').addClass('bg-cinza');

        var password = ipw.val();

        var strength = 0
        //if the password length is less than 6, return message. 
        if (password.length < 6) {
            $('#result').removeClass();
            $('#result').addClass('short');

            exit.addClass('has-error').children('label').text('Muito curta');
            return;
        }

        //length is ok, lets continue. 
        //if length is 8 characters or more, increase strength value 
        if (password.length > 7) {
            strength += 1;
        }

        //if password contains both lower and uppercase characters, increase strength value 
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            strength += 1;
        }

        //if it has numbers and characters, increase strength value 
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
            strength += 1;
        }

        //if it has one special character, increase strength value 
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
            strength += 1;
        }

        //if it has two special characters, increase strength value 
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) {
            strength += 1;
        }

        //now we have calculated strength value, we can return messages 
        //if value is less than 2 
        if (strength < 2) {
            exit.addClass('has-error').children('label').text('Fraca');
            exit.find('.d1').addClass('alert-danger').removeClass('bg-cinza');
        } else if (strength == 2) {
            exit.addClass('has-warning').children('label').text('Boa');
            exit.find('.d1, .d2').addClass('alert-warning').removeClass('bg-cinza');
        } else {
            exit.addClass('has-success').children('label').text('Forte');
            exit.find('.d1, .d2, .d3').addClass('alert-success').removeClass('bg-cinza');
        }
    };
    checkSenhas = function (ipw1, ipw2) {
        if (ipw1.val() != ipw2.val()) {
            $('#confirmaSenha').children('label').html($('<i class="fa fa-ban" aria-hidden="true">').css('color', '#f05050'));
        }
        else {
            $('#confirmaSenha').children('label').html($('<i class="fa fa-check" aria-hidden="true">').css('color', '#27c24c'));
        }
    };





    $('#ipwSenha').keyup(function () {
        checkStrength($('#ipwSenha'), $('#forcaSenha'));
        checkSenhas($('#ipwSenha'), $('#ipwConfirmacao'));
    }).change(function () {
        checkStrength($('#ipwSenha'), $('#forcaSenha'));
        checkSenhas($('#ipwSenha'), $('#ipwConfirmacao'));
    });

    $('#ipwConfirmacao').keyup(function () {
        checkSenhas($('#ipwSenha'), $('#ipwConfirmacao'));
    }).change(function () {
        checkSenhas($('#ipwSenha'), $('#ipwConfirmacao'));
    });
 
});