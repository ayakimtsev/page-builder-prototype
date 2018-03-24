// FUNCTIONS for Elements
// init:elements

!function(window){
    var Popups = {},
        $body = $('body');

    Mediator.installTo(Popups);

    var popupTypes = {
        // full:{
        //     text: 'Options for row',
        //     options:[
        //         {
        //             name:'rowType',
        //             label:'Full width',
        //             type:'toogler'
        //         }
        //     ]
        // },

        text:{
            dialogText: 'Options for "Text block"',
            options:[
                {
                    name:'text',
                    label:'Text',
                    type:'editor'
                }
            ]
        },
        image:{
            dialogText: 'Options for "Image block"',
            options:[
                {
                    name:'image',
                    label:'Image',
                    type:'file'
                },
                {
                    name:'title',
                    label:'Title',
                    type:'input'
                },
                {
                    name:'subtitle',
                    label:'Sub title',
                    type:'input'
                },
                {
                    name:'link',
                    label:'Link',
                    type:'link'
                }
            ]
        },
        columns:{

        },
        // usp:{

        // }
    }



    Popups.subscribe("open:popup", function(blockName, $linkedPreview){
        var dialogTitle = popupTypes[blockName].dialogText,
            opts = popupTypes[blockName].options,
            dataStr = $linkedPreview.attr('data-edit-string');
            $popupFlow = $();


        dataStr = typeof dataStr !== 'undefined' ? JSON.parse($linkedPreview.attr('data-edit-string')) : false;
        $body.append(Page.templates['popup']);
        $popupFlow = $('#pbOptionsFlow').data('linkedPreview',$linkedPreview);
        $popupFlow.closest('.pb-popup-inside').find('.pb-popup-title').text(dialogTitle);

        $.each(opts, function(index, val){
            var blockTemplate = Page.templates.blocks[val.type],
                $row = $tmp = $();


            if(blockTemplate){
                $popupFlow.append(blockTemplate);
            } else{
                console.warn('Not template for row - ' + val.type + '!');
            }
            
            $row = $popupFlow.children(':last-child');
            $row.find('.pb-label').text(val.label);
            $row.find('input').attr('name', 'pb_'+val.name)
                

            if(dataStr && dataStr.length) {
                $row.find('input').val(dataStr[index].value);
            }
        });
    });

    // Popups.subscribe("hide:popups", function(){

        
    // });

    function closePopup($startPoint){
        setTimeout(function(){
            $startPoint.closest('.pb-popupBox').remove();
        },50);
    }


    Popups.subscribe("init:popups", function() {
        $body
            .on('submit.optsPopup', '#pbPopup form', function(e){
                e.preventDefault();

                var $linkedPreview = $('#pbOptionsFlow').data('linkedPreview'),
                    dataArray = $(this).serializeArray(),
                    dataStr = JSON.stringify(dataArray);


                $linkedPreview.attr('data-edit-string', dataStr);
                closePopup($(this));
            })
            .on('click.closePopup', '#pbPopup .pb-popup-back', function(){
                closePopup($(this));
            });
    });
}(window);
