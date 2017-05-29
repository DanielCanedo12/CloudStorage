(function ($) {
    var form = $("#frmDependente");
    form.validate({
    });

    form.children("div").steps({
        headerTag: "h4",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex == 0) {
                if ($('#ichNovoDependente:checked').length > 0) {
                    return true;
                }
                else {
                    swal({
                        title: 'Atenção',
                        text: 'Você informar um CPF e marcar a opção "Cadastrar novo dependente" para continuar.',
                        allowOutsideClick: false,
                        type: "warning",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true,
                        html: false
                    });

                    return false;
                }

            }
            else if (newIndex < currentIndex) {
                return true;
            }
            else {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            }
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            $(this).submit();
        }
    });

    // SenfForm para busca de CPF / Responsável
    $('#btCheckCPF').click(function () {
        $('#ResDep').hide();
        $('#divAceitoCadastro').hide();
        $('#gridDep').hide()
        $('#errMensagem').hide();
        $('#ichNovoDependente').attr('checked', false);

        $(this).attr('disabled', 'disabled').addClass('whirl traditional');

        $.ajax(FO.GLOBAL_URLS.ValidaResponsavel, {
            data: { cpf: $('#itxCpf').val() }
        }).done(function (data) {
            if (!data.errors && data.Nome) {
                $('#ResDep').show();
                $('#divAceitoCadastro').show();

                $('#pNomeResponsavel').text(data.NomeCompleto);
                $('#PessoaId').val(data.IdPessoa);

                if (data.Dependentes.length) {
                    $('#gridDep').show().DataTable({
                        'dom': 'tr',
                        'data': data.Dependentes,
                        columns: [
                            { data: 'Dependente.NomeCompleto' },
                        ]
                    });
                } else {
                    $('#errMensagem').show();
                }
            } else {
                if (!data.errors) {
                    data = { errors: { cpf: "Não foi possível fazer a consulta. Tente novamente." } };
                }
                swal({
                    title: 'Atenção',
                    text: data.errors.cpf,
                    allowOutsideClick: false,
                    type: "warning",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    html: false
                });
            }

        }).always(function () {
            $('#btCheckCPF').attr('disabled', false).removeClass('whirl traditional');
        });
    });
    
    $('#ichMesmoEndereco').change(function () {
        if ($('#ichMesmoEndereco:checked').length) {
            $('#itxCEP, #itxNumero, #itxComplemento, #btModalCEP').attr('disabled', 'disabled');
        }
        else {
            $('#itxCEP, #itxNumero, #itxComplemento, #btModalCEP').attr('disabled', false);
        }
    });

    $("#itxCEP").blur(function () {
        $.getJSON('http://api.postmon.com.br/v1/cep/' + $(this).val().replace('-', ''), function (dados) {

            $('#itxCidade').val(dados.cidade);
            $('#itxEstado').val(dados.estado);
            $('#itxEndereco').val(dados.logradouro + ' - ' + dados.bairro);
            $('#itxComplemento').val("");
            $('#itxNumero').val("");

        }).fail(function () {

            $('#itxCEP').addClass("input-validation-error");

            $('#itxCidade').val("");
            $('#itxEstado').val("");
            $('#itxEndereco').val("");
            $('#itxComplemento').val("");
            $('#itxNumero').val("");
        })
    });

    new SendForm({ frm: '#frmDependente', bt: 'button.finish' });
})(jQuery)