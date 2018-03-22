!function(window){
    var Layouts = window.Layouts = {},
        $contentAllFlows = Templates.$contentAllFlows;

    Mediator.installTo(Layouts);

    //var instance = {}

    Layouts.subscribe('highlight:layouts', function(event, ui)
        {//
            DevicesNav.show('desktop');
                        
            var blockType = $(ui.draggable).attr('data-type');
            if(blockType == "columns") $contentAllFlows.addClass('ui-prevent-nested-active');
        }//
    );

    Layouts.subscribe('unhighlight:layouts', function(event, ui)
        {//
            $contentAllFlows.removeClass('ui-prevent-nested-active');
        }//
    );

    function disableParentDroppable($target){
        //disable parents
        $target.parents('.pb-layout').droppable("disable");
        
        //disable target layout and add state class
        $target.droppable('disable')
                .addClass('state-dropped');
    }
    function enableParentDroppable($target){

        // if($target.closest('[data-type="inner"]')){
        //     $target.parent('.pb-layout')
        //                 .removeClass('state-dropped ui-droppable-active')
        //                 .droppable("enable");
        // } else{
            //disable parents
            $target.parents('.pb-layout')
                        .removeClass('state-dropped ui-droppable-active')
                        .droppable("enable");
            $target.siblings('.pb-layout')
                        .removeClass('state-dropped ui-droppable-active')
                        .droppable("enable");

        //}

    }

    Layouts.subscribe('drop:layouts', function(event, ui)
        {//
            var blockType = ui.draggable.attr('data-type'),
                $target = $(event.target),
                $thisFlow = $target.closest('.pb-content-flow');


            $contentAllFlows.removeClass('ui-prevent-nested-active');

            if($target.hasClass('pb-inner-column') && blockType === 'columns') return;

            disableParentDroppable($target);

            // + paste next drop layout and init events
            $target.append(Templates[blockType]);
            if(blockType === 'columns'){
                Layouts.publish('innerColumnsEvents:layouts', $target);
            }

            // add edit panel
            var panelContent = blockType == 'columns' ? ['delete', 'move'] : ['edit', 'delete', 'move'];
            EditPanel.publish('init:editPanel',
                $target.find('.pb-preview-' + blockType),
                panelContent
            );

            if(!$target.hasClass('pb-inner-column')){
                // add next block into general flow
                if(!areActiveLayouts($thisFlow)){
                    $thisFlow.append(Templates['parentLayout']);
                }
                Layouts.publish('attachDraggable:layouts', $thisFlow.find('.pb-layout'));
            }
        }//
    );


    
    function getColumnsTemlate(_cntColumns){
        var _columnsTemlate = '';


        for(var i = 0; i < _cntColumns; i++){
            _columnsTemlate += '<div class="pb-inner-column pb-layout" data-type="inner"></div>';
        }
        _columnsTemlate = '<div class="pb-columns-layout" data-columns="'+_cntColumns+'">' + _columnsTemlate + '</div>';

        return _columnsTemlate;
    }

    function createInnerColumns($elm, $target){
        var cntColumns = parseInt( $elm.attr('data-columns') ),
            columnsTemlate = getColumnsTemlate(cntColumns);


        $target.children(':not(.pb-editPanel)').hide();
        $target.append(columnsTemlate);

        Layouts.publish('attachDraggable:layouts', $target.find('.pb-layout'));
    }

    Layouts.subscribe('innerColumnsEvents:layouts', function($target)
        {//
            $target.find('a').on('click', function(e){
                e.preventDefault();
                DevicesNav.show('desktop');
                createInnerColumns($(this), $target.children('.pb-preview'));
            });
        }//
    );


    function addParentLayout(flow_s){
        $(flow_s).append(Templates['parentLayout']);

        // EditPanel.publish('init:editPanel',
        //     $(flow_s).children(),
        //     ['delete', 'move']
        // );
    };

    function areActiveLayouts($flow){
        return $flow.children('.pb-layout:not(.ui-droppable-disabled)').length !== 0;
    }

    Layouts.subscribe('attachDraggable:layouts', function(element_s)
        {//
            $(element_s)
                .not('.ui-droppable')
                .droppable({
                    greedy: true,
                    accept:'.pb-element, .pb-opts-link[data-type="move"]',
                    tolerance: 'intersect',
                    activate: function( event, ui) {
                        Layouts.publish('highlight:layouts', event, ui);
                    },
                    deactivate: function( event, ui) {
                        Layouts.publish('unhighlight:layouts', event, ui);
                    },
                    drop: function( event, ui) {
                        var $draggable = $(ui.draggable),
                            $oldParent = $draggable.closest('.pb-preview, .pb-inner-column'),
                            $target = $(event.target);

                        enableParentDroppable($oldParent);
                            
                        if($draggable.attr('data-type') === 'move'){
                            $draggable.closest('.pb-preview').prependTo($target);
                            disableParentDroppable($target);
                        } else {
                            Layouts.publish('drop:layouts', event, ui);
                        };
                    }
                    // over: function(event, ui, $thisFlow) {
                    // },
                    // out: function(event, ui, $thisFlow) {
                    // }
                });

        }//
    );


    Layouts.subscribe('init:layouts', function(element_s)
        {//
            addParentLayout($contentAllFlows);
            Layouts.publish('attachDraggable:layouts', element_s);
        }//
    );


}(window);