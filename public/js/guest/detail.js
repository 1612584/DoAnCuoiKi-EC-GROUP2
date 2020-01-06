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

let alertSuccessElement = $('.alert-success');
let alertDangerElement = $('.alert-danger');
let priceInput = $('.price_input');
let priceNext = $('.price_next');
let pricePrev = $('.price_previous');
let favoriteBtn = $('.add_favorite');

let pathArray = window.location.pathname.split('/');
const idProduct = pathArray[pathArray.length -1]
const priceStep = converToNumber($('#price_step').text());
const priceCurr = converToNumber($('#price_current').text());
const priceNow = converToNumber($('#price_now').text());
const priceStart = converToNumber($('#price_start').text());



$('.bid_btn').on('click', async function(e) {
    let priceString = priceInput.val();
    let priceNumber = converToNumber(priceString);
    if (!isAuthenticated){
        var login = confirm("Bạn cần đăng nhập để thực hiện chức năng này");
        if (login) {
            window.location.href = '/login'
        }
    }
    else {
        var conf = confirm("Xác nhận đấu giá!");
        if (conf) {
            let res = await bid(idProduct, priceNumber)
            let { success, message, error } = res
            if(success) {
                alertSuccessElement.toggleClass('hidden')
                alertSuccessElement.append(message)
                window.scrollTo(0, 0)
                setTimeout(() => {
                    alertSuccessElement.toggleClass('hidden');
                    alertSuccessElement.empty();
                }, 5000)
            }
            else {
                alertDangerElement.toggleClass('hidden')
                alertDangerElement.append(error)
                window.scrollTo(0, 0)
                setTimeout(() => {
                    alertDangerElement.toggleClass('hidden')
                    alertDangerElement.empty()
                }, 5000)
            }
        }
    
    }
    
})

priceNext.on('click', function(e) {
    let currPrice = converToNumber(priceInput.val());

    currPrice = converToNumber(priceInput.val())  + priceStep;
    if(currPrice >= priceNow) {
        priceInput.val(`${priceNow} vnđ`)
    }
    else {
        priceInput.val(`${currPrice} vnđ`)
    }
})