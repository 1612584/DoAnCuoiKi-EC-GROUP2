
let alertSuccessElement = $('.alert-success');
let alertDangerElement = $('.alert-danger');

$('#upgrade').on('click', async function(e) {
    let res = await upgrade();
    let { success, message, error } = res
    if(success) {
        alertSuccessElement.toggleClass('hidden')
        alertSuccessElement.append(message)
        window.scrollTo(0, 0)
        setTimeout(() => {
            alertSuccessElement.toggleClass('hidden')
            alertSuccessElement.empty()
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

})


async function upgrade(idProduct, price) {
    let response = await fetch(`http://localhost:3006/bidder/api/request_to_seller`)
    let responseJson = response.json();
    return responseJson;
}