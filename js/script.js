var $contentBox = $('#pbContentFlow'),
    templates = {
        nextBlockLayout: $('#pbTmpLayout').html().trim(),
        text: $('#pbTmpText').html().trim(),
        image: $('#pbTmpImage').html().trim(),
        columns: $('#pbTmpColumns').html().trim(),
        'edit-panel': $('#pbTmpColumns').html().trim(),
    };

var previewsCallbacks = {
    initColumnsLayout: function($target){

        function createColumns($elm, $target){
            var cntColumns = parseInt($elm.attr('data-columns')),
            columnsTemlate = '';
    
            for(var i = 0; i < cntColumns; i++){
                columnsTemlate += '<div class="pb-inner-column pb-layout"></div>';
            }
            columnsTemlate = '<div class="pb-columns-layout" data-columns="'+cntColumns+'">' + columnsTemlate + '</div>'
            $target.hide()
                   .after(columnsTemlate);

            initDropable();
        }

        $target.find('a').on('click', function(e){
            e.preventDefault();
            createColumns($(this), $target.children('.pb-preview'));
        });
    }
}


function initDropable(){
    $('.pb-layout:not(.ui-droppable)').droppable({
        greedy: true,
        accept:'.pb-block',
        tolerance: 'pointer',
        activate: function( event, ui ) {
            var blockType = $(ui.draggable).attr('data-type');

            if(blockType == "columns") $contentBox.addClass('ui-prevent-nested-active');
        },
        deactivate: function( event, ui ) {
            $contentBox.removeClass('ui-prevent-nested-active');
        },
        // over: function(event, ui) {
        //     var $target = $(event.target);

        //     //if
        //     //if($(ui.draggable).attr('data-type'))

            
        // },
        // out: function(event, ui) {
        //     //debugger;
        //     //ui.draggable.css("cursor", "no-drop");
        // },
        drop: function( event, ui ) {
            var blockType = ui.draggable.attr('data-type'),
                $target = $(event.target);

            if($target.hasClass('pb-inner-column') && blockType === 'columns') return;

            //disable parents
            $target.parents('.pb-layout').droppable("disable");
            
            //disable target layout and add state class
            $target.droppable("disable")
                   .addClass('state-dropped');

            // + paste next drop layout
            $target.append(templates[blockType]);
            if(blockType === 'columns'){
                previewsCallbacks.initColumnsLayout($target);
            }

            if(!$target.hasClass('pb-inner-column')){
                // add next block into general flow
                $contentBox.append(templates['nextBlockLayout']);
                initDropable();
            }
        }
    });
}


initDropable();


$('.pb-block').each(function(){
    var $ths = $(this);

    $ths.draggable({
        revert: true,
        revertDuration: 0,
        opacity: 0.35
    });
});