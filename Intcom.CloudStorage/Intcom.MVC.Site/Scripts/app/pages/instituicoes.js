$(document).ready(function () {
    new SendForm({ frm: '#frm' });

    $('#btCheckCPF').associarPessoa({
        validarResponsavel: FO.GLOBAL_URLS.ValidarResponsavel
    });
});