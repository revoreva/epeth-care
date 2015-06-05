/* global variables */
var host = "dollycare.esy.es"
var port = "";     // jika default (80) maka isikan dengan empty string ""
var dir = "/phonegap-db-access/epeth.php"
var url = "http://" + host + port + dir;

/* initializer */
$( document ).ready( function() {
  refresh();

} );
function refresh() {

}

/* fungsi lain */

/* fungsi login and logout */
function login() {
	//console.log("login");
 	if ( $('#username').val() != "" && $('#password').val() != "" ) {
  		//console.log("user / pass ada");
	    $.getJSON( url, {
	      type: "login",
	      USERNAME: $('#username').val(),
	      PASSWORD: $('#password').val()
	    } ).done( function( result ) {
	    	//console.log("done");
	      	if ( result.STATUS == 'user' ) {
	      		//console.log("user login");
	        	window.location.href = "user/index.html";
	        	//sessionStorage.userid = result.session;
		    } else if ( result.STATUS == 'admin' ){
		      	//console.log("admin login");
		      	window.location.href = "admin/index.html";
		    } else {
		      	//console.log("gagal login");
		    	window.location.href = "index.html";
		    }
	    } );
  	}
  	else {
	  //console.log("user / pass kosong");
	  //$('#login-emptyfield').popup("open");
	}
}
function logout() {
  //
}
function getJenisAnjing() {
  $.getJSON( url, {
    type: "getJenisAnjing"
  } ).done( function( json ) {
    var selbox = '<select class="form-control" name="kategori-hewan-anjing" id="kategori-hewan-anjing">';
    console.log("selbox");
    $.each( json.listKategori, function( i, dat ) {
      selbox += '<option value="' + dat.NAMA_JENIS + '">' + dat.NAMA_JENIS + '</option>';
    } );

    selbox += '</select>';
    $('#kategori_anjing').html("");
    $(selbox).appendTo('#kategori_anjing');
  } );
}
function getPertanyaan() {
  $.getJSON( url, {
    type: "getPertanyaan"
  } ).done( function( json ) {
    var selbox = '<ul class="list-group">';
    $.each( json.listPertanyaan, function( i, dat ) {
      selbox += '<li class="list-group-item"><span href="#" class="btn-group btn-toggle pull-right"><button class="btn btn-xs btn-default" onclick="' + dat.fungsiNambah + '">Ya</button><button class="btn btn-xs btn-primary active" onclick="' + dat.fungsiMinus + '">Tidak</button></span>' + dat.pertanyaan + '</li>';
    } );
    selbox += '</ul>';
    $('#pertanyaan').html("");
    $(selbox).appendTo('#pertanyaan');
  } );
}
