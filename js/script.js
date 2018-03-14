var $contentBox = $('#pbContentFlow'),
    templates = {
        layout: $('#pbTmpLayout').html().trim(),
        text: $('#pbTmpText').html().trim(),
        image: $('#pbTmpImage').html().trim(),
        columns: $('#pbTmpColumns').html().trim(),
        'edit-panel': $('#pbTmpColumns').html().trim(),
    };


function initDropable(){
    $('.pb-layout:not(.ui-ui-droppable)').droppable({
        greedy: true,
        accept:'.pb-block',
        tolerance: 'pointer',
        over: function(event, ui) {
            var $target = $(event.target);

            //if
            //ui.draggable.css("cursor", "copy");

            
        },
        out: function(event, ui) {
            //debugger;
            //ui.draggable.css("cursor", "no-drop");
        },
        drop: function( event, ui ) {
            var blockType = ui.draggable.attr('data-type'),
                $target = $(event.target);

            $target.parents('.pb-layout').droppable("disable");
            
            $target.droppable("disable")
                .addClass('state-dropped')
                .append(templates[blockType]);

            $contentBox.append(templates['layout']);
            initDropable();
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