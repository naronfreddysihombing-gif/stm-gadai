let app = document.getElementById("app")

function loginPage(){

app.innerHTML=`

<header>
<h2>STM GADAI</h2>
<p>Sepakat Tolong Menolong</p>
</header>

<div class="container">

<div class="card">

<h3>Login Admin</h3>

<input id="user" placeholder="Username">
<input id="pass" type="password" placeholder="Password">

<button onclick="login()">Masuk</button>

</div>

</div>

`

}

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u==="admin" && p==="12345"){
dashboard()
}else{
alert("Login Salah")
}

}

function dashboard(){

let nasabah=JSON.parse(localStorage.getItem("nasabah")) || []
let gadai=JSON.parse(localStorage.getItem("gadai")) || []

app.innerHTML=`

<header>
<h2>STM GADAI</h2>
<p>Dashboard</p>
</header>

<div class="container">

<div class="card">

<h3>Statistik</h3>

<p>Total Nasabah : ${nasabah.length}</p>
<p>Total Gadai : ${gadai.length}</p>

</div>

<div class="card">

<h3>Menu</h3>

<div class="grid">

<div class="icon" onclick="nasabahPage()">Nasabah</div>
<div class="icon" onclick="gadaiPage()">Gadai</div>

</div>

</div>

</div>

<div class="bottomnav">

<div onclick="dashboard()">Home</div>
<div onclick="nasabahPage()">Nasabah</div>
<div onclick="gadaiPage()">Gadai</div>

</div>

`

}

function nasabahPage(){

app.innerHTML=`

<header>
<h2>Data Nasabah</h2>
<button onclick="dashboard()">← Kembali</button>
</header>

<div class="container">

<div class="card">

<input id="nama" placeholder="Nama">
<input id="ktp" placeholder="Nomor KTP">
<input id="hp" placeholder="Nomor HP">
<input id="alamat" placeholder="Alamat">

<button onclick="simpanNasabah()">Simpan Nasabah</button>

</div>

<div class="card">

<h3>Daftar Nasabah</h3>

<table width="100%" border="1">

<tr>
<th>Nama</th>
<th>KTP</th>
<th>HP</th>
</tr>

<tbody id="listNasabah"></tbody>

</table>

</div>

</div>

`

tampilNasabah()

}

function simpanNasabah(){

let nama=document.getElementById("nama").value
let ktp=document.getElementById("ktp").value
let hp=document.getElementById("hp").value
let alamat=document.getElementById("alamat").value

let data=JSON.parse(localStorage.getItem("nasabah")) || []

data.push({nama,ktp,hp,alamat})

localStorage.setItem("nasabah",JSON.stringify(data))

nasabahPage()

}

function tampilNasabah(){

let data=JSON.parse(localStorage.getItem("nasabah")) || []

let html=""

data.forEach(n=>{

html+=`
<tr>
<td>${n.nama}</td>
<td>${n.ktp}</td>
<td>${n.hp}</td>
</tr>
`

})

document.getElementById("listNasabah").innerHTML=html

}

function gadaiPage(){

app.innerHTML=`

<header>
<h2>Gadai Kendaraan</h2>
<button onclick="dashboard()">← Kembali</button>
</header>

<div class="container">

<div class="card">

<input id="nama" placeholder="Nama Nasabah">

<select id="jenis">
<option>Motor</option>
<option>Mobil</option>
</select>

<input id="merk" placeholder="Merk Kendaraan">
<input id="plat" placeholder="Nomor Polisi">

<input id="pinjaman" placeholder="Nilai Pinjaman">

<button onclick="hitung()">Hitung Pinjaman</button>

<p id="hasil"></p>

<button onclick="simpanGadai()">Simpan Gadai</button>

</div>

<div class="card">

<h3>Gadai Aktif</h3>

<table width="100%" border="1">

<tr>
<th>Nama</th>
<th>Kendaraan</th>
<th>Pinjaman</th>
<th>Total</th>
</tr>

<tbody id="listGadai"></tbody>

</table>

</div>

</div>

`

tampilGadai()

}

function hitung(){

let pinjaman=parseInt(document.getElementById("pinjaman").value)

if(!pinjaman){
alert("Masukkan nilai pinjaman")
return
}

let bunga=pinjaman*0.10
let total=pinjaman+bunga

document.getElementById("hasil").innerHTML=
"Bunga 10% : "+bunga+"<br>Total Bayar : "+total

}

function simpanGadai(){

let nama=document.getElementById("nama").value
let jenis=document.getElementById("jenis").value
let merk=document.getElementById("merk").value
let plat=document.getElementById("plat").value
let pinjaman=parseInt(document.getElementById("pinjaman").value)

let bunga=pinjaman*0.10
let total=pinjaman+bunga

let data=JSON.parse(localStorage.getItem("gadai")) || []

data.push({nama,jenis,merk,plat,pinjaman,total})

localStorage.setItem("gadai",JSON.stringify(data))

gadaiPage()

}

function tampilGadai(){

let data=JSON.parse(localStorage.getItem("gadai")) || []

let html=""

data.forEach(g=>{

html+=`
<tr>
<td>${g.nama}</td>
<td>${g.jenis} ${g.merk}</td>
<td>${g.pinjaman}</td>
<td>${g.total}</td>
</tr>
`

})

document.getElementById("listGadai").innerHTML=html

}

loginPage()
