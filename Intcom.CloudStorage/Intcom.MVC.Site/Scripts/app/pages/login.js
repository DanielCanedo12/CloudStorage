(function ($) {
    pe = null;
    new SendForm({ frm: '#frmLogin' }).setShowErrors(function () {
        $('#frmLogin .form-group.has-feedback').addClass('animated shake');
        setTimeout(function () {
            $('#frmLogin .form-group.has-feedback').removeClass('animated shake');
        }, 2000)

        this.enable();
        return this;
    }).setOnSuccess(function () {
        $('#Name').text(this._res.nome);

        $('#ScrollLogin').animate({ scrollLeft: '+=363' }, 300);
        $('#aBack').fadeIn();
        $('#panel').animate({ height: '+=30', marginTop: '-=15' }, 100);
        $('#subPanel').animate({ height: '+=30' }, 100);
        $('#ihdUser').val($('#iptEmail').val());
        $('#Pass').focus();

        if (this._res.foto)
        {
            $('#imgFoto').attr('src', this._res.foto);
        }
        else
        {
            $('#imgFoto').attr('src', '/Content/Images/img_pessoa.png');
        }
    });

    new SendForm({ frm: '#frmSenha' }).setShowErrors(function () {
        $('#frmSenha .form-group.has-feedback').addClass('animated shake');
        setTimeout(function () {
            $('#frmSenha .form-group.has-feedback').removeClass('animated shake');
        }, 2000)

        this.enable();
        return this;
    });

    $('#aBack').click(function () {
        $('#ScrollLogin').animate({ scrollLeft: '-=363' }, 300);
        $('#ihdUser').val('');
        $('#iptEmail').focus();
        $('#Name').text('');
        $('#panel').animate({ height: '-=30', marginTop: '+=15' }, 300);
        $('#subPanel').animate({ height: '-=30' }, 300);
        $('#aBack').fadeOut();
        $('#imgFoto').attr('src', '/Content/Images/img_pessoa.png');
    });

    $('#ichRemember').change(function () {
        $('#Pass').focus();
    });

    $('input, button').on('focus', function () {
        clearTimeout(pe);
        $('#bg').stop().fadeIn();

    }).on('blur', function () {
        pe = setTimeout(function () {
            $('#bg').stop().fadeOut();
        }, 1);
    });

    $('#recuperaSenha').on('show.bs.modal', function () {
        $('#codCaptcha, #bscEmail').val('');
        $('#btsRecPass').attr('disabled', 'disabled');
        $('#captcha').empty();
        try {
            FO.GLOBAL_VARS.GreCaptcha = grecaptcha.render('captcha', {
                sitekey: '6LczpiETAAAAAKQp8h_lv-qrNCUkBBpVniqtaSAZ',
                callback: function () {
                    $('#btsRecPass').attr('disabled', false);
                },
                'expired-callback': function () {
                    $('#btsRecPass').attr('disabled', 'disabled');
                }
            });
        }
        catch (e) {
            grecaptcha.reset(FO.GLOBAL_VARS.GreCaptcha);
        }
    }).on('hidden.bs.modal', function () {
        $('#divRecPassSu').hide();
        $('#frmRecuperaSenha').show();
    });

  

    new SendForm({ frm: '#frmRecuperaSenha' }).setOnSuccess(function () {

        $('#divRecPassSu').fadeIn(1000);
        $('#emailSucesso').text($("#bscEmail").val());
        $('#frmRecuperaSenha').hide();
        
    }).setValidateFunc(function () {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var reCapt = grecaptcha.getResponse();

        if (reCapt == "" || reCapt == undefined) {
            $("#divErrMsg").show().find('p').text("Favor comprovar que não é um robô");
            return false;
        }

        if (re.test($("#bscEmail").val())) {
            $("#divErrMsg").hide().find('p').text("");
            $("#codCaptcha").val(reCapt);
            return true;
        } else {
            $("#divErrMsg").show().find('p').text("Email inválido.");
            return false;
        }
    });

    $('#iptEmail').focus();
   
})(jQuery);