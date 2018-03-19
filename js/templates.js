var Templates = (function(){
    return{
        $content: $('.pb-content'),
        $contentAllFlows: $('.pb-content-flow'),
        
        nextBlockLayout: $('#pbTmpLayout').html().trim(),
        text: $('#pbTmpText').html().trim(),
        image: $('#pbTmpImage').html().trim(),
        columns: $('#pbTmpColumns').html().trim(),
        'edit-panel': $('#pbTmpEditPanel').html().trim(),
    }
})();

