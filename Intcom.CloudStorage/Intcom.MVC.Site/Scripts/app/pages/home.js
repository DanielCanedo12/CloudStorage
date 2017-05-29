$(document).ready(function () {
    $("#container").whatWeather({
        geolocation: true,
        days: "1",
        weekDays: ["Dom", "Sun", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        months: ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayAndNight: true,
        refresh: 100,
        template: 0,
    });
});