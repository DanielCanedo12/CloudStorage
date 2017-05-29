(function ($) {
    Grid = {
        Remove: function () {
            swal({
                title: 'Deletar',
                text: 'Deseja realmente remover o registro "' + eval("this.dt.oData." + this.p.Message) + '"',
                allowOutsideClick: false,
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Ok",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true,
                html: false
            }, $.proxy(Grid.Refresh, this));

            return false;
        },

        Refresh: function () {
            var url = $('#grid').DataTable().ajax.url();
            $('#grid').DataTable().ajax.url(Grid._Replace(this.p.Url, this.dt)).load($.proxy(Grid.Success, this), false);
            $('#grid').DataTable().ajax.url(url);
        },

        Success: function (jsonRes) {
            if ($.type(jsonRes.dtSuccess) == "string") {
                $.notify({ message: jsonRes.dtSuccess }, { status: 'success', delay: 2000 });
            }
            else if (jsonRes.dtError) {
                $.notify({ message: jsonRes.dtError }, { status: 'danger', delay: 2000 });
            }
        },

        Redirect: function () {
            document.location.href = Grid._Replace(this.p.Url, this.dt);
        },

        _Replace: function (s, o) {
            var ereg = s.match(/\[(.*?)\]/g);
            for (var k in ereg) {
                s = s.replace(ereg[k], eval("o.oData." + ereg[k].replace('[', "").replace(']', "")));
            }

            return s;
        }
    };
})(jQuery);