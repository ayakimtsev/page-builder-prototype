!function(window){
    var DevicesNav = window.DevicesNav = {},
        $content = Templates.$content;
        
    Mediator.installTo(DevicesNav);

    DevicesNav.$desktopLink = $('.pb-devices-desktop');
    // DevicesNav.$tabletLink = $('.pb-devices-tablet');
    // DevicesNav.$mobileLink = $('.pb-devices-mobile');

    DevicesNav.subscribe("init:devicesNav", function(element_s) {
        var $deviceLinks = $('.pb-devices > a');

        $deviceLinks.on('click', function(e){
            e.preventDefault();
            var $ths = $(this);
            
            $deviceLinks.removeClass('active');
            $ths.addClass('active');
        
            if( $ths.hasClass('pb-devices-tablet') ){
                $content.removeClass('state-mobile-view')
                        .addClass('state-tablet-view');
            } else if ( $ths.hasClass('pb-devices-mobile') ){
                $content.removeClass('state-tablet-view')
                        .addClass('state-mobile-view');
            } else {
                $content.removeClass('state-tablet-view state-mobile-view');
            }
        });
    });
}(window);