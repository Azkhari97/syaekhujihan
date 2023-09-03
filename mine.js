window.onload = (e)=>{
  console.log("everything loaded");
  tamu();
  let bukaUndangan = document.getElementById('bukaUndangan');
  bukaUndangan.removeAttribute('disabled')
  bukaUndangan.onclick = function(e){
    console.log(e.target.parentNode.getAttribute('id'))
    document.body.style.setProperty("--play", "play");
    e.target.parentNode.parentNode.style.display = "none";
    togglePlay();
    window.scrollTo(0,0);
    //scrBtn.click()
  }
}
      
let audio = document.createElement('audio');
console.log(audio)
if("src" in audio){
     audio.src = "assets/audio-min.mp3";
     audio.currentTime = 4
}
      
      
function tamu(){
  let tujuan = document.location.href.split('?');
  
  if(tujuan.length > 1){
  tujuan = tujuan[tujuan.length-1].split("=")[1];
  let tamu = document.getElementById('tamu');
  tamu.innerHTML = "";
  let teksP = document.createElement('p');
  teksP.textContent = tujuan.replace("-", " ");
  tamu.appendChild(teksP)
  }
}
      

let playing = false
function togglePlay(){
  console.log(playing)
  if(playing == true){
     audio.pause()
     playing = false
  }
  else {
     audio.play()
     playing = true
  }
}
function scroll(x, y){
   window.scrollBy(x, y)
}


let scrBtn = document.getElementById('scroll');
let autoScroll = false;
scrBtn.addEventListener('click',(e)=>{
   if(autoScroll == false){
     autoScroll = true;
     let y = 0;
   let s = setInterval(()=>{
     scroll(0, 2)
     y+=2;
     if(autoScroll==false || y >= document.body.offsetHeight){
       clearInterval(s)
     }
   }, 50)
   }
   else {
     autoScroll = false
   }
})

let play = document.getElementById('play')
console.log(play)
play.addEventListener('click', togglePlay)

//couple section
let flowers = document.getElementsByClassName('flowers');
      
function flowering(){
   let couple = document.getElementById('couple');
   let height = couple.getBoundingClientRect().height;
   let width = couple.getBoundingClientRect().width;
     
   for(let flower of flowers){
      
      let top = Math.floor(Math.random() * height);
      let left = Math.floor(Math.random() * width);
      
      flower.style.top = top + "px"
      flower.style.left = left + "px"
   }
}

flowering();

let x = setInterval(flowering, 5000)
      
      
//Acara section
      
let koord = [-6.995901, 109.510453]
  
var map = L.map('map',{
    dragging : false,
  }
).setView(koord, 18);
  
let googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map)
 /* L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);*/
var marker = L.marker(koord).addTo(map);
marker.bindPopup("<a style='color: #000; text-decoration: none; text-align: center;' href='https://maps.app.goo.gl/pHZNfzJhv67RJzM48'>Dukuh Ponolawen, RT 16/ RW 6, Desa Ponolawen kulon Kecamatan Kesesi, Kabupaten Pekalongan, Jawa Tengah</a>");
  
      
//galeri section
let fotolist = document.getElementsByClassName('fl');
let preview = document.getElementById('preview');
preview.addEventListener('click', (e)=>{
   let div = document.createElement('div')
   let active = document.getElementsByClassName('active')[0];
   let body = document.body;
   div.setAttribute('style', "position: fixed; z-index: 20; width: 100vw; height: 100vh; top: 0; left:0; background: rgba(0,0,0,.8); background-image: url('"+active.src+"'); background-position: center center; background-repeat: no-repeat; background-size: contain;");
   div.setAttribute('class',"fadeIn");
   let close = document.createElement('button');
   close.textContent="Tutup";
   close.setAttribute('style',"position: absolute; left: 30%; width: 40%;bottom: 10%; background: transparent; color: #fff; border: 2px solid #fff; border-radius: 8px; box-shadow: none; padding: 3% 5%;")
   close.addEventListener('click', (a)=>{
      body.removeChild(div);
            //div.style.backgroundImage = `url("${fotolist[0].src}")`;
   })
          
   div.appendChild(close)
   
   let next = document.createElement("button");
   next.setAttribute('class', 'buatHover');
   
   div.appendChild(next);
   let urut = active.getAttribute('urut');
   urut = parseInt(urut);
   next.addEventListener('click', (e)=>{
       urut = parseInt(urut);
       if(urut + 1 >= n){
           urut = 0;
       }
       else {
           urut += 1;
       }
       console.log(urut)
       div.style.backgroundImage = `url('${fotolist[urut].src}')`;
   })
          
   let prev = document.createElement("button");
   prev.setAttribute('class','buatHover');
   div.appendChild(prev);
   prev.addEventListener('click',(e)=>{
      urut = parseInt(urut);
      if(urut - 1 < 0){
           urut = n - 1;
      }
      else {
           urut -= 1;
      }
      console.log(urut)
      div.style.backgroundImage = `url('${fotolist[urut].src}')`;
    })
          
    body.appendChild(div)
});
      
function tampilFoto(src){
    let a = document.createElement('div');
    a.setAttribute('class', "previewFoto");
    a.setAttribute('style',`background-image: url('${src}')`);
        
    a.classList.add(random());
        //a.setAttribute('data-aos', 'slide-down')
    preview.appendChild(a);
}
      
      
let n = 0;
for(let foto of fotolist){
        //console.log('for ok')
   foto.setAttribute('urut', n);
   foto.addEventListener('click', (e)=>{
      console.log("tes")
      tampilFoto(foto.src);
   })
   ++n;
}
      
let b = setInterval(carousel, 3000)
      
function carousel(){
    let active = document.getElementsByClassName('active')[0];
        
    let urut = active.getAttribute('urut');
    urut = parseInt(urut);
    if(urut + 1 >= n){
        urut = 0
    }
    else {
        urut += 1;
    }
    active.classList.remove('active')
    fotolist[urut].classList.add('active');
    gantiFoto();
}
      
function random(){
   let pilih = ["kiri","kiri", "tengah", "tengah", "kanan", "kanan"];
    return pilih[Math.round(Math.random()*(pilih.length-1))]
}
      
function gantiFoto(){
   let preview = document.getElementById('preview');
   let active = document.getElementsByClassName('active')[0];
        
   let a = document.createElement('div');
   a.setAttribute('class', "previewFoto");
   a.setAttribute('style',`background-image: url('${active.src}')`);
   a.classList.add(random());
        //a.setAttribute('data-aos', 'slide-down')
   preview.appendChild(a);
}
      
      
      //gift section
      
function toast(text){
   let toastIni = document.createElement('div');
    
   toastIni.setAttribute('style',"position: fixed; bottom: 10vh; width: 80%; padding: 5%; margin: 0 5%; background: rgba(120, 193, 243, .9); color: #fff; text-align: center; border-radius: 8px; z-index: 25; font-family: 'Montserrat', Sans-Serif;");
    
   toastIni.setAttribute('class','fadeIn');
   toastIni.innerHTML = `<p>${text}</p>`;
   document.body.appendChild(toastIni);

   setTimeout(()=>{
      toastIni.classList.remove('fadeIn');
      toastIni.classList.add('fadeOut');
      setTimeout(()=>{
        document.body.removeChild(toastIni)
      }, 1000);
   }, 2000);
    
}
    
function copy(ini, data) {
  // Get the text field
  //let teks = document.getElementById(coba);
   let copyText = document.createElement('input');
   copyText.value = data;
  //console.log(copyText.value);
  // Select the text field
   copyText.select();
   copyText.setSelectionRange(0, 99999);
  // For mobile devices
   // Copy the text inside the text field
   navigator.clipboard.writeText(copyText.value)
   .then(
      v => {
         toast('Rekening disalin: ' + copyText.value)
         ini.textContent = "Disalin!"
      },
      e => toast(e.toString())//console.log(e.toString())
   );
}
      
let WadahPesan = document.getElementsByClassName('c-pesan')[0];
      
function pesanList(){
   let d = document.createElement('div');
   d.setAttribute('class','pesan');
   d.innerHTML = `
        <p>
          Pengirim
          </p>
          <span>tanggal</span>
          <span class="konfirmasi">Hadir/Tidak Hadir</span>
          
          <pre>Some wishes from your beloved friends</pre>
   `;
    WadahPesan.appendChild(d);
}

for(let n = 0; n<5; n++){
    pesanList();
}
      
function tulisPesan(){
    let p = document.createElement('div');
    p.setAttribute('class', "modal-pesan");
    p.setAttribute('data-aos', "fade-up");
    p.innerHTML = `
        <input id="nama" type="text" placeholder="Masukan namamu di sini" />
        <input id="tanggal" type="text" value="" readonly />
        <select id="konfirmasi">
          <option value="">Konfirmasi Kehadiran</option>
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>
        <textarea id="pesanmu" placeholder="Masukan pesanmu di sini"></textarea>
        
        <button id="batal">Batal</button>
        <button id="kirim">Kirim Pesan</button>
    `;
        
    document.body.appendChild(p)
    let nama = document.getElementById('nama')
    let tanggal = document.getElementById('tanggal')
    let konfirmasi = document.getElementById('konfirmasi')
    let pesanmu = document.getElementById('pesanmu')
    let batal = document.getElementById('batal')
    let kirim = document.getElementById('kirim')
        
    let date = new Date();
    let bulan = date.getMonth()+1;
    if(bulan.length < 2){
        bulan = "0" + bulan;
    }
    tanggal.value = date.getHours() + ':' + date.getMinutes() + ", " + date.getDate() + '/' + bulan + '/' + date.getFullYear()
        
    batal.addEventListener('click', (e)=>{
        document.body.removeChild(p)
    })
        
    kirim.addEventListener('click', (e)=>{
        let data = {}
        data.nama = nama.value;
        data.tanggal = tanggal.value;
        data.konfirmasi = konfirmasi.value;
        data.pesan = pesanmu.value;
          
        if(data.nama == "" || data.pesan == "" || data.konfirmasi){
            toast("Masukan nama dan pesanmu serta konfirmasi kehadiran.");
        }
        console.log(data)
    })
}


let waktuAcara = new Date("Sep 25, 2023 09:00:00").getTime();
function timer(){
  
  let waktu = new Date().getTime();
  let durasi = waktuAcara - waktu;
  
  if(durasi <= 0){
    return "selesai"
  }
  
  let hari = Math.floor(durasi/1000/60/60/24);
  let jam = Math.floor((durasi % (1000*60*60*24))/1000/60/60);
  let menit = Math.floor((durasi % (60*60*1000))/1000/60);
  let detik = Math.floor((durasi % (60*1000))/1000);
  console.log(hari + ", " + jam + ", " +menit + ", " + detik);
  
  return [hari, jam, menit, detik];
}

function countDown(arr = []){
  let counts = document.getElementsByClassName('count')
  
  for(let m = 0; m<counts.length; ++m){
    counts[m].textContent = arr[m];
  }
}

let c = setInterval(()=>{
  let arr = timer();
  //console.log(arr)
  if(arr == "selesai"){
    document.getElementById('counter').innerHTML =`
    <div class="selesai">
    Acara sudah dimulai
    </div>
    `;
  }
  else{
   countDown(arr);
  }
}, 1000);
