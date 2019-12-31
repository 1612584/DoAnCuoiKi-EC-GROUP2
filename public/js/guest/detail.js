$('#swapHeart').on('click', function() {
    var $el = $(this),
    i_el =  $el.find('i')
    if (i_el.hasClass('fas')) {
        i_el.removeClass('fas');
        i_el.addClass('far')
    }
    else {
        i_el.removeClass('far');
        i_el.addClass('fas')
    }
});

console.log($('.nice-select'))
