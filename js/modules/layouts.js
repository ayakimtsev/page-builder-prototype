!function(window){
    var Layouts = {},
        $contentAllFlows;

    Mediator.installTo(Layouts);

    //var instance = {}
    Layouts.subscribe('highlight:layouts', function(event, ui)
        {//
            var blockType = $(ui.draggable).attr('data-type');


            Mediator.publish('show:devicesNav','desktop');
            if(blockType == "columns") $contentAllFlows.addClass('ui-prevent-nested-active');
        }//
    );

    Layouts.subscribe('unhighlight:layouts', function (event, ui) {//
        $contentAllFlows.removeClass('ui-prevent-nested-active');
    }//
    );
    function disableParentDroppable($target){
        if($target.closest('[data-type="inner"]').length){

        } else {

        }
        //disable parents
        $target.parents('.pb-layout')
               .add($target.children('.pb-layout'))
                    .droppable("disable")
                    .removeClass('ui-droppable-active');
        
        //disable target layout and add state class
        $target.droppable('disable')
               .addClass('state-dropped');
    };
    function enableParentDroppable($target){
         if($target.closest('[data-type="inner"]').length){
             $target.parent('.pb-layout')
                         .removeClass('state-dropped ui-droppable-active')
                         .droppable("enable");
         } else{
            //disable parents
            $target.parents('.pb-layout')
                        .removeClass('state-dropped ui-droppable-active')
                        .droppable("enable");
            $target.siblings('.pb-layout')
                        .removeClass('state-dropped ui-droppable-active')
                        .droppable("enable");
        }

    };

    Layouts.subscribe('drop:layouts', function (event, ui) {//
        var blockType = ui.draggable.attr('data-type'),
            $target = $(event.target),
            $thisFlow = $target.closest('.pb-content-flow');


        $contentAllFlows.removeClass('ui-prevent-nested-active');

        if ($target.hasClass('pb-inner-column') && blockType === 'columns') return;

        disableParentDroppable($target);

        // + paste next drop layout and init events
        $target.append(Page.templates[blockType]);
        if (blockType === 'columns') {
            Layouts.publish('innerColumnsEvents:layouts', $target);
        }

        // add edit panel
        var panelContent = blockType == 'columns' ? ['options','delete', 'move'] : ['edit', 'delete', 'move'];
        Mediator.publish('init:editPanel',
            $target.find('.pb-preview-' + blockType),
            panelContent
        );

        if(!$target.hasClass('pb-inner-column')){
            // add next block into general flow
            if(!areActiveLayouts($thisFlow)){
                addParentLayout($thisFlow);
            }
            Layouts.publish('attachDraggable:layouts', $thisFlow.find('.pb-layout'));
        }
        Layouts.publish('attachDraggable:layouts', $thisFlow.find('.pb-layout'));
    };//

    function getColumnsTemlate(_cntColumns) {
        var _columnsTemlate = '';

        for(var i = 0; i < _cntColumns; i++){
            _columnsTemlate += '<div class="pb-inner-cell"><div class="pb-inner-column pb-layout" data-type="inner"></div></div>';
        }
        _columnsTemlate = '<div class="pb-columns-layout" data-columns="' + _cntColumns + '">' + _columnsTemlate + '</div>';

        return _columnsTemlate;
    }

    function createInnerColumns($elm, $target) {
        var cntColumns = parseInt($elm.attr('data-columns')),
            columnsTemlate = getColumnsTemlate(cntColumns);

        $target.children('.pb-preview-columns-box').hide();

        var $existColumns = $target.find('.pb-columns-layout').show();
        if($existColumns.length){
            var exitCnt = parseInt($existColumns.attr('data-columns'));
            
            if(exitCnt < cntColumns){
                do{
                    $existColumns.append('<div class="pb-inner-cell"><div class="pb-inner-column pb-layout" data-type="inner"></div></div>');
                    exitCnt+=1;
                }
                while(exitCnt > cntColumns);
            } else if(exitCnt > cntColumns){
                //$existColumns.children(':')
            }

            $existColumns.attr('data-columns', cntColumns);
        } else{
            $target.append(columnsTemlate);
        }
        
        Layouts.publish('attachDraggable:layouts', $target.find('.pb-layout'));
    }

    Layouts.subscribe('innerColumnsEvents:layouts', function($target)
        {//
            $target.find('a').on('click', function(e){
                e.preventDefault();
                Mediator.publish('show:devicesNav','desktop');
                
                createInnerColumns($(this), $(this).closest('.pb-preview'));
            });
        }//
    );


    function attachEditPanel(block, buttons){
        Mediator.publish('init:editPanel',
            $(block),
            buttons || ['edit','delete', 'move']
        );
    }

    function addParentLayout(flow_s,buttons){
        var $flow = $(flow_s);


        $(flow_s).append(Page.templates['parentLayout']);
        attachEditPanel($flow.children(':not(.ui-droppable)'), ['width','delete', 'sort']);
    };

    function areActiveLayouts($flow) {
        return $flow.children('.pb-layout:not(.ui-droppable-disabled)').length !== 0;
    }

    Layouts.subscribe('attachDraggable:layouts', function(element_s)
        {//
            $(element_s)
                .not('.ui-droppable')
                .droppable({
                    greedy: true,
                    accept:'.pb-element, .pb-preview',
                    tolerance: 'pointer',
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
                        if($draggable.hasClass('pb-preview')){
                            $draggable.prependTo($target);
                            disableParentDroppable($target);
                        } else {
                            Layouts.publish('drop:layouts', event, ui);
                        };
                        
                        Mediator.publish('refresh:EditPanel-width', event, ui);
                    }
                    // over: function(event, ui, $thisFlow) {
                    // },
                    // out: function(event, ui, $thisFlow) {
                    // }
                });

        }//
    );


    Layouts.subscribe('init:layouts', function (flow_s) {//
        $contentAllFlows = $(flow_s),
            addParentLayout($contentAllFlows);
        Layouts.publish('attachDraggable:layouts', '.pb-layout');
    }//
    );


}(window);
