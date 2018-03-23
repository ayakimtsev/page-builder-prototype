// FUNCTIONS for Elements
// init:elements

!function(window){
    var Popups = {},
        $body = $('body');

    Mediator.installTo(Popups);

    var templatesTypes = {
        toogler:{
            html:''
        },
        input:{
            html:''
        },
        file:{
            html:''
        },
        editor:{
            html:''
        },
    };


    var popupTypes = {
        full:{
            text: 'Options for row',
            options:[
                {
                    name:'Full width',
                    type:'toogler'
                }
            ]
        },

        text:{

        },
        image:{

        },
        columns:{

        },
        usp:{

        }

    }


    function addPopupHTML($aim){

        
    }




    Popups.subscribe("open:popup", function(blockName, data){
        $body.append(Page.templates['popup']);

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

                var data = $(this).serialize();
                console.log(data);
                closePopup($(this));
            })
            .on('click.closePopup', '#pbPopup .pb-popup-back', function(){
                closePopup($(this));
            });
    });
}(window);
