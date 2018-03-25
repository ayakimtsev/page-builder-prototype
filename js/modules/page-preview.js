!function() {
    var PagePreview = {},
        $body = $('body'),
        $previewBox = $('#pbPreviewBox'),
        $contentAllFlows = $('.pb-content-flow'),
        $pageContents = $('.pb-page-content');

    Mediator.installTo(PagePreview);

    function collectData($flow){
        var data = [];


        $flow.find('.state-dropped[data-type="full"], .state-dropped[data-type="content"]')
            .each(function(){
                var $ths = $(this),
                    rowType = $ths.attr('data-type'),
                    $previewBlock = $ths.children('.pb-preview'),
                    previewBlockType = $previewBlock.attr('data-blocktype'),
                    elements = [];


                    if(previewBlockType === 'columns'){
                        $previewBlock.find('.pb-inner-cell').each(function(){
                            var $ths = $(this);
                                $previewBlock = $ths.children('.pb-preview'),
                                previewBlockType = $previewBlock.attr('data-blocktype');


                            elements.push({
                                previewBlockType: previewBlockType,
                                contentString:$previewBlock.attr('data-edit-string')
                            });
                        });
                    } else{
                        elements.push({
                            previewBlockType: previewBlockType,
                            contentString:$previewBlock.attr('data-edit-string')
                        });
                    }

                data.push({
                    rowType:rowType,
                    elements:elements
                });
            });

        return data;
    };


    function attachData(contentStringArr,$tmpSub){
        $.each(contentStringArr, function(indContent,dataContent){
            var name = dataContent.name,
                value = dataContent.value;
            
            
            switch(name){
                case 'pb_image':
                    $tmpSub.find('[data-type="'+name+'"]').text(value);
                    break;
                case 'pb_html':
                    $tmpSub.find('[data-type="'+name+'"]').html(value);
                    break;
                default:
                    $tmpSub.find('[data-type="'+name+'"]').text(value);
            }
        });

    }
    function buildPreviewContent($pagePreviewContent, pageData){
        if(typeof pageData === 'object' && pageData.length === 0){
            console.warn('No elements to build for page preview');
            return;
        }

        $.each(pageData, function(ind, data){
            var rowType = data.rowType,
                elements = data.elements,
                $tmpParent;
            
            $tmpParent = $(Page.templates.pageElements[rowType]);
            $pagePreviewContent.append($tmpParent);



            $.each(elements, function(indSub,dataSub){
                var previewBlockType = dataSub.previewBlockType,
                    contentStringArr = dataSub.contentString ? JSON.parse(dataSub.contentString) : false,
                    $tmpSub = $(Page.templates.pageElements[previewBlockType]);

                if(!contentStringArr){
                    console.warn('No data - buildPreviewContent');
                    return;
                }
                if(previewBlockType === 'columns'){
                    


                } else {
                    $tmpParent.html($tmpSub);
                    attachData(contentStringArr,$tmpSub);
                }
            });
            
        })
    };


    function clearPreviewContent(){
        $pageContents.html('');
    };

    PagePreview.subscribe("init:pagePreview", function() {
        $('#pbPreviewPage').on('click.pagePreview', function(e){
            e.preventDefault();
            $('html, body').css('overflow','hidden');
            $previewBox.show();
            var pageData = collectData($contentAllFlows);


            $contentAllFlows.each(function(ind,val){
                var $ths = $(this),
                    pageData = collectData($ths) || false,
                    $pagePreviewContent = $('.pb-page-content').eq(ind);
                
                if(pageData){
                    buildPreviewContent($pagePreviewContent, pageData);
                }
            });
        });

        $('#pbPreviewClose').on('click.pagePreview', function(e){
            $('html, body').css('overflow','');
            e.preventDefault();
            $previewBox.hide();
            clearPreviewContent();
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 27)  $('#pbPreviewClose').trigger('click.pagePreview');
        });
    });
}();