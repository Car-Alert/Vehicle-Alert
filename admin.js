function generate(){

const owner=document.getElementById("owner").value;
const car=document.getElementById("car").value;
const number=document.getElementById("number").value;

const url=
"https://car-alert.github.io/Vehicle/?" +
"owner="+encodeURIComponent(owner)+
"&car="+encodeURIComponent(car)+
"&number="+encodeURIComponent(number);

const qr=
"https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="+
encodeURIComponent(url);

document.getElementById("result").innerHTML=`

<p><b>Vehicle URL</b></p>

<input value="${url}" readonly>

<br><br>

<img src="${qr}">

<br><br>

<button onclick="navigator.clipboard.writeText('${url}')">

Copy URL

</button>

`;

}