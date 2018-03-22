// FUNCTIONS for Elements
// init:elements

!function(window){
    var Popups = window.Popups = {};

    Mediator.subscribe("init:elements", function(element_s) {
        $(element_s).each(function(){
            var $ths = $(this);
        
            $ths.draggable({
                revert: true,
                revertDuration: 0,
                opacity: 0.35
            });
        });
    });
}(window);
