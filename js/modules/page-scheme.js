!function () {
    var PageScheme = window.PageScheme = {};

    Mediator.installTo(PageScheme);

    var previewButton = $('#clear');
    previewButton.button();
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
        Mediator.publish('init:elements', '.pb-elements-list .pb-element:not([data-type="disabled"])');
        Mediator.publish('init:layouts', '.pb-content-flow');
        Mediator.publish("init:pagePreview");
        Mediator.publish('init:popups');
    });

    previewButton.on('click', function () {
        $('.pb-header, .pb-footer, .pb-pdp-header, .pb-plp-middle').toggleClass('show-scheme ');
    });

    /*  TODO:
        * retrieve needed dom elements
        * prepare page blueprints and use it for page-preview redrering
        * describe handlers on page scheme switch
    */
    PageScheme.subscribe('init:loadPageScheme', function () {
        loadPageScheme();
        Mediator.publish('init:elements', '.pb-elements-list .pb-element:not([data-type="disabled"])');
        Mediator.publish('init:layouts', '.pb-content-flow');
        Mediator.publish("init:pagePreview");
        Mediator.publish('init:popups');
    });

}();
