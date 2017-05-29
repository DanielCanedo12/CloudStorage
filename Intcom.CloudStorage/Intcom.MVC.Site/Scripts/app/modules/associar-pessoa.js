(function ($) {
    $.fn.associarPessoa = function (options) {

        var defaults = {
            validarResponsavel: '',

            before: function () {
                $(settings.iptHidden).val('');
            },
            consultaSuccess: function (data) {
                $(settings.iptHidden).val(data.IdPessoa);
                $(settings.spanNome).text(data.Nome + ' ' + data.Sobrenome);
            },
            consultaError: function (data) {
                swal({
                    title: 'Atenção',
                    text: data.errors.cpf,
                    allowOutsideClick: false,
                    type: "warning",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    html: false
                });
            },

            cpfError: function () {
                swal({
                    title: 'Atenção',
                    text: 'Informe um CPF válido.',
                    allowOutsideClick: false,
                    type: "warning",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    html: false
                });
            },

            iptHidden: '#Pessoa',
            spanNome: '#pNomeResponsavel',
            iptCpf: '#itxCpf'
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            $(this).click(function () {
                settings.before();

                $(settings.spanNome).empty();

                var cpf = $(settings.iptCpf).val().replace(/[^0-9]/g, "");

                if (parseInt(cpf) == NaN || cpf.length != 11) {
                    settings.cpfError();
                } else {
                    $(this).attr('disabled', 'disabled').addClass('whirl traditional');

                    $.getJSON(settings.validarResponsavel, {
                        'cpf': cpf
                    }, function (data) {
                        $('#btCheckCPF').removeAttr('disabled').removeClass('whirl traditional');

                        if (!data) {
                            data.errors = { 'cpf': 'Falha na comunicação com o servidor' };
                        }

                        if (data.errors) {
                            settings.consultaError(data);
                        } else {
                            settings.consultaSuccess(data);
                        }
                    });
                }
            });
        });

    };
})(jQuery);