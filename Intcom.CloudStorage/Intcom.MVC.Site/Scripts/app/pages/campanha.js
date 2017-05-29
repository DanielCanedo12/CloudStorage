(function ($) {
    $("#selInstituicao").change(function () {
        $.getJSON(FO.GLOBAL_URLS.ComboTurmasByProfessor + '?id=' + $(this).val(), function (dados) {
            if (dados.length > 0) {
                var option = '<option value="">Selecione ...</option>';
                $.each(dados, function (i, obj) { option += '<option value="' + obj.id + '">' + obj.value + '</option>'; })
                $('#selTurma').html(option).show();
            } else {
                $('#selTurma').empty().append('<option value="">Instituicão sem turma! Por favor cadastrar turma.</option>');
            }
        });
    });
    $("#selInstituicao").trigger("change");


    $('#ichTodasTurmas').change(function () {
        if ($(this).prop('checked')) {
            $('#divSelTurmas').hide();
            $('#spanTurmasSel').hide();
        } else {
            $('#divSelTurmas').show();
            $('#spanTurmasSel').show();
        }
    }).trigger('change');

    $('#ichEnviarAgora').change(function () {
        if ($(this).prop('checked')) {
            $('#spanDtNow').show();
            $('#spanDtSch').hide();
            $('#divSelDt').hide();
            $('#divDtAviso').hide();
            $('#idtDtAgendamento').val('');
            try {
                $('#idtDtAgendamento').data("DateTimePicker").destroy();
            }
            catch (e) { console.log(e) }
        } else {
            $('#spanDtNow').hide();
            $('#spanDtSch').show();
            $('#divSelDt').show();
            $('#divDtAviso').show();

            if (FO.GLOBAL_VARS.DataHoraCampanha != undefined) {
                $('#idtDtAgendamento').datetimepicker({
                    minDate: moment().add('20', 'minutes'),
                    sideBySide: true,
                    format: 'DD/MM/YYYY HH:mm',
                    locale: "pt-BR",
                    useCurrent: false,
                    defaultDate: moment(FO.GLOBAL_VARS.DataHoraCampanha)
                });
            } else {
                $('#idtDtAgendamento').datetimepicker({
                    minDate: moment().add('20', 'minutes'),
                    sideBySide: true,
                    format: 'DD/MM/YYYY HH:mm',
                    locale: "pt-BR",
                    useCurrent: false,
                    defaultDate: moment().add('20', 'minutes')
                });
            }
        }
    }).trigger('change');
})(jQuery)