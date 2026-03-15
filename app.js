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

app.innerHTML=`

<header>

<h2>STM GADAI</h2>
<p>Dashboard</p>

</header>

<div class="container">

<div class="card">

<h3>Menu</h3>

<div class="grid">

<div class="icon" onclick="nasabah()">Nasabah</div>
<div class="icon">Gadai</div>
<div class="icon">Pembayaran</div>
<div class="icon">Laporan</div>

</div>

</div>

</div>

<div class="bottomnav">

<div onclick="dashboard()">Beranda</div>
<div onclick="nasabah()">Nasabah</div>
<div>Transaksi</div>
<div>Chat</div>

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

<input id="nama" placeholder="Nama Nasabah">
<input id="ktp" placeholder="Nomor KTP">
<input id="hp" placeholder="Nomor HP">

<button onclick="simpanNasabah()">Simpan</button>

</div>

<div class="card">

<h3>Daftar Nasabah</h3>

<table width="100%" border="1">

<tr>

<th>Nama</th>
<th>KTP</th>
<th>HP</th>

</tr>

<tbody id="listNasabah">

</tbody>

</table>

</div>

</div>

<div class="bottomnav">

<div onclick="dashboard()">Beranda</div>
<div onclick="nasabah()">Nasabah</div>
<div>Transaksi</div>
<div>Chat</div>

</div>

`

tampilNasabah()

}


function simpanNasabah(){

let nama=document.getElementById("nama").value
let ktp=document.getElementById("ktp").value
let hp=document.getElementById("hp").value

let data=JSON.parse(localStorage.getItem("nasabah")) || []

data.push({nama,ktp,hp})

localStorage.setItem("nasabah",JSON.stringify(data))

tampilNasabah()

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

loginPage()
