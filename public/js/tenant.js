// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/tenant/tenantlist', function( data ) {
    	userListData = data
        // For each item in our JSON, add a table row and cells to the content string
        var i = 0;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td> '+ (i + 1) + '</td>';
            tableContent += '<td> <img src='+ this.image + ' width=50px height=50px></td>';
            tableContent += '<td> '+ this.category + '</td>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
            i = i + 1;
        });
        // Inject the whole content string into our existing HTML table
        $('#tenant tbody').html(tableContent);
    });
};