(function ($) {
    new SendForm({ frm: '#frm' });

    function calculateAge(birthMonth, birthDay, birthYear) {
        todayDate = new Date();
        todayYear = todayDate.getFullYear();
        todayMonth = todayDate.getMonth();
        todayDay = todayDate.getDate();
        age = todayYear - birthYear;

        if (todayMonth < birthMonth - 1) {
            age--;
        }

        if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
            age--;
        }
        return age;
    }
    $(document).ready(function () {
        $("#selInstituicao").change(function () {
            $('#errMensagem').hide();
            $('#gridDep').hide();
            if ($(this).val() !== "") {
                $('#dvTurma').addClass('whirl traditional');
                $.getJSON(FO.GLOBAL_VARS.UrlComboInst + '?id=' + $(this).val(), function (dados) {
                    if (dados.length > 0) {
                        var option = '<option value="">Selecione ...</option>';
                        $.each(dados, function (i, obj) { option += '<option value="' + obj.IdTurma + '">' + obj.Nome + '</option>'; })
                        $('#selTurma').html(option).show();
                    } else {
                        $('#selTurma').empty().append('<option value="">Instituicão sem turma! Por favor cadastrar turma.</option>');
                    }
                }).always(function () {
                    $('#dvTurma').removeClass('whirl traditional');
                });
            }
        });


        $("#selInstituicao").trigger("change");

        $("#selTurma").change(function () {
            if ($(this).val() !== "") {
                $('#ResDep').show();
                $('#ResDep').addClass('whirl traditional');
                $('#errMensagem').hide();
                $('#gridDep').hide();
                $.getJSON(FO.GLOBAL_VARS.UrlPendentesTurma + '?id=' + $(this).val(), function (data) {
                    if (data.length > 0) {
                        $('#errMensagem').hide();

                        $('#gridDep').show().DataTable({
                            'dom': 'tr',
                            'data': data,
                            columns: [
                                { data: 'Pessoa.NomeCompleto' },
                                { data: 'Pessoa.DataNascimento' },
                                { data: 'Turno.Nome' },
                                { data: null, orderable: false }
                            ],
                            "aoColumnDefs": [{
                                "aTargets": [3],
                                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                    $(nTd).empty();
                                    var be =
                                        $('<label class="switch switch-sm"><input name="Alunos[' + iRow + '].IdPessoa" type="checkbox" value="' + oData.Pessoa.IdPessoa + '"><span></span></label>');
                                    $(nTd).html(be);
                                }
                            }, {
                                "aTargets": [1],
                                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                    $(nTd).empty();
                                    var date = oData.Pessoa.DataNascimento.replace("T", " ");
                                    var dataNascimento = new Date(date);
                                    var idade = calculateAge(dataNascimento.getMonth(), dataNascimento.getDay(), dataNascimento.getFullYear());
                                    $(nTd).html(idade);
                                }
                            }],
                        });
                    } else {
                        $('#ResDep').find('input[type=checkbox]').each(function () { $(this).prop('checked', false) });
                        $('#gridDep').hide();
                        $('#ResDep').hide();
                        $('#errMensagem').show();
                    }
                }).always(function () { $('#ResDep').removeClass('whirl traditional'); });
            } else {
                $('#ResDep').find('input[type=checkbox]').each(function () { $(this).prop('checked', false) });
                $('#ResDep').hide();
                $('#gridDep').hide();
                $('#errMensagem').hide();
            }
        });
    });
})(jQuery);