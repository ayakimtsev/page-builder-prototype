/* ---------------------------------------------------------------------------------------------- */

/* block */
    /* - tools list */
    /* tool */
    /* tools previews */



/* page builder */
    /* layout switcher */
    /* flows */
        /* layouts */

/* ---------------------------------------------------------------------------------------------- */










// var flagDebug = true,
//     debugLog = function(msg){
//         if(flagDebug) console.log(msg);
//     };




// function MutualOpts(){
//     debugLog('MutualOpts inited - ' + this.constructor.name);

//     this.$flow = $('#pbContentFlow');
//     this.$content = $('.pb-content');


//     function initDraggable(block){
//         $(block).draggable({
//             revert: true,
//             revertDuration: 0,
//             opacity: 0.35
//         });
//     };
    

//     if(this.draggable){
//         initDraggable();
//     }

// };


// function HistoryStack(){
//     debugLog('HistoryStack inited');
//     //var self = this;
//     var stack = [];
//     this.members = [];



//     function checkMemberDuplicate(){



//     }

//     this.addMember = function(memberName, memberInstance){
//         debugLog('HistoryStack > addMember handled('+memberName+')');

//         this.members.push({
//             name:memberName,
//             linkToInstance:memberInstance
//         })
//     }

//     this.pushStep = function(action){
//         debugLog('HistoryStack > popStep handled');


//     };
//     this.popStep = function(){
//         debugLog('HistoryStack > popStep handled');


//     };
// }


// function FlowLayout($flow){
//     MutualOpts.call(this);

//     this.rows = [];


//     function firstInit(){

//     }


//     function push(){


//     }
//     function pop(){

//     }




//     return{

//     }
// }


// function Block($element){
//     this.draggable = true;
//     //this.parrent = false;

//     MutualOpts.call(this);
// }

// function PreviewBlock(opts){
//     //MutualOpts.call(this);

//     this.draggable = false;
//     this.parrent = false;

//     $.extend(this, opts)
// }






// var _History = new HistoryStack();



// $('.pb-element').each(function(){
//     var blockImage = new Block(this),
//         type = $(this).attr('data-type');
    
//     _History.addMember(type, blockImage);
// });
