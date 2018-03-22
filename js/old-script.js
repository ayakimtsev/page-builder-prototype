// var $contentBox = $('#pbContentFlow'),
//     $content = $('.pb-content'),
//     templates = {
//         parentLayout: $('#pbTmpLayout').html().trim(),
//         text: $('#pbTmpText').html().trim(),
//         image: $('#pbTmpImage').html().trim(),
//         columns: $('#pbTmpColumns').html().trim(),
//         editPanel: $('#pbTmpEditPanel').html().trim(),
//     };

// var previewsCallbacks = {
//     initColumnsLayout: function($target){

//         function createColumns($elm, $target){
//             var cntColumns = parseInt($elm.attr('data-columns')),
//             columnsTemlate = '';
    
//             for(var i = 0; i < cntColumns; i++){
//                 columnsTemlate += '<div class="pb-inner-column pb-layout" data-type="inner"></div>';
//             }
//             columnsTemlate = '<div class="pb-columns-layout" data-columns="'+cntColumns+'">' + columnsTemlate + '</div>'
//             $target.children(':not(.pb-editPanel)').hide();
//             $target.append(columnsTemlate);

//             initDropable();
//         }

//         $target.find('a').on('click', function(e){
//             e.preventDefault();
//             createColumns($(this), $target.children('.pb-preview'));
//         });
//     },
//     initTypeEditor: function($elm){
//         $elm.append(Page.templates['editPanel']);

//         $elm.find('.pb-opts-link').each(function(){
//             var $ths = $(this),
//                 type = $ths.attr('data-type');

//             switch (type){
//                 case 'edit':
//                     console.log('edit init');
//                 break;
//                 case 'delete':
//                     $ths.click(function(e){
//                         e.preventDefault();
//                         if($ths.closest('.pb-inner-column').length){
//                             $ths.closest('.pb-inner-column')
//                                     .removeClass('state-dropped ui-droppable-active')
//                                     .droppable("enable");
//                         } else {
//                             $ths.parents('.pb-layout') 
//                                     .removeClass('state-dropped ui-droppable-active')
//                                     .droppable("enable");


//                             $ths.closest('.pb-layout').add($ths.closest('.pb-layout').children('.pb-layout'))
//                                     .removeClass('state-dropped ui-droppable-active')
//                                     .droppable("enable");
                                    
//                         }
//                         $ths.closest('.pb-preview').remove();
//                     });
//                 break;
//                 case 'move':
//                     $ths.draggable({
//                         start: function( event, ui ) {
//                             //$contentBox.addClass("state-hide-editPanels");
//                             //debugger;
//                             $(ui.helper).closest('.pb-layout[data-type="full"]').css('z-index', 9999);
//                         },
//                         stop: function( event, ui ) {
//                             //$contentBox.removeClass("state-hide-editPanels");
//                             $(ui.prevObject).closest('.pb-layout[data-type="full"]').css('z-index', '');
//                         },
//                         // helper: "clone",
//                         revert: true,
//                         revertDuration: 0,
//                         opacity: 1
//                     });
//                 break;
//             }

//         });
//     }
// }


// function initDropable(){
//     $('.pb-layout:not(.ui-droppable)').droppable({
//         greedy: true,
//         accept:'.pb-element, .pb-opts-link[data-type="move"]',
//         tolerance: 'intersect',
//         activate: function( event, ui ) {
//             $('.pb-devices-desktop').click();
            
//             var blockType = $(ui.draggable).attr('data-type');
//             if(blockType == "columns") $contentBox.addClass('ui-prevent-nested-active');
//         },
//         deactivate: function( event, ui ) {
//             $contentBox.removeClass('ui-prevent-nested-active');
//         },
//         // over: function(event, ui) {
//         //     var $target = $(event.target);

//         //     //if
//         //     //if($(ui.draggable).attr('data-type'))

            
//         // },
//         // out: function(event, ui) {
//         //     //debugger;
//         //     //ui.draggable.css("cursor", "no-drop");
//         // },
//         drop: function( event, ui ) {
//             $contentBox.removeClass('ui-prevent-nested-active');
            
//             var blockType = ui.draggable.attr('data-type'),
//                 $target = $(event.target);

//             if($target.hasClass('pb-inner-column') && blockType === 'columns') return;

//             //disable parents
//             $target.parents('.pb-layout').droppable("disable");
            
//             //disable target layout and add state class
//             $target.droppable("disable")
//                    .addClass('state-dropped');

//             // + paste next drop layout
//             $target.append(Page.templates[blockType]);
//             if(blockType === 'columns'){
//                 previewsCallbacks.initColumnsLayout($target);
//             }

//             // add edit panel
//             previewsCallbacks.initTypeEditor($target.find('.pb-preview-' + blockType));

//             if(!$target.hasClass('pb-inner-column')){
//                 // add next block into general flow
//                 $contentBox.append(Page.templates['parentLayout']);
//                 initDropable();
//             }
//         }
//     });
// }


// initDropable();


// $('.pb-element').each(function(){
//     var $ths = $(this);

//     $ths.draggable({
//         revert: true,
//         revertDuration: 0,
//         opacity: 0.35
//     });
// });


// $('.pb-devices > a').on('click', function(e){
//     e.preventDefault();
//     var $ths =$(this);
    
//     $('.pb-devices > a').removeClass('active');
//     $ths.addClass('active');

//     if( $ths.hasClass('pb-devices-tablet') ){
//         $content.removeClass('state-mobile-view');
//         $content.addClass('state-tablet-view');
//     } else if ( $ths.hasClass('pb-devices-mobile') ){
//         $content.removeClass('state-tablet-view');
//         $content.addClass('state-mobile-view');
//     } else {
//         $content.removeClass('state-tablet-view state-mobile-view');
//     }
// });