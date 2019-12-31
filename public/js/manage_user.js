

$(window).on("load", async function () {
    // do something

});

// api

async function getUser(id) {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/get_user?id=${id}`);
    let {user} = await response.json();
    return user
}

async function deleteUser(id) {
    
    let response = await fetch(`http://localhost:3006/admin/users/api/delete_user?id=${id}`);
    let status = await response.json();
    return status
}

// component html
function showGetModal(id) {
    
    return `
    <div  class="modal fade" id="getUser"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Thông tin chi tiết</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <!-- Form -->
                <form class="nfo_form" role="form" data-id=${id}>
                        <div class="card-body">
                          <div class="form-group">
                            <label>Id</label>
                            <input value="hehe" disabled="disabled" type="text" class="form-control" id="nfo_id" placeholder="Read Only">
                          </div>
                          <div class="form-group">
                            <label>Họ tên</label>
                            <input disabled="disabled" type="text" class="form-control" id="nfo_fullname" placeholder="Read Only">
                          </div>
                          <div class="form-group">
                            <label>Email address</label>
                            <input disabled="disabled" type="text" class="form-control" id="nfo_email" placeholder="Read Only">
                          </div>
                          <div class="form-group">
                            <label>...</label>
                            <input disabled="disabled" type="email" class="form-control" id="exampleInputEmail1" placeholder="Read Only">
                          </div>
    
                        </div>
                        <!-- /.card-body -->
        
                        
                      </form>
                <!-- End Form -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              
            </div>
          </div>
        </div>
      </div>
    `
}

function showChangeModal(id) {
    return `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Chỉnh sủa thông tin người dùng</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="height: 430px; overflow-y: scroll">
                <!-- Form -->
                <form id="change_form" role="form" class="nfo_form" data-id=${id} method="POST" action="/admin/api/update_user?id=${id}">
                        <div class="card-body">
                          <div class="form-group">
                            <label>Id</label>
                            <input disabled="disabled" type="text" class="form-control" id="change_id" placeholder="Read Only">
                          </div>
                          <div class="form-group">
                            <label>Username</label>
                            <input disabled="disabled" type="text" class="form-control" id="change_username" placeholder="Read Only">
                          </div>
                          <div class="form-group">
                            <label for="change_fullname">Họ tên</label>
                            <input name="fullName" type="text" class="form-control" id="change_fullname" placeholder="Change it">
                          </div>
                          
                          
                          
                        </div>
                        <!-- /.card-body -->
        
                        
                      </form>
                <!-- End Form -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" form="change_form" id="submit" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `
}

// xử lý nút xóa
$('.del_btn').click( async function(e) {
    
    const id = e.currentTarget.getAttribute('data-id');
    const status = await deleteUser(id)
    // Xử lý thông báo ...
    console.log(status)
    location.reload(0)
    
})

// xử lý nút get thông tin chi tiết
$('.get_modal').click(async function(e) {
  const id = e.currentTarget.getAttribute('data-id')
  
  $('#modal_get').empty();
  
  
  $('#modal_get').append(showGetModal(id));

})

// Xử lí nút update thông tin
$('.change_modal').click(function(e) {
  const id = e.currentTarget.getAttribute('data-id')
  $('#modal_change').empty();
  $('#modal_change').append(showChangeModal(id));
})

// Load xong modal lấy dữ liệu cho vô modal
$('#modal_get').on('shown.bs.modal', async function (e) {
    const id = $('.nfo_form').attr('data-id');
    const user = await getUser(id)
    $('#nfo_id').val(user._id)
})

$('#modal_change').on('shown.bs.modal', async function (e) {
    const id = $('#change_form').attr('data-id');
    const user = await getUser(id)
    
    $('#change_id').val(user._id)
    $('#change_username').val(user.userName)
    $('#change_fullname').val(user.fullName)

    $('#submit').click(async function(e){
        
        
        
    })
})
