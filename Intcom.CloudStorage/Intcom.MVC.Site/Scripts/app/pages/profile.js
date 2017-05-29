FO.GLOBAL_FUNCS.AnexarComentario = function (k, v, invertido) {
    var day;
    var id;
    var addAtTop = false;

    if (moment(v.DataCadastro).startOf('day').format('L') == moment().startOf('day').format('L')) {
        id = day = "Hoje";
        hora = moment(v.DataCadastro).locale('pt-br').fromNow()

    } else if (moment(v.DataCadastro).startOf('day').format('L') == moment().subtract(1, 'days').startOf('day').format('L')) {
        id = day = "Ontem";
        hora = moment(v.DataCadastro).locale('pt-br').format('LT') + 'h';
    } else {
        day = moment(v.DataCadastro).locale('pt-br').startOf('day').format('L');
        id = 'Li' + day.replace(/\//g, '');
        hora = moment(v.DataCadastro).locale('pt-br').format('LT') + 'h';
    }
    v.textoComentarios = v.QtdRespostas + ' ' + (v.QtdRespostas > 1 ? 'Respostas' : 'Resposta');
    v.day = id;
    v.Texto = FO.GLOBAL_FUNCS.nl2br(v.Texto);
    v.Hora = hora.replace(/:00$/, '');

    var comentario = $(tmpl("tmpl-tl-comentario", v));

    //administração de curtidas
    comentario.find('a.iCurti').
       data("perfilpost", v).
       click(function () {

           var idPost = $(this).data("idperfilpost");
           if (!$(this).hasClass('whirl')) {
               $(this).addClass('whirl traditional');
               $.ajax({
                   url: FO.GLOBAL_VARS.UrlCurtiPost,
                   data: { 'idPost': idPost },
                   type: 'POST',
                   context: $(this)
               }).success(function (data) {
                   var perfil = $(this).data('perfilpost');

                   if (data == 1) {
                       $(this).find('em').removeClass('fa-heart-o').addClass('fa-heart');
                       perfil.EuCurti = true;
                       $(this).data('perfilpost', perfil);
                   } else {
                       $(this).find('em').removeClass('fa-heart').addClass('fa-heart-o');
                       perfil.EuCurti = false;
                       perfil.PerfilCurtidas = $.grep(perfil.PerfilCurtidas, function (a) { return a.IdPessoa != perfil.MeuId });
                       $(this).data('perfilpost', perfil);
                   }
               }).always(function () {
                   $(this).removeClass('whirl traditional');
               });
           }
       }).on({
           'mouseenter': function () {
               var perfil = $(this).data('perfilpost');
               if (perfil.PerfilCurtidas.length > 0 || perfil.EuCurti) {
                   $(this).tooltip({
                       container: 'body',
                       html: true,
                       trigger: 'manual',
                       title: function () {
                           var strTooltip = $('<ul>').addClass("list-unstyled");

                           if (perfil.EuCurti) {
                               strTooltip.append($('<li>').addClass('ttpVoce').html('Você'));
                           }
                           $.each(perfil.PerfilCurtidas, function (k, ve) {
                               if (perfil.MeuId != ve.IdPessoa)
                                   strTooltip.append($('<li>').html(ve.Pessoa.NomeCompleto));
                           });
                           return strTooltip
                       }
                   }).tooltip('show');
               }
           },
           'mouseleave': function () {
               $(this).tooltip('hide');
           }
       });

    // fim administração de curtidas

    //administração de respostas
    comentario.find('a.iComentarios').
       data("perfilpost", v).
        click(function () {
            var idPost = $(this).data("idperfilpost");
            var pagina = $(this).data("pagina");
            var qtdRespostas = $(this).data("qtdrespostas");

            if (!$(this).hasClass('whirl') && (Math.ceil(qtdRespostas / 5) - 1) >= pagina) {
                $(this).addClass('whirl traditional');
                $.ajax({
                    url: FO.GLOBAL_VARS.UrlPostRespostas,
                    data: { 'idPost': idPost, 'pagina': pagina },
                    type: 'POST',
                    context: $(this)
                }).success(function (data) {
                    comentario.find('.maisComments').remove();
                    if (data.length > 0) {
                       
                        $.each(data, function (k, v) {
                            var filhos = comentario.find('ul.listaDeRespostas').children('li');
                            var existe = false;
                            for (i = 0; i < filhos.length ; i++) {
                                if ($(filhos[i]).data('idperfilresposta') == v.IdPerfilPostResposta) {
                                    existe = true;
                                }
                            }
                            if (!existe) {
                                v.data = moment(v.DataCadastro).startOf('minute').locale('pt-br').fromNow();
                                var resposta = $(tmpl("tmpl-tl-respostas", v));
                                resposta.find('.excluirResposta').click(function () {
                                    swal({
                                        title: 'Atenção',
                                        text: 'Deseja realmente excluir esta resposta?',
                                        allowOutsideClick: false,
                                        type: "warning",
                                        confirmButtonText: "Ok",
                                        cancelButtonText: "Cancelar",
                                        showCancelButton: true,
                                        closeOnConfirm: true,
                                        confirmButtonClass: "btn-danger",
                                        html: false
                                    }, $.proxy(function () {
                                        $.ajax({
                                            url: FO.GLOBAL_VARS.UrlDelResposta,
                                            method: 'POST',
                                            data: { 'idResposta': this.v.IdPerfilPostResposta }
                                        }).success($.proxy(function (data) {
                                            this.resposta.remove();
                                            var qtd = $(comentario.find('a.iComentarios')).data('qtdrespostas');
                                            qtd--;
                                            $(comentario.find('a.iComentarios')).data('qtdrespostas', qtd);
                                            if(qtd < 1){
                                                $(comentario.find('a.iComentarios')).hide();
                                            } else if (qtd == 1 ) {
                                                $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> 1 Resposta");
                                            } else {
                                                $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> " + qtd + ' Respostas');
                                            }
                                        }, { 'v': this.v, 'resposta': this.resposta }))
                                    }, { 'v': v, 'resposta': resposta }));
                                });

                                comentario.find('ul.listaDeRespostas').append(resposta);
                            }

                        });
                        tinysort(comentario.find('ul.listaDeRespostas').children('li'), { data: 'idperfilresposta', natural: true });

                        pagina = ++pagina;
                        $(this).data("pagina", pagina);
                        if ((Math.ceil(qtdRespostas / 5) - 1) >= pagina) {
                            comentario.find('#dvRespostas').append($('<a href="javascript:;">').addClass('link-unstyled maisComments').click(function () { comentario.find('a.iComentarios').trigger('click') }).html('Carregar mais respostas...'));
                        }
                    }
                }).always(function () {
                    $(this).removeClass('whirl traditional');
                });
            }
        });

    comentario.find('.responder').
        keypress(function (e) {
            if (e.which == 13) {
                if ($(this).val() != '') {
                    e.preventDefault();
                    var idPost = $(this).data("idperfilpost");
                    var texto = $(this).val();

                    $(this).attr('disabled', 'disabled');
                    $.ajax({
                        url: FO.GLOBAL_VARS.UrlResponderPost,
                        data: { 'idPost': idPost, 'texto': texto },
                        type: 'POST',
                        context: $(this)
                    }).success(function (dados) {

                        if (dados != false) {
                            var qtd = $(comentario.find('a.iComentarios')).data('qtdrespostas');
                            qtd++;
                            $(comentario.find('a.iComentarios')).data('qtdrespostas', qtd);
                            $(comentario.find('a.iComentarios')).show();

                            if (qtd == 1) {
                                $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> 1 Resposta");
                            } else {
                                $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> " + qtd + ' Respostas');
                            }
                            dados.data = moment(dados.DataCadastro).startOf('minute').locale('pt-br').fromNow();

                            var resposta = $(tmpl("tmpl-tl-respostas", dados));

                            resposta.find('.excluirResposta').click(function () {
                                swal({
                                    title: 'Atenção',
                                    text: 'Deseja realmente excluir esta resposta?',
                                    allowOutsideClick: false,
                                    type: "warning",
                                    confirmButtonText: "Ok",
                                    cancelButtonText: "Cancelar",
                                    showCancelButton: true,
                                    closeOnConfirm: true,
                                    confirmButtonClass: "btn-danger",
                                    html: false
                                }, $.proxy(function () {
                                    $.ajax({
                                        url: FO.GLOBAL_VARS.UrlDelResposta,
                                        method: 'POST',
                                        data: { 'idResposta': this.v.IdPerfilPostResposta }
                                    }).success($.proxy(function (data) {
                                        this.resposta.remove();
                                        var qtd = $(comentario.find('a.iComentarios')).data('qtdrespostas');
                                        qtd--;
                                        $(comentario.find('a.iComentarios')).data('qtdrespostas', qtd);
                                        if(qtd < 1){
                                            $(comentario.find('a.iComentarios')).hide();
                                        } else if (qtd == 1 ) {
                                            $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> 1 Resposta");
                                        } else {
                                            $(comentario.find('a.iComentarios')).html("<em class='fa fa-comments'></em> " + qtd + ' Respostas');
                                        }
                                    }, { 'v': this.v, 'resposta': this.resposta }))
                                }, { 'v': dados, 'resposta': resposta }));
                            });

                            comentario.find('ul.listaDeRespostas').append(resposta);
                        }
                    }).always(function () {
                        $(this).val('');
                        $(this).removeAttr('disabled');
                    });
                }

                return false;
            }
        });


    //fim administração de respostas

    // excluir comentario
    comentario.find('.aDelComentario').click(function () {
        swal({
            title: 'Atenção',
            text: 'Deseja realmente excluir este post?',
            allowOutsideClick: false,
            type: "warning",
            confirmButtonText: "Ok",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonClass: "btn-danger",
            html: false
        }, $.proxy(function () {
            $.ajax({
                url: FO.GLOBAL_VARS.UrlDelPost,
                method: 'POST',
                data: { 'idPost': this.v.IdPerfilPost }
            }).success($.proxy(function (data) {

                if ($('li[data-day=' + this.comentario.data('day') + ']').size() == 1) {
                    $('#' + this.comentario.data('day')).remove();
                }

                this.comentario.remove();

            }, { 'v': this.v, 'comentario': this.comentario }))
        }, { 'v': v, 'comentario': comentario }));
    });

    // cria um "separador" (area que exbide a data (dia/mes/ano ou "ontem" ou "hoje)"
    var separador = $('#' + id);

    if (!separador.size()) {
        separador = $(tmpl("tmpl-tl-data", { Data: day, Id: id }));

        if (id == "Hoje") {
            $('#timeline').prepend(
                separador
            );
        } else {
            $('#timelineEnd').before(
                separador
            );
        }
        addAtTop = true;
    }

    if (addAtTop == true || (typeof invertido != 'undefined' && invertido)) {
        separador.after(comentario);
    } else {
        $('li[data-day=' + id + ']').last().after(comentario);
    }

    if (typeof invertido == 'undefined' || !invertido) {
        var ladoEsq = $('li[data-day=' + id + '].timeline-normal');
        var ladoDir = $('li[data-day=' + id + '].timeline-inverted');
        var lado;
        var tlInvertido;

        // se existir um lado esquerdo e não existir o direito
        // ou
        // se existirem ambos os lados e o esquerdo for maior que direito
        if ($('li[data-day=' + id + ']').size() != 1 && ((ladoEsq.size() && !ladoDir.size()) || (ladoEsq.size() && ladoDir.size() && ladoEsq.last().offset().top >= ladoDir.last().offset().top + parseFloat(ladoDir.last().height())))) {
            // seta direito
            comentario.removeClass('timeline-normal').addClass('timeline-inverted');
            comentario.find('.popover').removeClass('left').addClass('right');
        }
    } else {
        $('li[data-day=' + id + ']').each(function (k, v) {
            if (k == 0) {
                return;
            }

            v = $(v);

            if (!v.hasClass('timeline-normal')) {
                v.addClass('timeline-normal').removeClass('timeline-inverted');
                v.find('.popover').removeClass('rigth').addClass('left');
            } else {
                v.removeClass('timeline-normal').addClass('timeline-inverted');
                v.find('.popover').removeClass('left').addClass('rigth');
            }
        });
    }
};

FO.GLOBAL_FUNCS.GetPerfilComments = function () {
    FO.GLOBAL_VARS.ProfileCommentAjaxing = true;

    $('#loadingComments').show();

    $.ajax(FO.GLOBAL_VARS.UrlProfilePosts, {
        method: 'POST',
        data: { pagina: FO.GLOBAL_VARS.ProfileCommentPage }
    }).success(function (result) {
        if (result && result.length > 0) {
            $.each(result, FO.GLOBAL_FUNCS.AnexarComentario);
            FO.GLOBAL_VARS.ProfileCommentPage++;
        }
        else {
            FO.GLOBAL_VARS.ProfilePagination = false;
        }

    }).always(function () {
        FO.GLOBAL_VARS.ProfileCommentAjaxing = false;
        $('#loadingComments').hide();
    });
};

$(document).ready(function () {
    FO.GLOBAL_VARS.ProfileCommentPage = 0;
    FO.GLOBAL_VARS.ProfileCommentAjaxing = false;
    FO.GLOBAL_VARS.ProfileScrollAnt = 0;
    FO.GLOBAL_VARS.ProfilePagination = true;

    FO.GLOBAL_FUNCS.GetPerfilComments();

    $(window).scroll(function () {
        /* apenas se estiver descendo */
        if (FO.GLOBAL_VARS.ProfileScrollAnt < $(document).scrollTop()) {
            if (
              FO.GLOBAL_VARS.ProfilePagination &&
              $('#timelineEnd').offset().top - $(window).scrollTop() < $(window).height() - 30 &&
              !FO.GLOBAL_VARS.ProfileCommentAjaxing) {

                FO.GLOBAL_FUNCS.GetPerfilComments();
                $('html, body').animate({
                    scrollTop: $("#loadingComments").offset().top
                }, 1000);
            }
        } else if ($('#timelineEnd').offset().top - $(window).scrollTop() > $(window).height() + 40) {
            FO.GLOBAL_VARS.ProfilePagination = true;
        }

        FO.GLOBAL_VARS.ProfileScrollAnt = $(document).scrollTop();
    });





    $('#txaPostMensagem').flexText();

    new SendForm({ frm: '#frmPost' }).setOnSuccess(function () {
        this._res.post.AnimatedScroll = false;

        FO.GLOBAL_FUNCS.AnexarComentario(null, this._res.post, true);

        this._form[0].reset();
        new PeriodicalExecuter(function (pe) {
            pe.stop();
            $('#txaPostMensagem').keyup();
        }, .1);
    });

    $('#aAdiconarAmigo').click(function () {

        var perfilLogado = $(this).data('perfillogado');
        var perfilAtual = $(this).data('perfilatual');

            $.ajax({
                url: FO.GLOBAL_VARS.UrlSolicitarAmizade,
                data: { 'perfilAtual': perfilAtual, 'perfilLogado': perfilLogado },
                method: 'POST'
            }).success(function (data) {
                if (data == true) {
                    $('#aAdiconarAmigo').addClass('animated fadeOut');
                    $('#aAdiconarAmigo').hide();
                } else {
                    $('#aAdiconarAmigo').css('background-color', 'rgba(250,128,114,0.8)');
                }

            }).fail(function () {
                $('#aAdiconarAmigo').css('background-color', 'rgba(250,128,114,0.8)');
            });
    });
});

