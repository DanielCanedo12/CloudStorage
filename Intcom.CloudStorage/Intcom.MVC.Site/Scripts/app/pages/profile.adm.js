$(document).ready(function () {
    FO.GLOBAL_VARS.UpCapaData = "";

    reposicionar = function () {
        $('#divOverCover').hide();
        $('#divCover').css('z-index', 0);
        $('#divCover div').show();
        $('#divCover img').css('cursor', 'move').draggable({
            scroll: false,
            axis: "y",
            drag: function (event, ui) {
                var y1 = $('#divCover').height();
                var y2 = $('#divCover img').height();

                if (ui.position.top >= 0) {
                    ui.position.top = 0;
                } else if (ui.position.top <= y1 - y2) {
                    ui.position.top = y1 - y2;
                }
            },
            stop: function (event, ui) { }
        });
    };

    $('#frmFileUploadCapa').fileupload({
        url: '/Perfil/MudarCapa',
        dataType: 'json',
        add: function (e, data) {
            FO.GLOBAL_VARS.UpCapaData = data;
        },
        change: function (e, data) {
            $.each(data.files, function (index, file) {
                var reader = new FileReader();

                $(reader).bind('loadend', function (e) {
                    var img = $('#imgCapa');
                    img.data('oldimage', img.attr('src')).attr('src', event.target.result);
                    reposicionar();
                });

                reader.readAsDataURL(file);
            });
        }
    });

    $('#aCoverReposicionar').click(reposicionar);

    $('#btCoverSalvar').click(function () {
        $(this).addClass('whirl traditional');

        if (FO.GLOBAL_VARS.UpCapaData) {
            FO.GLOBAL_VARS.UpCapaData.formData = { top: $('#imgCapa').css('top') };
            FO.GLOBAL_VARS.UpCapaData.submit().success(function (result, textStatus, jqXHR) {

                document.location.href = document.location.href;

            }).error(function () {
                $('#btCoverSalvar').removeClass('whirl traditional');

                swal({
                    title: 'Erro',
                    text: 'Desculpe, mas esta imagem não pode ser enviada. Tente novamente ou escolha outra imagem.',
                    allowOutsideClick: false,
                    type: "error",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    confirmButtonClass: "btn-danger",
                    html: false
                });
            }).always(function () { $('#btCoverSalvar').removeClass('whirl traditional'); });
        } else {
            $.ajax('/Perfil/MudarPosicao', {
                method: 'POST',
                data: { top: $('#imgCapa').css('top') }
            }).always(function () {
                $('#btCoverSalvar').removeClass('whirl traditional');
            }).error(function () {
                $('#btCoverSalvar').removeClass('whirl traditional');

                swal({
                    title: 'Erro',
                    text: 'Desculpe, mas esta imagem não foi possível reposicionar esta imagem. Tente novamente mais tarde.',
                    allowOutsideClick: false,
                    type: "error",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    confirmButtonClass: "btn-danger",
                    html: false
                });
            }).success(function () {
                document.location.href = document.location.href;
            });
        }
    });


    $('#btCoverCalcelar').click(function () {
        $('#divOverCover').show();
        $('#divCover').css('z-index', -1);
        $('#divCover div').hide();

        var img = $('#imgCapa');
        img.css('cursor', 'default').draggable('destroy');


        if (img.data('oldimage')) {
            img.attr('src', img.data('oldimage')).data('oldimage', '');
        }

        img.css('top', img.data('oldtop') ? img.data('oldtop') : '0px').data('oldtop', '');

        FO.GLOBAL_VARS.UpCapaData = "";
    });

});

$(document).ready(function () {
    $('#aProfileFoto').click(function () {
        $('.croppie').croppie('destroy');
        $('#divCropy').hide();
        $('#mudaFotoProfile').modal('show');
    });

    if ($('#aProfileFoto').css('opacity') == 0) {
        $('#aProfileFoto').on('mouseover', function () {
            $('#aProfileFoto').animate({ opacity: 1 }, 'fast');
        }).on('mouseout', function () {
            $('#aProfileFoto').animate({ opacity: 0 }, 'fast');
        });
    }


    $('#frmFileUploadAvatar').fileupload({
        url: '/Perfil/MudarFoto',
        dataType: 'json',
        add: function (e, data) {
            FO.GLOBAL_VARS.UpFotoData = data;
        },
        change: function (e, data) {
            $.each(data.files, function (index, file) {
                var reader = new FileReader();

                $(reader).bind('loadend', function (e) {
                    $('.croppie').croppie('destroy');
                    $('#divCropy').show();
                    $('.croppie').croppie({
                        url: e.target.result,
                        viewport: {
                            width: 300,
                            height: 300,
                            type: 'circle'
                        },
                        boundary: {
                            width: $('.croppie').parent().width(),
                            height: '400'
                        }
                    });
                });

                reader.readAsDataURL(file);
            });
        }
    });

    $('#btStUploadAvatar').click(function () {
        if (FO.GLOBAL_VARS.UpFotoData) {
            $(this).addClass('whirl traditional');

            $('.croppie').croppie('result').then(function (res) {
                FO.GLOBAL_VARS.UpFotoData.formData = { perfil: new String(res) };
                FO.GLOBAL_VARS.UpFotoData.submit().success(function (result, textStatus, jqXHR) {

                    document.location.href = document.location.href;

                }).error(function () {
                    $('#btStUpload').removeClass('whirl traditional');

                    swal({
                        title: 'Erro',
                        text: 'Desculpe, mas esta imagem não pode ser enviada. Tente novamente ou escolha outra imagem.',
                        allowOutsideClick: false,
                        type: "error",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        confirmButtonClass: "btn-danger",
                        html: false
                    });
                });
            });
        }
    });
    $('.btnAceitar').click(function () {
        var idSolicitante = $(this).data('idsolicitante');

        $.ajax({
            url: FO.GLOBAL_VARS.UrlConfirmarAmizade,
            data: { 'idSolicitante': idSolicitante },
            method: 'post'
        }).success(function (data) {
            if (data == true) {
                $('#' + idSolicitante).find('button').removeClass('btnAceitar btn-info').addClass('btn-success').html('Aceito');
                setTimeout(function () { $('#' + idSolicitante).addClass('animated fadeOut').hide(); }, 2000);
            }
        }).fail(function () {
            $('#' + idSolicitante).find('button').removeClass('btn-info').addClass('btn-error');
        });
    });

});