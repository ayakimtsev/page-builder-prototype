!function() {
    var EditPanel = window.EditPanel = {};

    Mediator.installTo(EditPanel);


    EditPanel.subscribe('init:editPanel', function(elements)
        {//
            var $elms = $(elements);

            $elms.append(Templates['edit-panel'])
                 .find('.pb-opts-link').each(function(){
                    var $ths = $(this),
                        type = $ths.attr('data-type');

                    switch (type){
                        case 'edit':
                            console.log('edit init');
                        break;
                        case 'delete':
                            $ths.click(function(e){
                                e.preventDefault();
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
                                    //$contentBox.addClass("state-hide-editPanels");
                                    //debugger;
                                    $(ui.helper).closest('.pb-layout[data-type="full"]').css('z-index', 9999);
                                },
                                stop: function( event, ui ) {
                                    //$contentBox.removeClass("state-hide-editPanels");
                                    $(ui.prevObject).closest('.pb-layout[data-type="full"]').css('z-index', '');
                                },
                                // helper: "clone",
                                revert: true,
                                revertDuration: 0,
                                opacity: 1
                            });
                        break;
                    }

                 });
        }//
    );

}();