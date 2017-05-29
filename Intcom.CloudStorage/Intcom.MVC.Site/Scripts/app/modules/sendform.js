SendForm = (function (param) {
    this._form  = null;
    this._buto  = null;
    this._res   = null;
    this._loadType = null; /* ['default', 'full']  */
    this._loadClass = null;
    this._confirmSend = null;
    this._status = null;
    this._fu = null;

    this._onSuccess = function () {
        return;
    };

    this._beforeSend = function () {
        return true;
    };

    this.validate = function () {
        try
        {
            $(this._form).validate();
            return $(this._form).valid();
        }
        catch (e)
        {
            return true;
        }
    };

    this._on401 = function (r) {
        swal({
            title: 'Atenção',
            text: (this._res && this._res.mensagem ? this._res.mensagem : 'Para executar esta operação, você precisa estar logado.'),
            allowOutsideClick: false,
            type: "warning",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            html: false
        }, $.proxy(function () {
            document.location = this._res.loginUrl
        }, this));

        this.enable();
        return this;
    };

    this._on403 = function (r) {
        swal({
            title: 'Atenção',
            text: (this._res && this._res.mensagem ? this._res.mensagem : 'Você não tem permissão para executar esta ação.'),
            allowOutsideClick: false,
            type: "warning",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            html: false
        });

        this.enable();
        return this;
    };

    this._trataErrors = function () {
        var mensagem = '';

        for (var iptId in this._res.errors) {
            if ($.isArray(this._res.errors[iptId])) {
                $('input[name="' + iptId + '[]"], select[name="' + iptId + '[]"], textarea[name="' + iptId + '[]"], #' + iptId, this._form).addClass('sfError');

                mensagem = '';
                for (var k in this._res.errors[iptId]) {
                    if (this._res.errors[iptId][k] !== true) {
                        mensagem = (mensagem ? mensagem + '\n' : '') + value;
                    }
                }
            } else {
                $('input[name="' + iptId + '"], select[name="' + iptId + '"], textarea[name="' + iptId + '"], #' + iptId, this._form).addClass('sfError');

                if (this._res.errors[iptId] !== true) {
                    mensagem = (mensagem ? mensagem + '\n' : '') + this._res.errors[iptId];
                }
            }
        }

        return mensagem;
    };

    this.setButtons = function (b) {
        this._buto = [];

        if (b) {
            this._buto = $(b);
        } else {
            this._buto = $('.btSubmit, input[type=submit], button[type=submit]', this._form);
        }

        this._buto.each($.proxy(function (k, b) {
            if ($(b).attr('type') != 'submit') {
                $(b).click($.proxy(this.send, this));
            }
        }, this));
        return this;
    };

    this.showErrors = function () {
        var mensagem = this._trataErrors();

        if (this._res.redirect) {
            f = $.proxy(function () {
                document.location = this._res.redirect;
            }, this);
        } else {
            f = $.proxy(function () {
                this.enable();
                $(this._form).trigger('onPostError');
            }, this);
        }

        swal({
            title: 'Erro',
            text: (mensagem ? mensagem : 'Oops. Você não preencheu o formulário corretamente.\nVerifique os campos destacados.'),
            allowOutsideClick: false,
            type: "error",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            confirmButtonClass: "btn-danger",
            html: false
        }, f);

        return this;
    };

    this.setShowErrors = function (func) {
        this.showErrors = func.bind(this);
        return this;
    };

    this.showSucesso = function () {
        if ($.type(this._res.sucesso) == 'string') {

            swal({
                allowOutsideClick: false,
                title: 'Sucesso',
                text: this._res.sucesso,
                type: "success",
                closeOnConfirm: true,
            }, $.proxy(function () {
                this.enable();
                this._onSuccess();
                if (this._res.redirect) {
                    this.showLoading();
                    document.location = this._res.redirect;
                }
            }, this));

        } else if (this._res.redirect) {
            this.showLoading();
            document.location = this._res.redirect;
        } else {
            this._onSuccess();
            this.enable();
        }
        return this;
    };

    this.showLoading = function () {
        if (this._loadType == 'default') {
            this._buto.each($.proxy(function (k, b) {
                $(b).addClass(this._loadClass);
            }, this));
        } else if (this._loadType == 'full') {
            throw 'Full loading não implementado';
        } else {
            throw '_loadType inexistente.';
        }
        return this;
    };

    this.hideLoading = function () {
        if (this._loadType == 'default') {
            this._buto.each($.proxy(function (k, b) {
                $(b).removeClass(this._loadClass);
            }, this));
        } else {
            throw 'Full loading não implementado';
        }
        return this;
    };

    this.setOnSuccess = function (func) {
        this._onSuccess = $.proxy(func, this);
        return this;
    };

    this.setValidateFunc = function (func) {
        this.validate = $.proxy(func, this);
        return this;
    };

    this.setBeforeSend = function (func) {
        this._beforeSend = $.proxy(func, this);
        return this;
    };

    this.enable = function () {
        $(':input', this._form).attr('disabled', false);
        $('._sfDisabled', this._form).attr('disable', false).removeClass('_sfDisabled');
    };

    this.setOn403 = function (func) {
        this._on403 = func.bind(this);
        return this;
    };

    this.setOn401 = function (func) {
        this._on401 = func.bind(this);
        return this;
    };

    this.setConfirmSend = function (t, m) {
        this._confirmSend = { title: t, message: m };
        return this;
    };

    /**
     * Sempre irá retornar false, para parar o evento submit do formulario
     * 
     * @param event e
     * @returns FALSE (always)
     */
    this.send = function (e) {
        try {
            e.preventDefault();
            e.stop();
        } catch (e) { }

        if (this._status != 'sending') {

            if (this.validate()) {
                if (this._confirmSend) {

                    swal({
                        title: this._confirmSend.title,
                        text: this._confirmSend.message,
                        allowOutsideClick: false,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ok",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: true,
                        html: false
                    }, $.proxy(function () {
                        this._send();
                    }, this));

                    return false;
                } else {
                    this._status = 'sending';

                    this._beforeSend();
                    this._send();
                }
            }
        }

        return false;
    };

    this.setRequestFail = function (func) {
        this._requestFail = func.bind(this);
        return this;
    };

    this._requestFail = function (r, type, text) {
        try {
            this._res = $.parseJSON(r.responseText);
        } catch (e) { }

        if (r.status == 401) {
            //this._on401();
        } else if (r.status == 403) {
            //this._on403();
        } else {
            this._res = { errors: { all: 'Houve um erro na comunicação com o servidor. Tente novamente.' } };
            this.showErrors();
        }
    },

    this._requestSuccess = function (r) {
        this._res = r;

        try {
            if (this._res.errors) {
                this.showErrors();
            } else {
                this.showSucesso();
            }
        } catch (e) {
            this._res = { errors: { all: 'Houve um erro na comunicação com o servidor. Tente novamente.' } };
            this.showErrors();
        }
    },

    this._requestAways = function () {
        this._status = 'stoped';
        this.hideLoading();
    },

    this._send = function () {
        /*
                primeiro varre todos os marcados com erro, e os remove
        */
        $('.error', this._form).removeClass('sfError');

        this.showLoading();


        $.ajax({
            type: this._form.attr('method') ? this._form.attr('method') : 'get',
            url: $(this._form).attr('action'),
            data: $(this._form).serialize()
        }).fail($.proxy(this._requestFail, this)).done($.proxy(this._requestSuccess, this)).always($.proxy(this._requestAways, this));

        $(':input', this._form).each(function () {
            if ($(this).attr('disabled')) {
                $(this).addClass('_sfDisabled');
            }
        });

        $(':input', this._form).attr('disabled', true);
    };

    // init
    if (!param.frm) {
        throw 'Formulário não definido';
    }

    this._form = $($(param.frm)[0]);

    if (!this._form.size()) {
        throw "Form '" + param.frm + "' not found.";
    }

    if (!$(this._form).attr('id')) {
        var now = new Date();
        $(this._form).attr('id', 'frm' + now.getTime() + now.getMilliseconds() + Math.floor(Math.random() * 11));
    }

    this._buto = [];
    this._res = null;
    this._confirmSend = null;

    this._loadType = (param.loadType ? param.loadType : 'default');
    this._loadClass = (param.loadClass ? param.loadClass : 'whirl traditional');

    this.setButtons(param.bt);

    if (param.uplFiles) {
        this._fu = new FileUpload(param.uplFiles);
    }

    $(this._form).submit($.proxy(this.send, this));

    if ($.fn.inputmask) {
        $('[data-masked]', this._form).inputmask();
    }
});

/*
window.onbeforeunload = function(e) {
  return 'texto aquiiii.';
};
*/

FileUpload = (function (param) {
    // _progressNumber: null,
    this._input = null;
    this._files = [];
    this._uploadUrl = null;
    this._postParams = [];
    this._maxFiles = 0; // zero para infinitos
    this._uploadIndex = -1;
    this._iptName = 'file';

    this._putIn = null;
    this._dragTo = null;
    /*
    this._onSuccess = param.onSuccess;
    if (param.accept) {
        this._input.accept = param.accept;
    }
    */

    this._tpl = '<div class="FileUploadPreview"><a class="FileUploadRemove">X</a><progress /><img></div>';

    this._creatInputFile = function () {
        this._input = $('<input>').attr('type', 'file').attr('name', this._iptName);

        if (param.multiple) {
            this._input.multiple = param.multiple;
        }

        if (param.fileTypes) {
            this._input.accept = param.fileTypes;
        }

        this._input.change($.proxy(this._onSelect, this)).hide();

        this._bt.after(this._input);
    };

    this._onDragStop = function () {
        this._dragTo.hide();
    };

    this._onSelect = function () {

        for (var keyFile = 0; keyFile < this._input[0].files.length; keyFile++) {
            var file = this._input[0].files[keyFile];

            this.addFile(file);
        }

        this._input.remove();
        this._creatInputFile();
    };

    this._onSuccess = function () { };

    this._uploadProgress = function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            this._files[this._uploadIndex].html.find('progress').attr('value', percentComplete.toString());
        } else {
            this._files[this._uploadIndex].html.find('progress').attr('value', '');
        }
    };

    this._uploadFile = function () {
        var fd = new FormData();
        fd.append(this._input.attr('name'), this._files[this._uploadIndex].file);

        $.each(this._postParams, function (f) {
            fd.append(f.n, f.v);
        });

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', $.proxy(this._uploadProgress, this), false);
        xhr.addEventListener('load', $.proxy(this._uploadComplete, this), false);
        /*
        xhr.addEventListener('error', this._uploadFailed.bind(this), false);
        xhr.addEventListener('abort', this._uploadCanceled.bind(this), false);*/
        xhr.open('POST', this._uploadUrl);
        xhr.send(fd);
    };

    this._nextUpload = function () {
        this._uploadIndex++;
        if (this._uploadIndex < this._files.length) {
            if (this._files[this._uploadIndex] != null) {
                this._uploadFile();
            } else {
                this._nextUpload();
            }
        } else {
            this._onSuccess();
        }
    };

    this._uploadComplete = function (evt) {
        this._files[this._uploadIndex].html.find('progress').hide();
        this._nextUpload();
    };

    this.addFile = function (file) {
        if (this._maxFiles && this._maxFiles <= this._putIn.find('.FileUploadPreview').length) {

            swal('Atenção', 'Você pode adicionar apenas ' + this._maxFiles + ' foto(s).', "error");

            return;
        }

        //this._putIn.select('.FileUploadStatus tr').invoke('remove');

        if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        } else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
        }

        var h = $(this._tpl);

        this._files.push({
            'file': file,
            'html': h
        });

        h.attr('fId', this._files.length);

        this._putIn.show().append(h);

        var reader = new FileReader();

        // monta o thumb para preview
        $(reader).bind('loadend', $.proxy(function (e) {
            this.tagImg.attr('src', e.target.result).css('margin-left', -(this.tagImg.width() / 4) + 'px');
        }, {
            tagImg: h.find('img')
        }));

        reader.readAsDataURL(file);

        // actions da thumb
        $('.FileUploadRemove', h).click($.proxy(function (e) {
            var d = $(e.currentTarget).parent();
            this.cl._files[d.attr('fId')] = null;
            d.remove();

            if (!$('.FileUploadPreview', this.cl._putIn).length) {
                this.cl._putIn.hide();
            }

        }, { cl: this }));

        this._nextUpload();
    };

    this.reset = function () {
        this._files = [];
        this._uploadIndex = -1;
        this._putIn.hide().empty();
    };

    this.getErrors = function () {
        return this._errors;
    };

    this.setOnSuccess = function (f) {
        this._onSuccess = f.bind({ cl: this });
    };

    this.addPostParams = function (name, value) {
        this._postParams.push({ n: name, v: value });
    };

    /*this.startUpload = function () {
        this._uploadIndex = -1;
        this._nextUpload();
    };*/

    // init
    this._uploadUrl = param.uploadUrl;

    if (param.iptName) {
        this._iptName = param.iptName;
    }

    this._bt = $(param.bt);

    this._creatInputFile();

    this._bt.click($.proxy(function () {
        this._input.click();
    }, this));


    if (param.maxFiles) {
        this._maxFiles = param.maxFiles;
    }

    /**** INICIO drag and drop ****/

    if (param.drag) {
        this._dragTo = $(param.drag);
        this._putIn = $(param.putIn);

        setInterval($.proxy(function () {
            if (this.cl.dragging === false) {
                this.cl._onDragStop();
            }
        }, { cl: this }), 1000);

        $(document).bind('dragover', $.proxy(function (e) {
            this.dragging = true;
            e.preventDefault();
            this._onDragStart();
        }, this)).bind('dragleave', $.proxy(function (e) {
            e.preventDefault();
            this.dragging = false;
        }, this));

        this._dragTo.bind('dragover', $.proxy(function (e) {
            e.preventDefault();
            this._dragTo.css('height', this._dragTo.parent().css('height')).addClass('dragover');

        }, this)).bind('dragleave', $.proxy(function (e) {
            e.preventDefault();

            this._dragTo.removeClass('dragover');

        }, this)).bind('drop', $.proxy(function (e, file) {
            e = window.event; // get window.event if e argument missing (in IE)

            this._dragTo.hide();

            var fls = e.dataTransfer.files;
            var imgFls = new Array();

            $.each(fls, function () {
                if (this.type.match(/^image/)) {
                    imgFls.push(this);
                }
            });

            $.each(imgFls, $.proxy(function (k, file) {
                this.cl.addFile(file);
            }, { cl: this }));
        }, this));
    }

    this._onDragStart = function () {
        $('#send_post').show();

        var h = this._dragTo.parent().css('height');
        this._dragTo.css('height', h).css('line-height', h).show();
    };

    /**** FIM  drag and drop ****/
});