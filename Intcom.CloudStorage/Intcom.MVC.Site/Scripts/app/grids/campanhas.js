FO.GLOBAL_FUNCS.GridCampanhaCompleto = function () {
    return '<div class="text-green text-bold">COMPLETO</div>';
};

FO.GLOBAL_FUNCS.GridCampanhaAtualizaPorcentagem = function (node)
{
    new PeriodicalExecuter($.proxy(function (pe) {
        pe.stop();

        if ($(this.destino)) {

            $.get({
                url: FO.GLOBAL_VARS.UrlGetProcesso + '/' + $(this.destino).attr('id').replace('p', ''),
                data: { uncache: (new Date()).getTime() },
                success: $.proxy(function (data) {
                    if (data.status == 2) {
                        $(this.destino).parent().html(FO.GLOBAL_FUNCS.GridCampanhaCompleto());
                    } else {
                        /* remove a class anterior */
                        var p = $(this.destino).attr('data-label');
                        p = parseInt(p.replace('%', ''));

                        $(this.destino).removeClass('radial-bar-' + p);

                        /* nova porcentagem */
                        var d5 = data.processo;
                        while (d5 % 5 != 0) {
                            d5--;
                        }

                        $(this.destino).addClass('radial-bar-' + d5).attr('data-label', data.processo + '%');

                        // $(this.destino).sparkline();
                        if (data.processo < 100) {
                            FO.GLOBAL_FUNCS.GridCampanhaAtualizaPorcentagem(this.destino);
                        } else {
                            $(this.destino).parent().html(FO.GLOBAL_FUNCS.GridCampanhaCompleto());
                        }
                    }
                }, { 'destino': this.destino })
            });
        }

    }, { 'destino': node }), 1);
};

FO.GLOBAL_FUNCS.RenderProgresso = function (data, type, full, meta) {
    if (!full.Deletavel) {
        if (full.Status == 0) {
            return 'Aguardando o início do envio';
        } else if (full.Status == 2) {
            return FO.GLOBAL_FUNCS.GridCampanhaCompleto();
        } else {
            return '<div id="p' + full.IdCampanha + '" data-sparkline="" data-label="0%" class="radial-bar radial-bar-0 radial-bar-sm"></div>';
        }
    } else {
        return 'Aguardando agendamento';
    }
};

(function ($) {
    $('#grid').on('draw.dt', function () {
        $('[data-sparkline]').each(initSparkLine);

        function initSparkLine() {
            FO.GLOBAL_FUNCS.GridCampanhaAtualizaPorcentagem($(this));
        }
    });
})(jQuery);