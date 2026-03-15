let app=document.getElementById("app")

function rupiah(x){
let number=x.replace(/\D/g,'')
return number.replace(/\B(?=(\d{3})+(?!\d))/g,".")
}

/* LOGIN */

function loginPage(){

app.innerHTML=`

<header>
<h2>STM GADAI PRO MAX</h2>
<p>Sistem Usaha Gadai Kendaraan</p>
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

/* DASHBOARD */

function dashboard(){

let nasabah=JSON.parse(localStorage.getItem("nasabah"))||[]
let gadai=JSON.parse(localStorage.getItem("gadai"))||[]

app.innerHTML=`

<header>
<h2>STM GADAI</h2>
<p>Dashboard</p>
</header>

<div class="container">

<div class="card">

<h3>Statistik Usaha</h3>

<p>Total Nasabah : ${nasabah.length}</p>

<p>Total Gadai : ${gadai.length}</p>

</div>

<div class="card">

<h3>Menu</h3>

<button onclick="nasabahPage()">Data Nasabah</button>

<button onclick="gadaiPage()">Gadai Kendaraan</button>

<button onclick="backup()">Backup Database</button>

<button onclick="resetData()">Reset Data</button>

</div>

</div>

`

}

/* NASABAH */

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

<input id="search" placeholder="Cari Nasabah"
onkeyup="cariNasabah()">

<table border="1" width="100%">

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

let data=JSON.parse(localStorage.getItem("nasabah"))||[]

data.push({nama,ktp,hp,alamat})

localStorage.setItem("nasabah",JSON.stringify(data))

nasabahPage()

}

function tampilNasabah(){

let data=JSON.parse(localStorage.getItem("nasabah"))||[]

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

function cariNasabah(){

let input=document.getElementById("search").value.toLowerCase()

let data=JSON.parse(localStorage.getItem("nasabah"))||[]

let html=""

data.forEach(n=>{

if(n.nama.toLowerCase().includes(input)){

html+=`

<tr>

<td>${n.nama}</td>
<td>${n.ktp}</td>
<td>${n.hp}</td>

</tr>

`

}

})

document.getElementById("listNasabah").innerHTML=html

}

/* GADAI */

function gadaiPage(){

let nasabah=JSON.parse(localStorage.getItem("nasabah"))||[]

let option=""

nasabah.forEach(n=>{

option+=`<option>${n.nama}</option>`

})

app.innerHTML=`

<header>

<h2>Gadai Kendaraan</h2>

<button onclick="dashboard()">← Kembali</button>

</header>

<div class="container">

<div class="card">

<select id="nama">

<option>Pilih Nasabah</option>

${option}

</select>

<select id="jenis">

<option>Motor</option>

<option>Mobil</option>

</select>

<input id="merk" placeholder="Merk Kendaraan">

<input id="plat" placeholder="Nomor Polisi">

<input id="pinjaman"
placeholder="Nilai Pinjaman"
onkeyup="this.value=rupiah(this.value)">

<button onclick="hitung()">Hitung Pinjaman</button>

<p id="hasil"></p>

<button onclick="simpanGadai()">Simpan Gadai</button>

</div>

<div class="card">

<h3>Gadai Aktif</h3>

<table border="1" width="100%">

<tr>

<th>Nama</th>
<th>Kendaraan</th>
<th>Pinjaman</th>
<th>Total</th>
<th>Tempo</th>

</tr>

<tbody id="listGadai"></tbody>

</table>

</div>

</div>

`

tampilGadai()

}

/* HITUNG */

function hitung(){

let pinjaman=document.getElementById("pinjaman").value.replace(/\./g,"")

pinjaman=parseInt(pinjaman)

if(!pinjaman){

alert("Masukkan pinjaman")

return

}

let bunga=pinjaman*0.10

let total=pinjaman+bunga

document.getElementById("hasil").innerHTML=

"Bunga 10% : "+rupiah(bunga.toString())+

"<br>Total Bayar : "+rupiah(total.toString())

}

/* SIMPAN GADAI */

function simpanGadai(){

let nama=document.getElementById("nama").value

let jenis=document.getElementById("jenis").value

let merk=document.getElementById("merk").value

let plat=document.getElementById("plat").value

let pinjaman=document.getElementById("pinjaman").value.replace(/\./g,"")

pinjaman=parseInt(pinjaman)

let bunga=pinjaman*0.10

let total=pinjaman+bunga

let today=new Date()

today.setDate(today.getDate()+30)

let tempo=today.toLocaleDateString()

let data=JSON.parse(localStorage.getItem("gadai"))||[]

data.push({nama,jenis,merk,plat,pinjaman,total,tempo})

localStorage.setItem("gadai",JSON.stringify(data))

gadaiPage()

}

/* TAMPIL DATA GADAI */

function tampilGadai(){

let data=JSON.parse(localStorage.getItem("gadai"))||[]

let html=""

data.forEach(g=>{

html+=`

<tr>

<td>${g.nama}</td>

<td>${g.jenis} ${g.merk}</td>

<td>${rupiah(g.pinjaman.toString())}</td>

<td>${rupiah(g.total.toString())}</td>

<td>${g.tempo}</td>

</tr>

`

})

document.getElementById("listGadai").innerHTML=html

}

/* BACKUP DATABASE */

function backup(){

let data={

nasabah:JSON.parse(localStorage.getItem("nasabah"))||[],

gadai:JSON.parse(localStorage.getItem("gadai"))||[]

}

alert(JSON.stringify(data))

}

/* RESET DATA */

function resetData(){

if(confirm("Hapus semua data?")){

localStorage.clear()

dashboard()

}

}

loginPage()
