(function ($) {
    new SendForm({ frm: '#frm' });

    $("#selInstituicao").change(function () {
        $.getJSON(FO.GLOBAL_URLS.ComboInstituicao + '?id=' + $(this).val(), function (dados) {
            if (dados.length > 0) {
                var option = '<option value="">Selecione ...</option>';
                $.each(dados, function (i, obj) { option += '<option value="' + obj.IdPeriodo + '">' + obj.Nome + '</option>'; })
                $('#selPeriodo').html(option).show();
            } else {
                $('#selPeriodo').empty().append('<option value="">Instituicão sem período letivo cadastrado. Por favor cadastrar antes da turma</option>');
            }
        })
    });
    $("#selInstituicao").trigger("change");

    $("#btCheckCPF").click(function () {
        $.getJSON(FO.GLOBAL_URLS.ValidaResponsavel + '?cpf=' + $("#itxCpf").val(), function (data) {

            if (data != null && data != undefined && !data.errors) {

                $('#divNomeResponsavel').show();
                $('#MarcarSiMesmo').show();
                $('#rdMarcarSiMesmo').val(data.IdPessoa);
                $('#errMensagem').hide();
                $('#ResDep').show();
                $('#pNomeResponsavel').text(data.NomeCompleto);

                if (data.Dependentes != null && data.Dependentes != undefined && data.Dependentes.length > 0) {
                    $('#gridDep').show().DataTable({
                        'data': data.Dependentes,
                        'dom': 'tr',
                        columns: [
                            { data: 'Dependente.NomeCompleto' },
                            { data: null, orderable: false }

                        ],
                        "aoColumnDefs": [{
                            "aTargets": [1],
                            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                $(nTd).empty();
                                var be = $('<label class="switch switch-sm"><input name="IdPessoa" type="radio" value="' + oData.Dependente.IdPessoa + '"><span></span></label>');
                                $(nTd).html(be);
                            }
                        }],
                    });
                }
            } else {
                // Desmarco todos radio selecionados anteriormente.
                $('#ResDep').find('input[type="radio"]').each(function () { $(this).prop('checked', false) });
                $('#divNomeResponsavel').hide();
                $('#MarcarSiMesmo').hide();
                $('#gridDep').hide();
                $('#errMensagem').show();
            }

        })
    });
})(jQuery);