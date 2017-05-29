/* ----------------- utils.js ------------------------------------------------------*/

/* retorna se o <input type="date" /> é suportado pelo browser */
FO.GLOBAL_FUNCS.checkDateInput = function () {
    var input = document.createElement('input');
    input.setAttribute('type', 'date');

    var notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);

    return (input.value !== notADateValue);
};

FO.GLOBAL_FUNCS.nl2br = function (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

PeriodicalExecuter = (function (callback, frequency) {
    this.registerCallback = function () {
        this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
    };

    this.execute = function () {
        this.callback(this);
    }

    this.stop = function () {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    };

    this.onTimerEvent = function () {
        if (!this.currentlyExecuting) {
            try {
                this.currentlyExecuting = true;
                this.execute();
                this.currentlyExecuting = false;
            } catch (e) {
                this.currentlyExecuting = false;
                throw e;
            }
        }
    };

    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
});

(function (window, document, $, undefined) {

    if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

    $(function () {

        // Restore body classes
        // ----------------------------------- 
        var $body = $('body');
        new StateToggler().restoreState($body);

        // enable settings toggle after restore
        $('#chk-fixed').prop('checked', $body.hasClass('layout-fixed'));
        $('#chk-collapsed').prop('checked', $body.hasClass('aside-collapsed'));
        $('#chk-boxed').prop('checked', $body.hasClass('layout-boxed'));
        $('#chk-float').prop('checked', $body.hasClass('aside-float'));
        $('#chk-hover').prop('checked', $body.hasClass('aside-hover'));

        // When ready display the offsidebar
        $('.offsidebar.hide').removeClass('hide');

    }); // doc ready

    $(document).ajaxComplete(function (event, xhr, settings) {
        if (xhr.status == 403 && xhr.responseJSON && xhr.responseJSON.needLogin) {
            try {
                event.stopPropagation();
            }
            catch (e) { }

            document.location.href = FO.GLOBAL_URLS.Login;
        }
        if (xhr.status == 403 && xhr.responseJSON && xhr.responseJSON.redirect) {
            try {
                event.stopPropagation();
            }
            catch (e) { }

            document.location.href = xhr.responseJSON.redirect;
        }
    });

})(window, document, window.jQuery);