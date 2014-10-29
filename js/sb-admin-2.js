$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 0; // offset to take care of potential topbar
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    })
    $(window).bind("load", function() {
        var selectedItem = $('.sidebar-nav .active');
        if(selectedItem){
            var parent = selectedItem.parents('.nav-second-level');
            if(parent){
                parent.addClass('in'); 
            }
        }
        $('.sidebar-nav li').click(function(){
            $this = $(this);
            if($this.find('.nav-second-level')){
                $this.removeClass('active');
            }
        });
    })
})
