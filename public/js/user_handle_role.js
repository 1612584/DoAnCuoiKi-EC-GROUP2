
$(window).on("load", async function () {
    // do something
    console.log('start')
});


// api

async function upgrageBidder(id) {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/upgrage_bidder/${id}`);
    let {message} = await response.json();
    return message
}

async function upgrageAllBidder() {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/upgrage_bidder_all`);
    let {message} = await response.json();
    return message
}

async function backBidder(id) {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/back_bidder/${id}`);
    let message = await response.json();
    return message 
}

async function backAllBidder() {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/back_bidder_all`);
    let message = await response.json();
    return message 
}

// xử lý nút upgrade (duyệt 1)
$('.upgrade_btn').click( async function(e) {
    
    const id = e.currentTarget.getAttribute('data-id');
    const status = await upgrageBidder(id)
    // Xử lý thông báo ...
    console.log(status)
    location.reload(0)
    
})

// xử lý nút back_btn (hạ 1)
$('.back_btn').click( async function(e) {
    
    const id = e.currentTarget.getAttribute('data-id');
    const status = await backBidder(id)
    // Xử lý thông báo ...
    
    location.reload(0)
    
})

// Xử lý nút upgrade all
$('.upgrade_all_btn').click( async function(e) {
    
    const status = await upgrageAllBidder()
    // Xử lý thông báo ...
    console.log(status)
    location.reload(0)
    
})

// Xử lý nút hạ role all
$('.back_all_btn').click( async function(e) {

    const status = await backAllBidder()
    // Xử lý thông báo ...
    console.log(status)
    location.reload(0)
    
})
