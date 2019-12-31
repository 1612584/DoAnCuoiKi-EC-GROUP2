var datatables; // use a global for the submit and return data rendering in the examples

var deleteURL = "/admin/categories/detele";
var updateURL = "/admin/categories/update";
var createURL = "/admin/categories/add";
var readURL = "/admin/categories/read";
var dt_css_selector = "#example";
var add_category_modal = '#add-category-modal';
var add_category_form = '#add-category-form';
var add_category_name = '#add-category-name';
var add_category_parent = '#add-category-parent';

var edit_category_modal = '#edit-category-modal';
var edit_category_form = '#edit-category-form';
var edit_category_id = '#edit-category-id';
var edit_category_name = '#edit-category-name';
var edit_category_parent = '#edit-category-parent';
var list_category = undefined;
function deleteData(id) {
  $.ajax({
    type: "POST",
    url: "/admin/categories/delete",
    data: { id: id },
    success: function (data) {
      $(dt_css_selector)
        .DataTable()
        .ajax.reload();
      console.log("Delete", data);
    },
    error: function (jqXHR, textStatus, err) {
      alert("text status " + textStatus + ", err " + err);
    }
  });
}
// Submit form
$('.category-modal-form').submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = $(this).attr("action"); //get form action url
	var request_method = $(this).attr("method"); //get form GET/POST method
	var form_data = $(this).serialize(); //Encode form elements for submission
	
	$.ajax({
		url : post_url,
		type: request_method,
		data : form_data
	}).done(function(response){ //
    console.log(response);
    alert("Thành công");
    datatables.ajax.reload();
    $('.modal').modal('hide');
	});
});
// Reset values form
$('.modal').on('hidden.bs.modal', function(){
  $(this).find('form')[0].reset();
});
// Add Category
function renderAddCategoryModal() {
  $(add_category_parent).empty();
  list_category.forEach(element => {
    $(add_category_parent).append(`
      <option value="${element._id}">${element.name}</option>
    `);
  });
  $(add_category_modal).modal('show');
}

// Edit Category
function renderEditCategoryModal(old_data) {
  $(edit_category_parent).empty();
  $(edit_category_id).val(old_data['_id']);
  $(edit_category_name).val(old_data['name']);
  list_category.forEach(element => {
    $(edit_category_parent).append(`
      <option value="${element._id}">${element.name}</option>
    `);
  });
  $(`${edit_category_parent} option:contains("${old_data['parent_category']}")`).attr('selected','selected');
  $(edit_category_modal).modal('show');
}

$(document).ready(function () {
  var table = $(dt_css_selector).DataTable({
    ajax: {
      url: readURL,
      dataSrc: function (json) {
        //Make your callback here.
        list_category = Array.from(json.return_data);
        list_render = json.return_data;
        for(var i = 0; i < list_render.length; i++) {
          if (list_render[i]['parent_category'] == "null") {
            list_render.splice(i, 1);
          }
      }
        return list_render;
      }
    },
    columns: [
      { data: "parent_category" },
      { data: "name" },
      {
        data: "_id",
        render: function (data, type, row) {
          return `<button type="button" onclick='deleteData("${data}")' class="btn btn-danger">Delete</button>`;
        }
      },
      {
        data: "",
        render: function (data, type, row) {
          return '<button type="button"  class="btn btn-primary btn-edit">Edit</button>';
        }
      }
    ],
    dom:
      "<'row'<'col-sm-2'l><'col-sm-6'B><'col-sm-4'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
      {
        action: function (e, dt, button, config) {
          renderAddCategoryModal();
        },
        className: "btn btn-secondary",
        text: "Add"
      }
    ]
  });
  datatables = table;

  $(dt_css_selector + ' tbody').on( 'click', '.btn-edit', function () {
    var data = table.row( $(this).parents('tr') ).data();
    renderEditCategoryModal(data);
    console.log(data);
} );
});
