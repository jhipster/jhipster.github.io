$(function () {
    $(".navbar-expand-toggle").click(function () {
        $(".app-container").toggleClass("expanded");
        return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
    });
    return $(".navbar-right-expand-toggle").click(function () {
        $(".navbar-right").toggleClass("expanded");
        return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
    });
});


$(function () {
    return $(".side-menu .nav .dropdown").on('show.bs.collapse', function () {
        return $(".side-menu .nav .dropdown .collapse").collapse('hide');
    });
});

$(function () {
    // Open active panels in menu
    if ($(window).width() <= 768) {
        $('div.app-container').removeClass('expanded');
        $('button.navbar-expand-toggle').removeClass('fa-rotate-90');
    }
    setTimeout(function () {
        $('.panel-default .panel-collapse ul li.active').closest('.panel-collapse').addClass('in');
    }, 100);

});
