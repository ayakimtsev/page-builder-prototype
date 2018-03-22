!function() {
    var EditPanel = window.EditPanel = {};

    Mediator.installTo(EditPanel);

    function isAvailable(type, elmsArray){
        var result = elmsArray.find(function(element) {
            return element === type;
        });

        return typeof result !== 'undefined';
    };

    function chooseBehavior($ths, type){
        switch (type){
            case 'edit':
                console.log('edit init');
            break;
            case 'delete':
                $ths.click(function(e){
                    e.preventDefault();

                    // if($ths.parent('.pb-layout[data-type=full]').length){
                    //     var $aim = $ths.parent('.pb-layout[data-type=full]:not(:first-child:last-child)');
                    //     $aim.remove();
                    // } else
                    if($ths.closest('.pb-inner-column').length){
                        $ths.closest('.pb-inner-column')
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");
                    } else {
                        $ths.parents('.pb-layout') 
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");


                        $ths.closest('.pb-layout').add($ths.closest('.pb-layout').children('.pb-layout'))
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");
                                
                    }
                    $ths.closest('.pb-preview').remove();
                });
            break;
            case 'move':
                $ths.draggable({
                    start: function( event, ui ) {
                        var $current = $(event.target);
                            $preview = $current.closest('.pb-preview, .pb-layout');
                        
                        $current.parent().add($preview).addClass('state-dragging');
                        $(ui.helper).closest('.pb-layout[data-type="full"]').css('z-index', 9999);
                    },
                    stop: function( event, ui ) {
                        var $current = $(event.target);
                            $preview = $current.closest('.pb-preview, .pb-layout');

                        $current.parent().add($preview).removeClass('state-dragging');
                        $(ui.prevObject).closest('.pb-layout[data-type="full"]').css('z-index', '');
                    },
                    // helper: "clone",
                    revert: true,
                    revertDuration: 0,
                    opacity: 1
                });
            break;
        }
    };


    EditPanel.subscribe('init:editPanel', function(elements, availButtons)
        {//
            var $elms = $(elements);


            $elms.append(Page.templates['editPanel']);
            $elms.find('.pb-opts-link').each(function(){
                var $ths = $(this),
                    type = $ths.attr('data-type');

                if(!isAvailable(type,availButtons)) {
                    $ths.hide();
                    return;
                }
                
                chooseBehavior($ths, type);
            });
        }//
    );

}();