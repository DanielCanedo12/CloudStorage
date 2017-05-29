
jQuery.widget('custom.catcomplete', jQuery.ui.autocomplete, {
	_renderItem: function( ul, item ) {
		var obj = null;
		try {
			return jQuery.proxy(this.options.classObj.tplItem, this)(ul, item);
		} catch (e) {
		    console.log(e);
		}
	},

	_renderMenu: function(ul, items) {
		try {
			return jQuery.proxy(this.options.classObj.tplMenu, this)(ul, items);
		} catch (e) {
		    console.log(e);
		}
	},
	
	_resizeMenu: function() {
		var bl = this.options.classObj.getBoxResultLimit();
		
		if (bl) {
			var len = jQuery(this.menu.element).children().length;
			if (len > bl) {
				this.menu.element.css({
					height: parseInt(this.menu.element.children('li:first').css('height')) * bl,
					overflow: 'auto'
				});
			}
		}
		
		this.menu.element.css('minWidth', this.element.outerWidth());
	},
	
	_lower_and_remove_accented_chars : function (txt) {
		txt = new String(txt).toLowerCase();
		txt = txt.replace(/[áàâãåäª]/gi, 'a');
		txt = txt.replace(/[éèêë]/gi, 'e');
		txt = txt.replace(/[íìîï]/gi, 'i');
		txt = txt.replace(/[óòôõöº°]/gi, 'o');
		txt = txt.replace(/[úùûüµ]/gi, 'u');
		txt = txt.replace(/[ñ]/gi, 'n');
		txt = txt.replace(/[ç]/, 'c');
		txt = txt.replace(/[ÿ¥]/, 'y');
		txt = txt.replace(/[¹]/, '1');
		txt = txt.replace(/[²]/, '2');
		txt = txt.replace(/[³]/, '3');
		txt = txt.replace(/[æ]/, 'ae');
		txt = txt.replace(/[ø]/, '0');
		return txt.replace(/[†°¢£§•¶ß®©™´¨≠±≤≥∂∑∏π∫Ω]/, '');
	}
});

/*
    {
        {
            name: 'cat1',
            data: [],
         }
    }

    ou

    [
        {
            value: '',
            text: '',
        }

    ]
*/

AutoComplete = (function (param) {
	// inicialização das variaveis
	this._cache = [];
	this._to = null;
	this._hidden = null; // informa para qual hidden o value será jogado ao invez de trocar o "name" do _to
	this._name = null;
	this._url = null;
	this._qtdChars = 1; // min de caracteres digitados para iniciar a busca
	this._delay = 0; // delay para iniciar a busca após o usuário ter terminado de digitar
	this._boxResultLimit = 10;
	
	this._xhr = null;
	
	// fim da declaração de propriedades PRIVADAS
	
	this._onSelect = function () {};
	
	this.tplMenu = function (ul, items) {
	    var that = this;

		jQuery.each(items, function(index, item) {
			if (item.name) {
				ul.append('<li class="ui-autocomplete-category">' + item.name + '</li>');

				if (item.data) {
					jQuery.each(item.data, function (i, dado) {
						that._renderItemData(ul, dado);
					});
				}
			}
			else
			{
			    that._renderItemData(ul, item);
			}
		});
	};
	
	this.tplItem = function (ul, item) {
	    item.value = new String(item.value);

	    var strongText = this._lower_and_remove_accented_chars(item.value);

	    var reg = new RegExp('(' + this._lower_and_remove_accented_chars(this.element.prop('value')) + ')', 'gi');
	    regResult = reg.exec(strongText);

	    try {
	        strongText = strongText.replace(reg, '<strong>' + regResult[0] + '</strong>');
	    } catch (e) { }

        /*
	    var pInicial = strongText.indexOf('<strong>');
	    var pFinal = strongText.indexOf('</strong>') - 8;

	    if (pFinal > 0) {
	        strongText = item.value.substring(0, pInicial) + '<strong>' + item.value.substring(pInicial, pFinal) + '</strong>' + item.value.substr(pFinal);
	    }
        */
	    return jQuery('<li>')
		  .attr('data-value', item.id)
		  .append(
			'<div>' +
				strongText +
			'</div>'
		  )
		  .appendTo(ul);
	};

	// inicio das substituições de propriedades e métodos
	
	if (param.to) {
		this._to = jQuery(param.to);
	} else {
		throw new Exception('Input type text isn\'t defined.');
	}

	if (param.hidden) {
	    this._hidden = jQuery(param.hidden);
	}
	
	if (param.name) {
		this._name = param.name;
	} else {
		this._name = jQuery(this._to).prop('name');
	}
	
	if (param.url) {
		this._url = param.url;
	}
	
	if (param.qtdChars) {
		this._qtdChars = param.qtdChars;
	}
	
	if (param.value) {
		this._to.prop('name', param.value);
	}
	
	if (param.text) {
		this._to.prop('value', param.text);
	}
	
	if (param.onSelect) {
		this._onSelect = jQuery.proxy(param.onSelect, this);
	}
	
	if (param.tplMenu) {
		this.tplMenu = param.tplMenu;
	}
	
	if (param.tplItem) {
		this.tplItem = param.tplItem;
	}
	
	if (param.boxResultLimit) {
		this._boxResultLimit = param.boxResultLimit;
	}
	
	this._prepareIptName = function (item) {
		var name = this._name;
		var mt = name.match(/\#(.*?)\#/gi);
		
		if (mt) {
			jQuery.each(mt, function (i) {
				var key = this.replace(/#/g, '');
				if (item[key]) {
					name = name.replace(this, item[key]);
				}
			});
		}
		
		return name;
	};
	
	this._select = function (event, ui) {
	    if (this._hidden == null)
	    {
	        this._to.attr('name', this._prepareIptName(ui.item));
	    }
	    else
	    {
	        this._hidden.val(ui.item.id);
	    }

		this._onSelect(ui.item);
	};
	
	this._getSource = function(request, response) {
		var term = request.term;
		
        if ( term in this._cache ) {
			response( this._cache[ term ] );
			return;
        }
		
	    try {
	        this._xhr.abort();
	    } catch (e) { }

	    this._imgLoading.show().css('marginTop', parseInt((this._to.innerHeight() / 2) - (this._imgLoading.innerHeight() / 2)) + 'px');
		
		this._xhr = jQuery.getJSON(this._url, {
			text: term
		}).done(jQuery.proxy(function( data, status, xhr ) {
			this._cache[ term ] = data;
			
			response(data);

			
		}, this)).always(jQuery.proxy(function( data, status, xhr ) {
		    this._imgLoading.hide();
		}, this));
	};
	
	this.getBoxResultLimit = function () {
		return this._boxResultLimit;
	};

	this._to.prop('autocomplete', 'off');
	
	// init
	
	this._imgLoading = jQuery('<div class="autocomplete_loading"><span class="whirl traditional"></span></div>').hide().insertAfter(this._to);
	
	jQuery(this._to).catcomplete({
		minLength: this._qtdChars,
		delay: this._delay,
		select: jQuery.proxy(this._select, this),
		source: jQuery.proxy(this._getSource, this),
		
		classObj: this,
	});
});