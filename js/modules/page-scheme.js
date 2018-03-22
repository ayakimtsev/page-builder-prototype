!function () {
    var PageScheme = window.PageScheme = {};

    var buttons = $('button');

    function resetButtonsState() {
        buttons.each(function (index, button) {
            $(button).attr('aria-pressed', false);
        });
    }

    buttons.on('click', function () {
        resetButtonsState();

        $(this).attr('aria-pressed', true);
    });

    PageScheme.init = function (blueprints) {
        // take blueprints objects
        // 
    };
    /*  TODO:
        * retrieve needed dom elements
        * prepare page blueprints and use it for page-preview redrering
        * describe handlers on page scheme switch
    */
}();