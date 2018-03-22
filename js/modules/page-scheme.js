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

    PageScheme.init = function () {

    };
    /*
        retrieve needed elements
        describe handlers on page scheme switch
    */
}();