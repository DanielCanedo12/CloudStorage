$(document).ready(function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaDay'
        },
        timeFormat: 'H:mm',
        editable: false,
        eventLimit: true,
        lang: 'pt-br',
        forceEventDuration: false,
        allDaySlot: false,
        events: {
            url: FO.GLOBAL_VARS.UrlEventos,
            error: function () {
                $('#script-warning').show();
            },
            cache: true
        },
        eventRender: function (event, element, c) {
            if (event.tipo == 10) {
                element.addClass('entrada').find('.fc-time').before('<span class="fa fa-arrow-left"></span>');
            } else if (event.tipo == 11) {
                element.addClass('saida').find('.fc-time').before('<span class="fa fa-arrow-right"></span>');
            }

            /*if (c.intervalUnit == "week") {
                if (event.tipo == 10) {
                    element.addClass('fc-short');
                } else if (event.tipo == 11) {
                    element.addClass('fc-short');
                }
            }*/

            if (c.intervalUnit == "day" || c.intervalUnit == "week") {
                element.addClass('fc-short').addClass('fixWidth');
            }

            element.attr('href', 'javascript:void(0);').click($.proxy(function () {

                $('#detalheEvento').on('show.bs.modal', $.proxy(function () {
                    var dt = new Date(this.event.start);
                    var modal = $('#detalheEvento');
                    modal.find('.nome').text(this.event.title);
                    modal.find('.hora').text(
                        moment(this.event.start).format('DD/MM/YYYY HH:mm:ss')
                    );
                    modal.find('.instituicao').text(this.event.instituicao);

                    modal.find('.acao').text(event.tipo == 10 ? 'entrada' : 'saída');

                }, { 'event': event })).modal('show');

            }, { 'event': event }));
        },
        loading: function (bool) {
            if (bool) {
                $('#calendar .fc-view-container').append('<div class="dataTables_processing" id="grid_processing" style="display: block;"><span class="whirl traditional"></span></div>');
            }
            else {
                $('#grid_processing').remove();
            }
        }
    });
});