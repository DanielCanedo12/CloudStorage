(function ($) {
    new SendForm({ frm: '#frm' }).setBeforeSend(function () {
        var todos_dados = [];

        $('#ResDep tbody').find('tr[role=row]').each(function () {
            var linha =
            {
                idPessoa: $($(this).find('.rateit')[0]).data('idpessoa'),
                presenca: $($(this).find('input[type=checkbox]')[0]).prop('checked') ? true : false,
                justificada: $($(this).find('input[type=checkbox]')[1]).prop('checked') ? true : false,
                tipoJustificativa: $($(this).find('select')[0]).val(),
                avaliacao: $($(this).find('input[type=range]')[0]).val(),
                comentario: $($(this).find('input[type=hidden]')[0]).val(),
            }

            todos_dados.push(linha);
        });

        var hidden = $('<input type=hidden name="Frequencia" />');
        hidden.val(JSON.stringify(todos_dados));
        $(this._form).append(hidden);

        $(this._form).attr('action', '').attr('method', 'post');
        $(this._form).submit();
    });
    $(document).ready(function () {
        $("#selInstituicao").change(function () {
            $('.dvTurma').addClass('whirl traditional');
            $.getJSON(FO.GLOBAL_URLS.ComboTurmasByProfessor + '?id=' + $(this).val(), function (dados) {
                if (dados.length > 0) {
                    var option = '<option value="">Selecione ...</option>';
                    $.each(dados, function (i, obj) { option += '<option value="' + obj.IdProfessorTurma + '">' + obj.Turma.Nome + " - " + obj.Disciplina.Nome + '</option>'; })
                    $('#selTurma').html(option).show();
                } else {
                    $('#selTurma').empty().append('<option value="">Instituicão sem turma! Por favor cadastrar turma.</option>');
                }
            }).always(function () { $('.dvTurma').removeClass('whirl traditional'); });
        });

    });

    $("#selInstituicao").trigger("change");

    var table = $('#gridDep').show().DataTable({
        'dom': 'tr',
        "paging": false,
        'data': [],
        "ordering": false,
        columns: [
            { data: null },
            { data: 'Pessoa.NomeCompleto', width: '40%' },
            { data: null },
            { data: null },
            { data: null },
            { data: null },
            { data: null }
        ],
        "aoColumnDefs": [
            {
                "aTargets": [0],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).empty();
                    var linha = parseInt(iRow) + 1
                    var be = $('<span>' + linha + '</span>');
                    var input = $('<input name="diario[' + oData.IdPessoa + '][comentario]" id="comentario' + oData.IdPessoa + '" type="hidden">');
                    $(nTd).html(be);
                    $(nTd).append(input);
                }
            },
            {
                "aTargets": [2],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).empty();
                    var label = $('<label>').addClass('checkbox c-checkbox c-checkbox-rounded');
                    var span = $('<span>').addClass('fa fa-check');
                    var input = $('<input name="diario[' + oData.IdPessoa + '][presenca]" id="presenca' + oData.IdPessoa + '" type="checkbox" checked="true" value="true">').change(function () {
                        if ($(this).prop('checked')) {
                            $('#justificada' + oData.IdPessoa).prop('checked', false);
                            $('#tipojustificativa' + oData.IdPessoa).hide();
                        }
                    });
                    label.html(input);
                    label.append(span);
                    $(nTd).html(label);
                }
            },
            {
                "aTargets": [3],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).empty();
                    var label = $('<label>').addClass('checkbox c-checkbox c-checkbox-rounded');
                    var span = $('<span>').addClass('fa fa-check');
                    var input = $('<input name="diario[' + oData.IdPessoa + '][justificativa]"  id="justificada' + oData.IdPessoa + '" type="checkbox" value="true">').change(function () {
                        if ($(this).prop('checked')) {
                            $('#presenca' + oData.IdPessoa).prop('checked', false);
                            $('#tipojustificativa' + oData.IdPessoa).show();
                        } else {
                            $('#tipojustificativa' + oData.IdPessoa).hide();
                        }
                    });
                    label.html(input);
                    label.append(span);
                    $(nTd).html(label)
                }
            },
            {
                "aTargets": [4],
                "fnCreatedCell": FO.GLOBAL_FUNCS.fnCreatedCell4,
            },
            {
                "aTargets": [5],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).empty();

                    var be = $('<input type="range" name="diario[' + oData.IdPessoa + '][avaliacao]" min="0" max="5" value="3" step="1" id="backing' + oData.IdPessoa + '" />');
                    var star = $('<div data-IdPessoa="' + oData.IdPessoa + '" data-rateit-value="3" class="rateit" data-rateit-step="1" data-rateit-backingfld="#backing' + oData.IdPessoa + '"></div>');

                    $(nTd).append(be).append(star);
                },
            },
            {
                "aTargets": [6],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).empty();

                    var be = $('<button class="btn btn-sm btn-default" type="button" id="btnComentar' + oData.IdPessoa + '" title="Comentar">').append('<em class="fa fa-edit"></em>');
                    be.click(function () {
                        var tr = $(this).closest('tr');
                        var row = table.row(tr);

                        if (row.child.isShown()) {
                            // This row is already open - close it
                            var obj = row.data();
                            tr.removeClass('shown');
                            row.child.hide();

                        } else {
                            // Open this row
                            var obj = row.data();
                            row.child(format(row.data())).show();
                            tr.addClass('shown');
                            $('#tcomentario' + obj.IdPessoa).val($('#comentario' + obj.IdPessoa).val());
                        }

                        table.draw();
                    });

                    $(nTd).append(be);
                },
            },
        ],
    }).on('draw.dt', function () {
        var tooltipvalues = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo'];
        $('#ResDep').find('.rateit').each(function () { $(this).rateit().bind('over', function (event, value) { $(this).attr('title', tooltipvalues[value - 1]); }) });
        $('#ResDep').find('.rateit-reset').each(function () { $(this).remove() });
    });

    $("#selTurma").change(function () {
        if ($(this).val() !== "") {
            var dtp = $('#datetimepicker').data('DateTimePicker');

            if (dtp) {
                dtp.destroy();
            }

            /* Limpa os dados do DataTable */
            table.rows().remove();

            /* Busca de dias que o professor dá aula, para esta turma para ajustar o data picker */
            $.getJSON(FO.GLOBAL_URLS.ProfessorDiaSemana + '?id=' + $(this).val(), function (data) {

                var arry = [];

                for (i = 0; i <= 6; i++) {
                    if (i != data) {
                        arry.push(i);
                    }
                }

                $('#datepicker').show();

                var ultimaData = new Date().today();

                switch (data) {
                    case 0:
                        ultimaData = new Date().last().sunday();
                        break;
                    case 1:
                        ultimaData = new Date().last().monday();
                        break;
                    case 2:
                        ultimaData = new Date().last().tuesday();
                        break;
                    case 3:
                        ultimaData = new Date().last().wednesday();
                        break;
                    case 4:
                        ultimaData = new Date().last().thursday();
                        break;
                    case 5:
                        ultimaData = new Date().last().friday();
                        break;
                    case 6:
                        ultimaData = new Date().last().saturday();
                        break;
                }

                $('#datetimepicker').datetimepicker({
                    format: 'DD/MM/YYYY',
                    viewMode: 'days',
                    locale: "pt-BR",
                    daysOfWeekDisabled: arry,
                    minDate: new Date((new Date()).getFullYear(), 0, 1),
                    maxDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 31),
                    defaultDate: ultimaData,
                    widgetPositioning: { vertical: 'bottom', horizontal: 'auto' },
                });

            });

            $.getJSON(FO.GLOBAL_URLS.AlunosPorTurma + '?id=' + $(this).val(), function (data) {

                if (data.length > 0) {

                    $('#errMensagem').hide();
                    $('#ResDep').show();
                    $('#gridDep').show();
                    /* Adiciona os novos dados ao DataTable */
                    table.rows.add(data).draw();
                } else {
                    $('#ResDep').find('input[type=checkbox]').each(function () { $(this).prop('checked', true) });
                    $('#gridDep').hide();
                    $('#ResDep').hide();
                    $('#errMensagem').show();
                }
            });
        } else {
            $('#ResDep').find('input[type=checkbox]').each(function () { $(this).prop('checked', true) });
            $('#ResDep').hide();
            $('#gridDep').hide();
            $('#errMensagem').hide();
            $('#datepicker').hide();

        }

    });
    function format(d) {
        var table = $('<table cellpadding="5" cellspacing="" border="0" style="width:100%" class="animated fadeInRight">')
                         .append($('<tr>')
                            .append($('<td class="col-sm-2 control-label" mb>')
                                .html('Comentario:')
                            )
                            .append($('<td>')
                                .html($('<textarea style="width:90%" class="form-control" id="tcomentario' + d.IdPessoa + '" rows="2">'))
                            )
                            .append($('<td>')
                                .html($('<button type="button" class="mb-sm btn btn-success">').html('Salvar').on('click', function () {
                                    $('#comentario' + d.IdPessoa).val($('#tcomentario' + d.IdPessoa).val());
                                    $('#btnComentar' + d.IdPessoa).trigger('click');
                                    $.notify({ message: 'Comentário Salvo!' }, { status: 'success', delay: 2000 });
                                })
                                )
                            )
                            .append($('<td>')
                                   .html($('<button type="button" class="mb-sm btn btn-danger">').html('Cancelar').on('click', function () { $('#btnComentar' + d.IdPessoa).trigger('click'); })
                                    )
                            )
                        );

        return table;
    }
})(jQuery);