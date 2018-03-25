/* ---------------------------------------------------------------------------------------------- */

/* block */
    /* - elements list */
        /* element */
        /* elements previews */
            /* edit panel */


/* page builder */
    /* layout switcher */
    /* flows */
        /* edit panel */
        
        /* layouts */
            /* edit panel */

/* ---------------------------------------------------------------------------------------------- */

Mediator.publish('init:devicesNav', '.pb-devices > a');
Mediator.publish('init:elements', '.pb-elements-list .pb-element');
Mediator.publish('init:layouts', '.pb-content-flow');
Mediator.publish('init:popups');
Mediator.publish("init:pagePreview");




