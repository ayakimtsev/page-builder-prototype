!function() {
    var PagePreview = {},
        $body = $('body'),
        $previewBox = $('#pbPreviewBox');

    Mediator.installTo(PagePreview);

    function collectData(){


    };

    function buildPreviewContent(){


    };


    function clearPreviewContent(){
        
    };

    PagePreview.subscribe("init:pagePreview", function() {
        $('#pbPreviewPage').on('click.pagePreview', function(e){
            e.preventDefault();
            $previewBox.show();

            collectData();
            buildPreviewContent();
        });

        $('#pbPreviewClose').on('click.pagePreview', function(e){
            e.preventDefault();
            $previewBox.hide();
            clearPreviewContent();
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 27)  $('#pbPreviewClose').trigger('click.pagePreview');
        });
    });
}();