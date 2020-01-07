const pathArray = window.location.pathname.split('/');
const query = window.location.search;
const url = window.location.href;

let favoriteBtn = document.getElementsByClassName('add_favorite_list')[0];
$(window).on('load', function() {
  let alertSuccessElement = $('.alert-success');
  let alertDangerElement = $('.alert-danger');

  let itemPaginations = $('.page-link');
  let activedPagination = document.getElementsByClassName('page-link active')[0];
  let indexActived = 0;

  if(activedPagination) {
    indexActived = Number.parseInt(activedPagination.textContent)

  }

  // favoriteBtn.addEventListener("click", async function() {
    
  //   const idProduct = this.getAttribute('data-idProduct')
  //   let res = await addFavorite(idProduct)
  //   let { success, message, error } = res
  //   if(success) {
  //       alertSuccessElement.toggleClass('hidden')
  //       alertSuccessElement.append(message)
  //       window.scrollTo(0, 0)
  //       setTimeout(() => {
  //           alertSuccessElement.toggleClass('hidden')
  //           alertSuccessElement.empty()
  //       }, 5000)
  //   }
  //   else {
  //       alertDangerElement.toggleClass('hidden')
  //       alertDangerElement.append(error)
  //       window.scrollTo(0, 0)
  //       setTimeout(() => {
  //           alertDangerElement.toggleClass('hidden')
  //           alertDangerElement.empty()
  //       }, 5000)
  //   }
  // })

  handleheart = async function(idProduct) {
    let res = await addFavorite(idProduct)
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
  }
  
  itemPaginations.each(function(i) {
    
    if(i == 0) {
      if(indexActived != 1) {
        let res = url.replace(/page=[0-9][0-9]?/, `page=${indexActived-1}`)
        $(this).attr('href', res)
        
      }
      
    }
    else if(i == itemPaginations.length -1) {
      if(indexActived != itemPaginations.length -2) {
        let res = url.replace(/page=[0-9][0-9]?/, `page=${indexActived+1}`)
        $(this).attr('href', res)
      }
    }
    else {
      let res = url.replace(/page=[0-9][0-9]?/, `page=${i}`)
      if(res === url) {
        $(this).attr('href', res+`&page=${i}`)
      }
      else {
        $(this).attr('href', res)
      }
    }
    

  })


  $("#product-sorting").on('change', function() {
    console.log(typeof this.value)
    if(this.value === '0') {
      alert( 'Xin vui lòng chọn loại sắp xếp cho phù hợp' );
  
    }
    else {
      
      window.location.href = `/${pathArray[pathArray.length-1]}${query}&sort=${this.value}`
  
    }
  });

  async function addFavorite(idProduct) {
    
    let response = await fetch(`/bidder/api/add_to_favorite/${idProduct}`)
    let responseJson = response.json();
    return responseJson;
  }

})






