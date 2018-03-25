function initFileInput(){
    var wrapper = $( '.imagepath-selector' ),
        inp = wrapper.find( 'input[type="file"]' ),
        file = wrapper.find('input.pb-popup-file'),
        btn = wrapper.find( '.btn-select' ),
        deselect = wrapper.find('.btn-deselect');
        previewImg = wrapper.find('.image-preview img');

    btn.click(function(){
        inp.click();
    });

    deselect.click(function(){
        inp.add(file).val('');
        checkStates('');
    });
    function checkStates(file_name){
        if(file_name == '') {
            previewImg.closest('.image-preview').hide();
            deselect.prop('disabled', true);
        } else {
            deselect.prop('disabled', false)
            previewImg.attr('src', 'files/content/'+file_name)
                      .closest('.image-preview').show();
        }
    }
    var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( 'C:\\fakepath\\', '' );

        if( ! file_name.length )
            return;

        file.val(file_name);

        checkStates(file_name || file.val());

    }).change();
    checkStates(file.val());
}
