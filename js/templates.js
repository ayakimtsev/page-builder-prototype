var Templates = (function(){
    return{
        $content: $('.pb-content'),
        $contentAllFlows: $('.pb-content-flow'),
        
        parentLayout: $('#pbTmpLayout').html().trim(),
        text: $('#pbTmpText').html().trim(),
        image: $('#pbTmpImage').html().trim(),
        columns: $('#pbTmpColumns').html().trim(),
        editPanel: $('#pbTmpEditPanel').html().trim(),
    }
})();

