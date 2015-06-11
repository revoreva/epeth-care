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
		      	window.location.href = "userAdmin/index.html";
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
function getJenisKucing() {
  $.getJSON( url, {
    type: "getJenisKucing"
  } ).done( function( json ) {
    var selbox = '<select class="form-control" name="kategori-hewan-kucing" id="kategori-hewan-kucing">';
    console.log("selbox");
    $.each( json.listKategori, function( i, dat ) {
      selbox += '<option value="' + dat.NAMA_JENIS + '">' + dat.NAMA_JENIS + '</option>';
    } );

    selbox += '</select>';
    $('#kategori_kucing').html("");
    $(selbox).appendTo('#kategori_kucing');
  } );
}
function getPertanyaan() {
  $.getJSON( url, {
    type: "getPertanyaan"
  } ).done( function( json ) {
    var selbox = '<table width="100%" style="table-layout:fixed;">';
    $.each( json.listPertanyaan, function( i, dat ) {
      selbox += '<tr class="list-group-item">' +
                  '<td width="80%" style="table-layout:fixed;">' + dat.PERTANYAAN + '</td>' +
                  '<td width="10%"><label class="radio-inline"><input type="radio" name="opsi' + dat.ID_PERTANYAAN + '" value="" onclick="' + dat.FUNGSINAMBAH + '"> Ya </label></td>' +
                  '<td width="10%"><label class="radio-inline"><input type="radio" name="opsi' + dat.ID_PERTANYAAN + '" value="" onclick="' + dat.FUNGSIMINUS + '"> Tidak </label></td>' +
                  '</tr>';
    } );
    selbox += '</table>';
    $('#pertanyaan').html("");
    $(selbox).appendTo('#pertanyaan');
  } );
}
function getResultPenyakit(id) {
  $.getJSON( url, {
    type: "getResultPenyakit",
    ID: id
  } ).done( function( result ) {
    console.log("ubah");
    if ( result.STATUS == 'sukses' ) {
        //console.log("user login");
        window.location.href = "hasil.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        //window.location.href = "userAdmin/index.html";
    }
  } );
}
function showResultPenyakit() {
  console.log("1");
  var nama, deskripsi, pertolongan_pertama;
  $.getJSON( url, {
    type: "showResultPenyakit"
  } ).done( function( json ) {
    $.each( json.resultPenyakit, function( i, dat ) {
      console.log("2");
      nama = dat.NAMA_PENYAKIT;
      deskripsi = dat.DESKRIPSI;
      pertolongan_pertama = dat.PERTOLONGAN_PERTAMA;
    } );
    console.log("3");
    document.getElementById('namaPenyakit').innerHTML = nama;
    document.getElementById('deskripsi').innerHTML = deskripsi;
    document.getElementById('pertolongan_pertama').innerHTML = pertolongan_pertama;
  } );
}
/*kelola data gejala START*/
function getPertanyaanBuatEdit() {
  $.getJSON( url, {
    type: "getPertanyaan"
  } ).done( function( json ) {
    var selbox = '<table width="100%" style="table-layout:fixed;">';
    selbox += '<a href="#"><tr class="list-group-item"><td onclick="javascript:window.location.href=\'tambahgejala.html\'" colspan="3" class="btn btn-success center-block">Tambah Data</td></tr></a>';
    $.each( json.listPertanyaan, function( i, dat ) {
      selbox += '<tr class="list-group-item">' +
                  '<td width="80%" style="table-layout:fixed;"><label>Deskripsi Gejala Penyakit</label><input placeholder="Deskripsi Gejala" type="text" id="pertanyaanKe' + dat.ID_PERTANYAAN + '" class="form-control" value="' + dat.PERTANYAAN + '"></td>' +
                  '<td width="10%"><label class="radio-inline"><a class="btn btn-info center-block" onclick="updateGejala(' + dat.ID_PERTANYAAN + ')" href="#">Update</a> </label></td>' +
                  '<td width="10%"><label class="radio-inline"><a class="btn btn-danger center-block" onclick="hapusGejala(' + dat.ID_PERTANYAAN + ')" href="#">Hapus</a> </label></td>' +
                  '</tr>';
    } );
    selbox += '</table>';
    $('#pertanyaan').html("");
    $(selbox).appendTo('#pertanyaan');
  } );
}
function updateGejala(id) {
  var gejalaKe = "#pertanyaanKe" + id;
  console.log(gejalaKe);
  $.getJSON( url, {
    type: "updateGejala",
    ID: id,
    PERTANYAAN: $(gejalaKe).val()
  } ).done( function( result ) {
    console.log("ubah");
    if ( result.STATUS == 'sukses' ) {
        //console.log("user login");
        window.location.href = "reloadGejala.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        //window.location.href = "userAdmin/index.html";
    }
  } );
}
function hapusGejala(id) {
  $.getJSON( url, {
    type: "hapusGejala",
    ID: id
  } ).done( function( result ) {
    console.log("hapus");
    if ( result.STATUS == 'sukses' ) {
        //console.log("HAPUS sukses");
        window.location.href = "reloadGejala.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        //window.location.href = "userAdmin/index.html";
    }
  } );
}
function getListPenyakit() {
  $.getJSON( url, {
    type: "getListPenyakit"
  } ).done( function( json ) {
    var selbox = '<select class="form-control" id="penyakit_tujuan">';
    console.log("selbox");
    $.each( json.listPenyakit, function( i, dat ) {
      selbox += '<option value="' + dat.ID_PENYAKIT + '">' + dat.DIAGNOSIS + '</option>';
    } );
    selbox += '</select>';
    $('#penyakit').html("");
    $(selbox).appendTo('#penyakit');
  } );
}
function insertGejala() {
  $.getJSON( url, {
    type: "insertGejala",
    PERTANYAAN: $('#deskripsi_gejala').val(),
    FUNGSINAMBAH: "plusDiagnosis" + $('#penyakit_tujuan').val() + "()",
    FUNGSIMINUS: "minusDiagnosis" + $('#penyakit_tujuan').val() + "()"
  } ).done( function( result ) {
    //console.log("done");
      if ( result.STATUS == 'sukses' ) {
        //console.log("user login");
        window.location.href = "gejala.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        window.location.href = "gejala.html";
    }
  } );
}
/*kelola data gejala END*/
//-------------------------------------------------------------------------
/*kelola data penyakit START*/
function getPenyakitBuatEdit() {
  $.getJSON( url, {
    type: "getListPenyakit"
  } ).done( function( json ) {
    var selbox = '<table width="100%" style="table-layout:fixed;">';
    selbox += '<a href="#"><tr class="list-group-item"><td onclick="javascript:window.location.href=\'tambahpenyakit.html\'" colspan="3" class="btn btn-success center-block">Tambah Data</td></tr></a>';
    $.each( json.listPenyakit, function( i, dat ) {
      selbox += '<tr class="list-group-item">' +
                  '<td width="90%" style="table-layout:fixed;"><label>Nama Penyakit</label><input placeholder="Nama Penyakit" type="text" id="namaPenyakitKe' + dat.ID_PENYAKIT + '" class="form-control" value="' + dat.DIAGNOSIS + '"><br><label>Deskripsi Penyakit</label><input placeholder="Deskripsi Penyakit" type="text" id="deskripsiPenyakitKe' + dat.ID_PENYAKIT + '" class="form-control" value="' + dat.DESKRIPSI + '"><br><label>Pertolongan Pertama</label><input placeholder="Pertolongan Pertama" type="text" id="pertolonganPenyakitKe' + dat.ID_PENYAKIT + '" class="form-control" value="' + dat.PERTOLONGAN_PERTAMA + '"></td>' +
                  '<td width="10%" align="center"><label class="radio-inline"><a class="btn btn-info center-block" onclick="updatePenyakit(' + dat.ID_PENYAKIT + ')" href="#">Update</a> </label><br><br><label class="radio-inline"><a class="btn btn-danger center-block" onclick="hapusPenyakit(' + dat.ID_PENYAKIT + ')" href="#">Hapus</a> </label></td>' +
                  '</tr>';
    } );
    selbox += '</table>';
    $('#penyakit').html("");
    $(selbox).appendTo('#penyakit');
  } );
}
function updatePenyakit(id) {
  var namaPenyakitKe = "#namaPenyakitKe" + id;
  var deskripsiPenyakitKe = "#deskripsiPenyakitKe" + id;
  var pertolonganPenyakitKe = "#pertolonganPenyakitKe" + id;
  //console.log(gejalaKe);
  $.getJSON( url, {
    type: "updatePenyakit",
    ID: id,
    DIAGNOSIS: $(namaPenyakitKe).val(),
    DESKRIPSI: $(deskripsiPenyakitKe).val(),
    PERTOLONGAN_PERTAMA: $(pertolonganPenyakitKe).val()
  } ).done( function( result ) {
    //console.log("ubah");
    if ( result.STATUS == 'sukses' ) {
        //console.log("user login");
        window.location.href = "reloadPenyakit.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        window.location.href = "reloadPenyakit.html";
    }
  } );
}
function hapusPenyakit(id) {
  $.getJSON( url, {
    type: "hapusPenyakit",
    ID: id
  } ).done( function( result ) {
    //console.log("hapus");
    if ( result.STATUS == 'sukses' ) {
        //console.log("HAPUS sukses");
        window.location.href = "reloadPenyakit.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        window.location.href = "reloadPenyakit.html";
    }
  } );
}
function insertPenyakit() {
  $.getJSON( url, {
    type: "insertPenyakit",
    DIAGNOSIS: $(namaPenyakit).val(),
    DESKRIPSI: $(deskripsiPenyakit).val(),
    PERTOLONGAN_PERTAMA: $(pertolonganPenyakit).val()
  } ).done( function( result ) {
    //console.log("done");
      if ( result.STATUS == 'sukses' ) {
        //console.log("user login");
        window.location.href = "penyakit.html";
        //sessionStorage.userid = result.session;
    } else if ( result.STATUS == 'no' ){
        //console.log("admin login");
        window.location.href = "penyakit.html";
    }
  } );
}
/*kelola data penyakit END*/