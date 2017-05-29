(function ($) {
    if (!FO.GLOBAL_FUNCS.checkDateInput()) {
        $('#idtDataNascimento').datetimepicker({
            format: 'DD/MM/YYYY',
            locale: "pt-BR"
        });
    }

    $("#itxCEP").blur(function () {
        var cep = $(this).val().replace('-', '');

        if (parseInt(cep) != NaN && cep.length == 8) {
            $('#spnLoading').addClass('whirl traditional');

            $.getJSON('http://api.postmon.com.br/v1/cep/' + $(this).val().replace('-', ''), function (dados) {
                $('#itxCidade').val(dados.cidade);
                $('#itxEstado').val(dados.estado);
                $('#itxEndereco').val(dados.logradouro + ' - ' + dados.bairro);
                $('#itxComplemento').val("");
                $('#itxNumero').val("");
                $('#spnLoading').removeClass('whirl').removeClass('traditional');

            }).fail(function () {
                $('#itxCEP').addClass("input-validation-error");

                $('#itxCidade').val("");
                $('#itxEstado').val("");
                $('#itxEndereco').val("");
                $('#itxComplemento').val("");
                $('#itxNumero').val("");

                $('#spnLoading').removeClass('whirl').removeClass('traditional');
            });
        }
    });

    $('#modalCEP').on('show.bs.modal', function (e) {
        $('#frmBuscaCEP').trigger("reset");
        $('#ResCEP').hide();
    })
    
    new SendForm({ frm: '#frmBuscaCEP' }).setRequestFail(function (r) {

        if (r.status == 404 || r.status == 0) {
            this._res = { errors: ['Não foi localizado nenhum CEP com estas informações.'] };
        } else {
            this._res = { errors: ['Houve um erro na comunicação com o servidor. Tente novamente.'] };
        }

        this.showErrors();
    }).setBeforeSend(function () {
        $(this._form).attr('action', 'https://viacep.com.br/ws/' + $('#conEstado').val() + '/' + $('#conCidade').val() + '/' + $('#conLogradouro').val() + '/json')
        $('#ResCEP').hide();
    }).setOnSuccess(function () {
        data = this._res;
        if (data.length == 1) {
            $('#itxCEP').val(data[0].cep).trigger('blur');
            $('#modalCEP').modal('hide');

        } else if (data.length > 1) {
            $('#ResCEP').show();
            dtCEP = $('#gridCep').DataTable({
                'data': data,
                columns: [
                    { data: 'cep' },
                    { data: 'logradouro' },
                    { data: 'bairro' }
                ],
                fixedColumns: {
                    leftColumns: 0,
                    rightColumns: 1
                },
                "aoColumnDefs": [
                    {
                        "aTargets": 3,
                        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).empty();

                            $(nTd).append(
                                $('<button>').data('cep', oData).text("Selecionar").click(function () {
                                    var dados = $(this).data('cep');
                                    $('#itxCEP').val(dados.cep).trigger('blur');

                                    $('#modalCEP').modal('hide');
                                }).attr('type', 'button').addClass('btn btn-primary')
                            );
                        }
                    },
                ],
            });
        }
    });
})(jQuery);