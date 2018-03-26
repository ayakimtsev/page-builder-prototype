!function() {
    var EditPanel = {};

    Mediator.installTo(EditPanel);

    function isAvailable(type, elmsArray) {
        var result = elmsArray.find(function (element) {
            return element === type;
        });

        return typeof result !== 'undefined';
    };

    function chooseBehavior($editLink, type){
        var $editPanel = $editLink.parent('.pb-editPanel'),
            $flow = $editLink.closest('.pb-content-flow');

            
        switch (type){
            case 'options':
                $editLink.click(function(e){
                    e.preventDefault();
                    var $previewBlock = $editPanel.parent('.pb-preview-columns');
                    if($previewBlock.length){
                        $previewBlock.children('.pb-columns-layout').hide();
                        $previewBlock.children('.pb-preview-columns-box').show();
                    }
                });
            break;

            case 'width':
                $editLink.click(function(e){
                    e.preventDefault();
                    var $fullParent = $editPanel.parent('.state-dropped[data-type="full"]');
                        $contentParent = $editPanel.siblings('[data-type="content"]')

                    if($fullParent.length){
                        $editLink.removeClass('active');
                        $fullParent.removeClass('state-dropped');
                        $contentParent.addClass('state-dropped');
                        $editPanel.siblings('.pb-preview').prependTo($contentParent);
                    } else if($contentParent.length){
                        $editLink.addClass('active');
                        $fullParent = $contentParent.parent();
                        $fullParent.addClass('state-dropped');
                        $contentParent.removeClass('state-dropped');
                        $contentParent.children('.pb-preview').prependTo($fullParent);
                    }
                });
            break;

            case 'edit':
                $editLink.click(function(e){
                    e.preventDefault();
                    var $previewBlock = $editLink.closest('.pb-preview')
                        blockType = $previewBlock.attr('data-blockType');
                    Mediator.publish('open:popup', blockType, $previewBlock);
                });
            break; 

            case 'delete':
                $editLink.click(function(e){
                    e.preventDefault();
                    EditPanel.publish('delete:editPanel', $editLink, $editPanel);
                });
            break;

            case 'sort':
                $flow.sortable({
                    revert: false,
                    tolerance: "pointer",
                    containment:"parent",
                    opacity: 0.75,
                    handle:'[data-type="sort"]',
                    start: function(event, ui){
                        //ui.placeholder.height(ui.helper.height());
                    }
                });
            break;

            case 'move':
                $('.pb-preview').draggable({
                    start: function( event, ui ) {
                        var $current = $(event.target);
                            $preview = $current.closest('.pb-preview, .pb-layout');
                        
                        $current.parent().add($preview).addClass('state-dragging');
                        $(ui.helper).closest('.pb-layout[data-type="full"]').css('z-index', 9999);
                    },
                    stop: function (event, ui) {
                        var $current = $(event.target);
                        $preview = $current.closest('.pb-preview, .pb-layout');


                        $current.parent().add($preview).removeClass('state-dragging');
                        $('.pb-layout[data-type="full"]').css('z-index', '');
                    },
                    revert: true,
                    revertDuration: 0,
                    opacity: 0.75,
                    handle: '[data-type="move"]'
                });
                break;
        }
    };

    EditPanel.subscribe('delete:editPanel', function($deleteLink, $editPanel){
        if($editPanel.parent('.pb-layout[data-type=full]').length){
            var $aim = $editPanel.parent('.pb-layout[data-type=full]:not(:first-child:last-child)');


            $aim.add($editPanel.siblings('.pb-layout[data-type=content]'));
            $aim.remove();
       } else if( $deleteLink.closest('.pb-inner-column').length ){
           $deleteLink.closest('.pb-inner-column')
                    .removeClass('state-dropped ui-droppable-active')
                    .droppable("enable");
       } else {
           $deleteLink.parents('.pb-layout') 
                    .removeClass('state-dropped ui-droppable-active')
                    .droppable("enable");

           $deleteLink.closest('.pb-layout').add($deleteLink.closest('.pb-layout').children('.pb-layout'))
                    .removeClass('state-dropped ui-droppable-active')
                    .droppable("enable");
       }
       $deleteLink.closest('.pb-preview').remove();
    });


    EditPanel.subscribe('init:editPanel', function(elements, availButtons)
        {//
            var $elms = $(elements);

        $elms.append(Page.templates['editPanel']);
        $elms.find('.pb-opts-link').each(function () {
            var $ths = $(this),
                type = $ths.attr('data-type');

            if (!isAvailable(type, availButtons)) {
                $ths.hide();
                return;
            }

            chooseBehavior($ths, type);
        });
    }//
    );

    EditPanel.subscribe('refresh:editPanel', function($target, button){
        switch(button){
            case 'width':
            break;
            default:
                console.warn('EditPanel says - no button');
        }

    });



    function refreshWidthButton(event, ui){
        var $target = $(event.target),
        $editPanel = $target.children('.pb-editPanel') || $target.siblings('.pb-editPanel');
    
        if($target.is('[data-type="full"]')){
            $editPanel.find('[data-type="width"]').addClass('active');
        } else if($target.is('[data-type="content"]')){
            $editPanel.find('[data-type="width"]').removeClass('active');
        }

    }

    EditPanel.subscribe('refresh:EditPanel-width', function(event, ui)
        {//
            refreshWidthButton(event, ui);
        }//
    );
}();
