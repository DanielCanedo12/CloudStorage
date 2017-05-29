(function ($) {
    $(document).ready(function () {
        $("#selInstituicao").bind('change', function () {
            $.getJSON(FO.GLOBAL_URLS.ComboPeriodos + '?id=' + $(this).val(), function (dados) {
                if (dados.length > 0) {
                    var option = '<option value="">Selecione ...</option>';
                    $.each(dados, function (i, obj) { option += '<option value="' + obj.IdPeriodo + '">' + obj.Nome + '</option>'; })
                    $('#selPeriodo').html(option).show();
                } else {
                    $('#selPeriodo').empty().append('<option value="">Instituicão sem turma! Por favor cadastrar Período.</option>');
                }
            });

            $.getJSON(FO.GLOBAL_URLS.ComboDisciplinas + '?id=' + $(this).val(), function (dados) {
                if (dados.length > 0) {
                    var option = '<option value="">Selecione ...</option>';
                    $.each(dados, function (i, obj) { option += '<option value="' + obj.IdDisciplina + '">' + obj.Nome + '</option>'; })
                    $('#selDisciplina').html(option).show();
                } else {
                    $('#selDisciplina').empty().append('<option value="">Instituicão sem disciplina! Por favor cadastrar disciplina.</option>');
                }
            });
        });
    });
 //   $("#selInstituicao").trigger("change");

    var form = $("#frmTurma");

    //$(function () {
        form.validate({
            errorPlacement: function errorPlacement(error, element) { element.before(error); },
            rules: {}
        });
    //});

    form.steps({
        headerTag: "h4",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        enableCancelButton: true,
        onStepChanging: function (event, currentIndex, newIndex) {
            if (newIndex < currentIndex) {
                return true;
            } else {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            }
        },
        onCanceled: function () {
            document.location.href = FO.GLOBAL_URLS.Turmas;
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            var dados = [];
            var f = $(this);

            try {
                f.children('.iptHiddenQuadroHoario').remove();
            } catch (e) { }

            var d = $('<div>').hide().addClass('iptHiddenQuadroHoario');

            $.each(table.data(), function (k, v) {
                with (d) {
                    append($('<input type="hidden" name="quadroHorarios[' + k + '][HoraFinal]" /> ').val(v.HoraFinal));
                    append($('<input type="hidden" name="quadroHorarios[' + k + '][HoraInicial]" />').val(v.HoraInicial));

                    if (v.Domingo != null && v.Domingo.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Domingo][IdPessoa]" />').val(v.Domingo.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Domingo][IdDisciplina]" />').val(v.Domingo.IdDisciplina));
                    }

                    if (v.Segunda != null && v.Segunda.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Segunda][IdPessoa]" />').val(v.Segunda.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Segunda][IdDisciplina]" />').val(v.Segunda.IdDisciplina));
                    }

                    if (v.Terca != null && v.Terca.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Terca][IdPessoa]" />').val(v.Terca.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Terca][IdDisciplina]" />').val(v.Terca.IdDisciplina));
                    }

                    if (v.Quarta != null && v.Quarta.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Quarta][IdPessoa]" />').val(v.Quarta.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Quarta][IdDisciplina]" />').val(v.Quarta.IdDisciplina));
                    }

                    if (v.Quinta != null && v.Quinta.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Quinta][IdPessoa]" />').val(v.Quinta.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Quinta][IdDisciplina]" />').val(v.Quinta.IdDisciplina));
                    }

                    if (v.Sexta != null && v.Sexta.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Sexta][IdPessoa]" />').val(v.Sexta.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Sexta][IdDisciplina]" />').val(v.Sexta.IdDisciplina));
                    }

                    if (v.Sabado != null && v.Sabado.IdDisciplina != null) {
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Sabado][IdPessoa]" />').val(v.Sabado.IdPessoa));
                        append($('<input type="hidden" name="quadroHorarios[' + k + '][Sabado][IdDisciplina]" />').val(v.Sabado.IdDisciplina));
                    }
                }
            });
            f.append(d).submit();
        },
        labels: {
            cancel: "Cancelar",
            finish: "Finalizar",
            next: "Próximo",
            previous: "Anterior"
        }
    });

    new SendForm({ frm: '#frmTurma', bt: 'button.finish' });

    $('#btCheckCPF').associarPessoa({
        validarResponsavel: FO.GLOBAL_URLS.ValidarResponsavel,
        before: function () {
            professorId = null;
            $('#pNomeResponsavel').empty();
        },
        consultaSuccess: function (data) {
            IdProfessor = data.IdPessoa;

            $('#divResResponsavel').show();
            $('#pNomeResponsavel').text(data.Nome);
        }
    });

    /* define as confs do DataTable */
    table = $('#tblHorarios').DataTable({
        dom: 't',
        paging: false,
        ordering: true,
        serverSide: false,
        pageLength: 100,
        language: {
            emptyTable: 'Adicione os horários da turma utilizando o formulário acima.'
        },
        rowId: 'IdQuadroHorario',
        orderFixed: [0, 'asc'],
        columns: [
            { data: null },
            { data: 'Domingo', orderable: false },
            { data: 'Segunda', orderable: false },
            { data: 'Terca', orderable: false },
            { data: 'Quarta', orderable: false },
            { data: 'Quinta', orderable: false },
            { data: 'Sexta', orderable: false },
            { data: 'Sabado', orderable: false },
        ],
        aoColumnDefs: [{
            aTargets: 0,
            mRender: function (data, type, rowData, full) {
                var cell = table.cell(full.row, full.col);
                var cData = cell.data();

                return cData.HoraInicial.substr(0, 5) + ' - ' + cData.HoraFinal.substr(0, 5);
            }
        },
        {
            aTargets: [1, 2, 3, 4, 5, 6, 7],
            mRender: function (data, type, rowData, full) {
                var cell = table.cell(full.row, full.col);
                var cData = cell.data();

                data = '';

                if (cData != null && (cData.PessoaNome || cData.DisciplinaNome)) {
                    data = cData.PessoaNome + (cData.DisciplinaNome ? '<br />' + cData.DisciplinaNome : '');
                }

                if (data && !$('a', cell.node()).size()) {
                    var fc = $.proxy(function () {
                        /* ao excluir um horário, exibe um sweet alert, para confirmar a exclusão */
                        swal({
                            title: 'Atenção',
                            text: 'Deseja realmente apagar este "Tempo de aula"?',
                            allowOutsideClick: false,
                            showCancelButton: true,
                            type: "warning",
                            confirmButtonText: "Ok",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true,
                            html: false
                        }, $.proxy(function () {
                            this.cell.data(null);

                            /* verifica se a linha ainda temalgum dado. caso contrário, a remove também.**/
                            var empty = true;

                            $.each(this.cell.row().data(), function (k, v) {
                                if (k != 'id' && k != 'intervalo' && v) {
                                    empty = false;
                                }
                            });

                            if (empty) {
                                this.cell.row().remove();
                            }

                            table.draw();

                        }, { 'cell': this.cell }));

                    }, { 'cell': cell });

                    $(cell.node()).append(
                        $('<a title="Remover este tempo" class="pull-right" href="#"><em class="fa fa-times"></em></a>').click(fc)
                    );
                }

                return data;
            }
        }]
    });

    if (FO.GLOBAL_VARS.QuadroHoarios) {
        table.rows.add(FO.GLOBAL_VARS.QuadroHoarios).draw();
    }

    var professor = null;

    /* tipo de tempo a ser adicionado [aula, intervalo, ...] */
    $('#selTipo').change(function () {
        switch ($(this).val()) {
            case "1":
                $('#divSelProfessor').show().find(':input').val('');
                $('#pNomeResponsavel').html('<em>Procure uma pessoa utilizando o campo acima.</em>');
                break;
            case "2":
                $('#divSelProfessor').hide();
                break;
        }
    });

    $('#btAdd').click(function () {
        var errors = [];

        switch ($('#selTipo').val()) {
            case "1":
                if (IdProfessor == null) {
                    errors.push('Você precisa selecionar um professor.');
                }
                break;
            case "2":
                $('#divSelProfessor').hide();
                break;
        }

        if (errors.length) {
            swal({
                title: 'Atenção',
                text: errors.join('<br />'),
                allowOutsideClick: false,
                type: "warning",
                confirmButtonText: "Ok",
                closeOnConfirm: true,
                html: false
            });
        } else {
            if (!$('#itmDe').val() || !$('#itmAte').val()) {
                swal({
                    title: 'Atenção',
                    text: 'Selecione o horário de inicio e fim.',
                    allowOutsideClick: false,
                    type: "warning",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    html: false
                });

                return;
            }
            var time = ($('#itmDe').val() + $('#itmAte').val()).replace(/\:/g, '');
            var tr = table.row('#' + time);
            var data;

            if (!tr.length) {
                data = {
                    IdQuadroHorario: time,
                    HoraInicial: $('#itmDe').val() + ':00',
                    HoraFinal: $('#itmAte').val() + ':00',
                    Domingo: { PessoaNome: '', DisciplinaNome: '' },
                    Segunda: { PessoaNome: '', DisciplinaNome: '' },
                    Terca: { PessoaNome: '', DisciplinaNome: '' },
                    Quarta: { PessoaNome: '', DisciplinaNome: '' },
                    Quinta: { PessoaNome: '', DisciplinaNome: '' },
                    Sexta: { PessoaNome: '', DisciplinaNome: '' },
                    Sabado: { PessoaNome: '', DisciplinaNome: '' }
                };

                table.row.add(data).draw();

                tr = table.row('#' + time);
            } else {
                data = tr.data();
            }

            /*
            Para que o datatable consiga fazer a ordenação corretamente,
            os dados precisam ser inseridos como "objetos". Depois, o DataTable precisa ser
            redesenhado (draw())
            */
            var conteudo;

            switch ($('#selTipo').val()) {
                case "1":
                    conteudo = { PessoaNome: $('#pNomeResponsavel').text(), DisciplinaNome: $('#selDisciplina option:selected').text(), IdPessoa: IdProfessor, IdDisciplina: $('#selDisciplina').val() };
                    break;
                case "2":
                    conteudo = { PessoaNome: 'INTERVALO', DisciplinaNome: '' };
                    break;
            }

            data[$('#selDiaSemana').val()] = conteudo;

            tr.data(data);
            tr.column(0).order('asc').draw();
        }
    });

    if (!FO.GLOBAL_FUNCS.checkDateInput()) {
        $('#itmDe, #itmAte').datetimepicker({
            widgetPositioning: {
                horizontal: 'left'
            },
            format: 'HH:mm',
            locale: "pt-BR"
        });
    }
})(jQuery);