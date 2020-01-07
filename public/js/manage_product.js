$(window).on("load", async function () {
    // do something

});

async function getProduct(id) {

    let response = await fetch(`/admin/products/${id}`);
    //console.log(response)
    if(response.status==500)return null;
    else{
        let product = await response.json();
        let status = "đang hoạt động";
        
        if (product.data[0].active == false) {
            status = "đã gỡ bỏ"
        }
        product.data[0].status = status;
        return product;
    }
       

}


$('form').on('click','a',async(event)=>{
    const productId = $(event.target).closest('a').data('id');
    console.log('click on detail product ' + productId);
    const product = await getProduct(productId);

})


$('.form-inline').on('click', 'button', async (event) => {
    event.preventDefault();
    console.log('click on ' + $('form').find('input[type="search"]').val());

    const productId = $('form').find('input[type="search"]').val();
    let res = await getProduct(productId);

    console.log(res)
  
    $('table tbody').empty(); 
    if(res==null)return;  
    let product = res.data;
    if(res.status=="1"){
        $('table tbody').append(`
        <tr>
        <td>${product[0]._id}</td>
        <td>${product[0].name}</td>
        <td>${product[0].category.name}
                                </td>
        <td>${product[0].priceStart}</td>
        <td> ${product[0].createdAt}</td>
        <td>
            ${product[0].seller.lastName||""}
        </td>
        <td>
            ${product[0].status}
        </td>
        <td>
            <form action="/admin/products/${product[0]._id}/delete" method="POST">
                <button>
                    <i class="fas fa-trash">
    
                    </i>
                </button>
            </form>
    
    
        </td>
    </tr>
        `);
    }

    
})