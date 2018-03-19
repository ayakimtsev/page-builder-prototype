!function(window){
    //var Elements = window.Elements = {};

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
