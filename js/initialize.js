Mediator.publish('init:elements', '.pb-elements-list .pb-element');
Mediator.publish('init:devicesNav', '.pb-devices > a');
Mediator.publish('init:layouts', '.pb-layout');











/* ---------------------------------------------------------------------------------------------- */

/* block */
    /* - tools list */
    /* tool */
    /* tools previews */
// function Block(element){
//     this.$elm = $(element);
//     this.type = '';

//     this.getType = function(){
//         return this.type;
//     }
// }

// Block.prototype.initDragable = function(){
//     //this.type = this.$elm.attr('data-type');

//     // this.$elm.draggable({
//     //     revert: true,
//     //     revertDuration: 0,
//     //     opacity: 0.35
//     // });
// };

// Block.prototype.offDragable = function(){
    

// };

// $('.pb-element').each(function(){
//     var inst = new Block(this);

//     inst.initDragable();
//     $(this).data('draggable-instance', inst);
// });



/* page builder */
    /* layout switcher */
    /* flows */
        /* layouts */

// function Block(element){


// }



    

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
