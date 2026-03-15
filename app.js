let app=document.getElementById("app")

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

if(u=="admin" && p=="12345"){

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
<p>Dashboard Kendaraan</p>

</header>

<div class="container">

<div class="card">

<h3>Statistik</h3>

<p>Total Nasabah : ${nasabah.length}</p>
<p>Total Gadai : ${gadai.length}</p>

</div>

<div class="card">

<h3>Menu Utama</h3>

<div class="grid">

<div class="icon" onclick="nasabah()">Nasabah</div>
<div class="icon" onclick="gadai()">Gadai</div>
<div class="icon">Pembayaran</div>
<div class="icon">Laporan</div>

</div>

</div>

</div>

<div class="bottomnav">

<div onclick="dashboard()">Home</div>
<div onclick="nasabah()">Nasabah</div>
<div onclick="gadai()">Gadai</div>
<div>Laporan</div>

</div>

`

}

function nasabah(){

app.innerHTML=`

<header>
<h2>Data Nasabah</h2>
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

nasabah()

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

function gadai(){

app.innerHTML=`

<header>
<h2>Gadai Kendaraan</h2>
</header>

<div class="container">

<div class="card">

<input id="nama" placeholder="Nama Nasabah">
<input id="jenis" placeholder="Jenis Kendaraan (Motor/Mobil)">
<input id="merk" placeholder="Merk Kendaraan">
<input id="plat" placeholder="Nomor Polisi">

<input id="pinjaman" placeholder="Nilai Pinjaman">

<button onclick="simpanGadai()">Simpan Gadai</button>

</div>

</div>

`

}

function simpanGadai(){

let nama=document.getElementById("nama").value
let jenis=document.getElementById("jenis").value
let merk=document.getElementById("merk").value
let plat=document.getElementById("plat").value
let pinjaman=document.getElementById("pinjaman").value

let data=JSON.parse(localStorage.getItem("gadai")) || []

data.push({nama,jenis,merk,plat,pinjaman})

localStorage.setItem("gadai",JSON.stringify(data))

dashboard()

}

loginPage()
