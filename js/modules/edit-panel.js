!function() {
    var EditPanel = window.EditPanel = {};

    Mediator.installTo(EditPanel);

    function isAvailable(type, elmsArray){
        var result = elmsArray.find(function(element) {
            return element === type;
        });

        return typeof result !== 'undefined';
    };

    function chooseBehavior($editLink, type){
        var $editPanel = $editLink.parent('.pb-editPanel'),
            $flow = $editLink.closest('.pb-content-flow');

        switch (type){
            case 'edit':
                console.log('open edit/options popup');
            break;
            case 'delete':
                $editLink.click(function(e){
                    e.preventDefault();
                    
                    if($editPanel.parent('.pb-layout[data-type=full]').length){
                         var $aim = $editPanel.parent('.pb-layout[data-type=full]:not(:first-child:last-child)');
                         $aim.add($editPanel.siblings('.pb-layout[data-type=content]'));
                         $aim.remove();
                    } else if($editLink.closest('.pb-inner-column').length){
                        $editLink.closest('.pb-inner-column')
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");
                    } else {
                        $editLink.parents('.pb-layout') 
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");


                        $editLink.closest('.pb-layout').add($editLink.closest('.pb-layout').children('.pb-layout'))
                                .removeClass('state-dropped ui-droppable-active')
                                .droppable("enable");
                                
                    }
                    $editLink.closest('.pb-preview').remove();
                });
            break;

            case 'sort':
                // debugger;
                $flow.sortable({
                    //connectToSortable: $flow,
                    revert: false,
                    tolerance: "pointer",
                    containment:"parent",
                    opacity: 0.75,
                    // forceHelperSize: true,
                    // forcePlaceholderSize:true,
                    //revertDuration: 0,
                    handle:'[data-type="sort"]'
                });
            break;
            case 'move':
                $editLink.draggable({
                    start: function( event, ui ) {
                        var $current = $(event.target);
                            $preview = $current.closest('.pb-preview:not(.pb-preview-columns), .pb-layout');
                        
                        $current.parent().add($preview).addClass('state-dragging');
                        $(ui.helper).closest('.pb-layout[data-type="full"]').css('z-index', 9999);
                    },
                    stop: function( event, ui ) {
                        var $current = $(event.target);
                            $preview = $current.closest('.pb-preview, .pb-layout');

                        $current.parent().add($preview).removeClass('state-dragging');
                        $('.pb-layout[data-type="full"]').css('z-index', '');
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