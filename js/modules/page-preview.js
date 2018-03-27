!function() {
    var PagePreview = {},
        $body = $('body'),
        $previewBox = $('#pbPreviewBox'),
        $contentAllFlows = $('.pb-content-flow'),
        $pageContents = $('.pb-page-content');
        
    Mediator.installTo(PagePreview);

    function collectData($flows){
        var flowsData = [];


        $flows.each(function(){
            var $thsFlow = $(this);
                tmpData = [];


            $thsFlow.find('.state-dropped[data-type="full"], .state-dropped[data-type="content"]')
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
                        } else {
                            elements.push({
                                previewBlockType: previewParentBlockType,
                                contentString:$previewBlock.attr('data-edit-string')
                            });
                        }

                        tmpData.push({
                            rowType:rowType,
                            columns:previewParentBlockType === 'columns',
                            elements:elements.reverse()
                        });
                    });
            flowsData.push(tmpData);
        });
            

        return flowsData;
    };


    function attachData(contentStringArr,$tmpSub){
        var hasImage = false,
            hasLinkTitle = false,
            hasLink = false,
            link = '';

        $.each(contentStringArr, function(indContent,dataContent){
            var name = dataContent.name,
                value = dataContent.value;
            

            switch(name){
                case 'pb_image':
                    if(value) hasImage = true;
                    $tmpSub.find('[data-type="'+name+'"]').text(value);
                    $tmpSub.find('img').attr('src', 'files/content/' + value);
                    break;
                case 'pb_html':
                    $tmpSub.find('[data-type="'+name+'"]').html(value);
                    break;
                case 'pb_linktitle':
                    if(value) hasLinkTitle = true;
                    $tmpSub.find('[data-type="'+name+'"]').text(value);
                    break;
                case 'pb_link':
                    if(value){
                        hasLink = true;
                        link = 'http://'+value;
                        $tmpSub.find('[data-type="'+name+'"]').attr('href', link);
                    } else {
                        $tmpSub.find('[data-type="'+name+'"]').hide();
                    }
                    break;
                default:
                    $tmpSub.find('[data-type="'+name+'"]').text(value);
            }



        });
        if(hasImage && hasLink && !hasLinkTitle){
            $tmpSub.find('[data-type="pb_link"]').hide();
            $tmpSub.append('<a target="_blank" href="'+link+'" class="pb-banner-full-link"></a>');
        }
    }
    function buildPreviewContent($pagePreviewContent, pageData){
        if(typeof pageData === 'object' && pageData.length === 0 || typeof pageData === 'undefined'){
            console.warn('No elements to build for page preview');
            return;
        }

        $.each(pageData, function(ind, dataSub){
            var rowType = dataSub.rowType,
                elements = dataSub.elements,
                isColumns = dataSub.columns,
                $tmpParent, $row;


            $tmpParent = $(Page.templates.pageElements[rowType]);
            $pagePreviewContent.append($tmpParent);

            if(isColumns === true){
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

                if(isColumns === true){
                    var $innerBlock = $(Page.templates.pageElements['bs_cell']);
                    $row.prepend($innerBlock);
                    $innerBlock.html($tmpSub);
                } else {
                    $tmpParent.html($tmpSub);
                }
                attachData(contentStringArr,$tmpSub);
            });
        });
    };


    function clearPreviewContent(){
        $pageContents.html('');
    };

    PagePreview.subscribe("init:pagePreview", function() {
        $('#pbPreviewPage').off('click.pagePreview').on('click.pagePreview', function(e){
            e.preventDefault();
            $('html, body').addClass('state-page-preview');
            $previewBox.show();
            $contentAllFlows = $('.pb-content-flow');

            var pageData = collectData($contentAllFlows) || false;


            $contentAllFlows.each(function(ind,val){
                var $ths = $(this),
                    $pagePreviewContent = $('.pb-page-content').eq(ind);
                if(pageData){
                    buildPreviewContent($pagePreviewContent, pageData[ind]);
                }
            });
        });

        $('#pbPreviewClose').off('click.pagePreview').on('click.pagePreview', function(e){
            $('html, body').removeClass('state-page-preview');
            e.preventDefault();
            $previewBox.hide();
            clearPreviewContent();
        });

        $(document).off('keyup.pagePreview').on('keyup',function(e) {
            if (e.keyCode === 27)  $('#pbPreviewClose').trigger('click.pagePreview');
        });
    });
}();