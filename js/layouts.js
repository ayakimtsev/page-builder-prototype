!function(window){
    var Layouts = window.Layouts = {},
        $contentAllFlows = Templates.$contentAllFlows;

    Mediator.installTo(Layouts);


    Layouts.subscribe('highlight:layouts', function(event, ui)
        {//
            DevicesNav.$desktopLink.trigger('click');
                        
            var blockType = $(ui.draggable).attr('data-type');
            if(blockType == "columns") $contentAllFlows.addClass('ui-prevent-nested-active');
        }//
    );

    Layouts.subscribe('unhighlight:layouts', function(event, ui)
        {//
            $contentAllFlows.removeClass('ui-prevent-nested-active');
        }//
    );

    Layouts.subscribe('drop:layouts', function(event, ui)
        {//
            $contentAllFlows.removeClass('ui-prevent-nested-active');
                        
            var blockType = ui.draggable.attr('data-type'),
                $target = $(event.target),
                $thisFlow = $target.closest('.pb-content-flow');

            if($target.hasClass('pb-inner-column') && blockType === 'columns') return;

            //disable parents
            $target.parents('.pb-layout').droppable("disable");
            
            //disable target layout and add state class
            $target.droppable("disable")
                .addClass('state-dropped');

            // + paste next drop layout
            $target.append(Templates[blockType]);
            if(blockType === 'columns'){
                Layouts.publish('innerColumns:layouts', $target);
            }

            // add edit panel
            EditPanel.publish('init:editPanel', $target.find('.pb-preview-' + blockType));

            if(!$target.hasClass('pb-inner-column')){
                // add next block into general flow
                $thisFlow.append(Templates['nextBlockLayout']);

                Layouts.publish('init:layouts', $thisFlow.find('.pb-layout'));
            }
        }//
    );



    function createInnerColumns($elm, $target){
        var cntColumns = parseInt( $elm.attr('data-columns') ),
            columnsTemlate = '';

        for(var i = 0; i < cntColumns; i++){
            columnsTemlate += '<div class="pb-inner-column pb-layout" data-type="inner"></div>';
        }
        columnsTemlate = '<div class="pb-columns-layout" data-columns="'+cntColumns+'">' + columnsTemlate + '</div>'

        $target.children(':not(.pb-editPanel)').hide();
        $target.append(columnsTemlate);

        Layouts.publish('init:layouts', $target.find('.pb-layout'));
    }
    Layouts.subscribe('innerColumns:layouts', function($target)
        {//
            $target.find('a').on('click', function(e){
                e.preventDefault();
                createInnerColumns($(this), $target.children('.pb-preview'));
            });
        }//
    );

    

    Layouts.subscribe('init:layouts', function(element_s)
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
                        Layouts.publish('drop:layouts', event, ui);
                    }
                    // over: function(event, ui, $thisFlow) {
                    // },
                    // out: function(event, ui, $thisFlow) {
                    // },
                });
        }//
    );


}(window);