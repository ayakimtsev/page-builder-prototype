var Templates = (function(){
    var self = this;
    return{
        $content: $('.pb-content'),
        $contentAllFlows: $('.pb-content-flow'),
        
        parentLayout: $('#pbTmpLayout').html().trim(),
        text: $('#pbTmpText').html().trim(),
        image: $('#pbTmpImage').html().trim(),
        columns: $('#pbTmpColumns').html().trim(),
        editPanel: $('#pbTmpEditPanel').html().trim(),

        // getHTML: function(name){
        //     if(typeof self[name] === 'undefined'){
        //         console.warn('There is not passed template - ' + name);
        //         return '';
        //     }
        //     return self[name];
        // },
        // getEditButtons: function(name){

        // }
    }
})();

