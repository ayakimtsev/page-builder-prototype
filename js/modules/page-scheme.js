!function () {
    var PageScheme = window.PageScheme = {};

    Mediator.installTo(PageScheme);

    var clearButton = $('#clear');
    clearButton.button();
    var schemeSwitcher = $('#pageSchemeSwitcher');
    schemeSwitcher.selectmenu();

    var testBlueprints = {
        'flexi-page': [
            {
                capture: 'sana-header',
                editable: false
            },
            {
                capture: 'content',
                editable: true
            },
            {
                capture: 'sana-footer',
                editable: false
            }
        ],
        'product-details-page': [
            {
                capture: 'sana-header',
                editable: false
            },
            {
                capture: 'product-details-header',
                editable: false
            },
            {
                capture: 'content',
                editable: true
            },
            {
                capture: 'sana-footer',
                editable: false
            }
        ],
        'product-list-page': [
            {
                capture: 'sana-header',
                editable: false
            },
            {
                capture: 'content',
                editable: true
            },
            {
                capture: 'product-list-middle',
                editable: false
            },
            {
                capture: 'content',
                editable: true
            },
            {
                capture: 'sana-footer',
                editable: false
            }
        ]
    };

    var detectPageScheme = function () {
        return schemeSwitcher.val();
    }

    var loadPageScheme = function () {
        var schemeName = detectPageScheme();
        var blueprint = testBlueprints[schemeName];
        var fragment = $(document.createDocumentFragment());

        $.each(blueprint, function (index, scheme) {
            fragment.append($('#' + scheme.capture).html().trim());
        })
        $('.pb-content').html('');
        $('.pb-content').append(fragment);
    }

    schemeSwitcher.on('selectmenuchange', function () {
        loadPageScheme();
        Mediator.publish('init:elements', '.pb-elements-list .pb-element');
        Mediator.publish('init:layouts', '.pb-content-flow');
    });

    clearButton.on('click', function () {
        var content = $('.pb-content');
        content.html('');
    });

    /*  TODO:
        * retrieve needed dom elements
        * prepare page blueprints and use it for page-preview redrering
        * describe handlers on page scheme switch
    */
    PageScheme.subscribe('init:loadPageScheme', function () {
        loadPageScheme();
        Mediator.publish('init:elements', '.pb-elements-list .pb-element');
        Mediator.publish('init:layouts', '.pb-content-flow');
    });

}();