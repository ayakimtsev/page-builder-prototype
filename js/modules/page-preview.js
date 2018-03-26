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
                    previewParentBlockType = $previewBlock.attr('data-blocktype'),
                    elements = [];


                    if(previewParentBlockType === 'columns'){
                        $previewBlock.find('.pb-inner-cell').each(function(){
                            var $ths = $(this);
                                $previewBlock = $ths.find('.pb-preview'),
                                previewBlockType = $previewBlock.attr('data-blocktype');


                            elements.push({
                                previewBlockType: previewBlockType,
                                contentString:$previewBlock.attr('data-edit-string')
                            });
                        });
                    } else{
                        elements.push({
                            previewBlockType: previewParentBlockType,
                            contentString:$previewBlock.attr('data-edit-string')
                        });
                    }

                data.push({
                    rowType:rowType,
                    columns:previewParentBlockType === 'columns',
                    elements:elements.reverse()
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
                    $tmpSub.find('img').attr('src', 'files/content/' + value);
                    break;
                case 'pb_html':
                    $tmpSub.find('[data-type="'+name+'"]').html(value);
                    break;
                default:
                    if(name === 'pb_link'){
                        if(value){
                            $tmpSub.find('[data-type="'+name+'"]').attr('href', 'http://'+value);
                        } else {
                            $tmpSub.find('[data-type="'+name+'"]').hide();
                        }
                        
                    } else {
                        $tmpSub.find('[data-type="'+name+'"]').text(value);
                    }
                    
            }
        });

    }
    function buildPreviewContent($pagePreviewContent, pageData){
        if(typeof pageData === 'object' && pageData.length === 0){
            console.warn('No elements to build for page preview');
            return;
        }

        $.each(pageData, function(ind, dataSub){
            var rowType = dataSub.rowType,
                elements = dataSub.elements,
                $tmpParent, $row;


            $tmpParent = $(Page.templates.pageElements[rowType]);
            $pagePreviewContent.append($tmpParent);

            if(dataSub.columns === true){
                var $colsCnt = elements.length;
                $row = $(Page.templates.pageElements['bs_row']);
                $row.attr('data-columns', $colsCnt);
                $tmpParent.html($row);
            }

            $.each(elements, function(indSub,dataInner){
                var previewBlockType = dataInner.previewBlockType,
                    contentStringArr = dataInner.contentString ? JSON.parse(dataInner.contentString) : false,
                    $tmpSub = $(Page.templates.pageElements[previewBlockType]);


                if(!contentStringArr){
                    console.warn('No data - buildPreviewContent');
                }

                if(dataSub.columns === true){
                    var $innerBlock = $(Page.templates.pageElements['bs_cell']);
                    $row.prepend($innerBlock);
                    $innerBlock.html($tmpSub);
                } else {
                    $tmpParent.html($tmpSub);
                }
                attachData(contentStringArr,$tmpSub);
            });
            
        })
    };


    function clearPreviewContent(){
        $pageContents.html('');
    };

    PagePreview.subscribe("init:pagePreview", function() {
        $('#pbPreviewPage').on('click.pagePreview', function(e){
            e.preventDefault();
            $('html, body').addClass('state-page-preview');
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
            $('html, body').removeClass('state-page-preview');
            e.preventDefault();
            $previewBox.hide();
            clearPreviewContent();
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 27)  $('#pbPreviewClose').trigger('click.pagePreview');
        });
    });
}();