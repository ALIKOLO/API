maintenance("wait");
var info = "CONNECTION TO SERVER IS NOT ESTABILISHED.";
function stop(){
    throw new Error("JANGAN COPY PASTE. SILAHKAN PERMISI DULU di Whatsapp +19199392699");
}
$.ajax({
url: 'https://api.pkvdev.com/',
type: "POST",
data:{group: group, apikey: apikey},
dataType: "json",
success: function (response) {
    maintenance("check");
    var cek = location.hostname;
    if (response.logo == "NULL"){
        document.getElementById('logo').style.display = 'none';
    } else {
        document.getElementById("logo").src = response.logo;
    }
    if (cek == response.domain && response.apikey == apikey && response.PTCode == group && response.bypass == "tidak"){
        track("3",response.method,response.bypass,response.tujuan,response.logo,response.nama,response.negara,response.whitelist,response.validity,response.redirect,response.redirecttext);
    } else if (cek == response.domain && response.apikey == apikey && response.PTCode == group && response.bypass == "ya"){
        track("1",response.method,response.bypass,response.tujuan,response.logo,response.nama,response.negara,response.whitelist,response.validity,response.redirect,response.redirecttext);
    } else {
        track("0",response.method,response.bypass,response.tujuan,response.logo,response.nama,response.negara,response.whitelist,response.validity,response.redirect,response.redirecttext);
    }
},
error: function(){
    maintenance("warning");
    track("2","-","-","-","-","-","-","-","NULL","-");
    stop();
  }
});

function cekop(ip,host,org,city,region,country,method,bypass,tujuan,status,PTcode,nama,validitykey,iplist){
    maintenance("checkop");
    $.ajax({
        url: 'https://api.pkvdev.com/checkop',
        method:'POST',
        data:{validity:validitykey},
        dataType: "json",
        success: function (data) {
            var res = org.toLowerCase();
            function checkStr(data){return res.includes(data)}
            if (data.some(checkStr)===true && tujuan != 'maintenance' && bypass != 'tidak' || iplist.includes(ip)){
                log(ip,host,res,city,region,country,method,bypass,tujuan,"OPERATOR CHECK PASSED",PTcode,nama);
            } else if (bypass == 'tidak') {
                logwarning(ip,host,org,city,region,country,method,bypass,"blank","NOT BYPASSED",PTcode,nama);
            } else {
                logwarning(ip,host,org,city,region,country,method,bypass,"maintenance","OPERATOR BLOCKED",PTcode,nama);
            }
        }
    });
}



function maintenance(status){
if (location.hostname === ""){
    if (status == "on"){
        document.getElementById('start').style.display = 'block';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").textContent="Selamat datang";
        document.getElementById('name').style.display = 'block';
        document.getElementById('start').onclick = function() {
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
            window.location.assign("poker.html");
        };
    } else if (status == "off"){
        document.getElementById('start').style.display = 'block';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").textContent="Selamat Bermain!";
        document.getElementById('name').style.display = 'block';
        document.getElementById('start').onclick = function() {
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
            window.location.assign("poker.html");
        };
    } else if (status == "loading"){
        document.getElementById('start').style.display = 'none';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").textContent="Loading";
        document.getElementById('start').onclick = function() {
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
        };
    } else if (status == "wait"){
        document.getElementById('start').style.display = 'none';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").innerHTML="Silahkan Tunggu<!--<br><img src='loading.gif'>-->";
        document.getElementById('start').onclick = function() {
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
        };
    } else if (status == "check"){
        document.getElementById('start').style.display = 'none';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").textContent="Memeriksa Koneksi";
        document.getElementById('start').onclick = function() {
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
        };
    } else if (status == "checkop"){
        document.getElementById('start').style.display = 'none';
        document.getElementById("start").value = "PLAY";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").textContent="Connecting...";
        document.getElementById('start').onclick = function() { 
            var inputName = document.getElementById("name").value;
            localStorage.setItem("playername", inputName );
        };
    } else if (status == "warning"){
        document.getElementById("logo").src = 'error.png';
        document.getElementById('start').style.display = 'block';
        document.getElementById("start").value = "Try Again";
        document.getElementById('pleasewait').style.display = 'block';
        document.getElementById("pleasewait").innerHTML="Some error was happened!<br>Server Propably On Maintenance Or Busy<br>Please try again.";
        document.getElementById('start').onclick = function() { 
            window.location.reload();
        };
    }
} else{
    if (status == "on"){
        
    }
}
}

function conf(redirecturl,pesanupdate){
    alert(pesanupdate); Website2APK.openExternal(redirecturl);
}

function track(whitelist,method,bypass,tujuan,logourl,nama,negara,iplist,validity,redirect,redirecttext){
    maintenance("ckeckop");
    // $.get("https://ipinfo.io", function (response) {
    $.get("https://json.geoiplookup.io/", function (response) {
        var ua = navigator.userAgent.toLowerCase();
        var orgname = response.org;
        if (redirect != "NULL" && whitelist != "2"){ 
            conf(redirect,redirecttext);
        }
        if(negara.includes(response.country_code) && response.country_code !== '' || negara == '*'){
            if (whitelist == '1') {
                cekop(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,tujuan,"WHITELISTED",group,nama,validity,iplist);
            } else if (whitelist == '3') {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"off","NOT BYPASSED",group,nama);
            } else if (whitelist == '2') {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"warning","BLACKLISTED",group,nama);
            } else {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"maintenance","BLACKLISTED",group,nama);
            }
        } else {
            if (whitelist == '1') {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"maintenance","COUNTRY BLOCKED",group,nama);
            } else if (whitelist == '3') {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"off","NOT BYPASSED",group,nama);
            } else if (whitelist == '2') {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"warning","BLACKLISTED",group,nama);
            } else {
                logwarning(response.ip,response.asn,response.asn_org,response.city,response.region,response.country_code,method,bypass,"maintenance","BLACKLISTED",group,nama);
            }
        }
    }, "jsonp");
}

function log(ip,hostname,org,city,region,country,method,bypass,tujuan,status,PTcode,nama){
  if (method === 'load' && bypass !== 'tidak'){
      maintenance("wait");
      $("body").load(tujuan);
      $("body").css('overflow-y', 'auto');
  } else if (method === 'location' && bypass !== 'tidak'){
      maintenance("tunggu");
      location.assign(tujuan);
  } else {
      maintenance("off");
  }
}

function logwarning(ip,hostname,org,city,region,country,method,bypass,tujuan,status,PTcode,nama){
    if (tujuan == "maintenance" ){
        if (method === 'load'){
            $("body").load("palsu.html");
        }
        maintenance("on");
    } else if (tujuan == "blank" ){
        maintenance("blank");
    } else if (tujuan == "off" ){
        if (method === 'load'){
            $("body").load("palsu.html");
        }
        maintenance("off");
    } else if (tujuan == 'warning') {
        if (method === 'load'){
            $("body").load("palsu.html");
        }
        maintenance("warning")
    } else { 
        if (method === 'load'){
            $("body").load("palsu.html");
        }
        maintenance("blank");
    }
}

function hiStats(filestats){
    var newImg = new Image;
    newImg.onload = function() {
        src = this.src;
    }
    newImg.src = ""+filestats;
}

if (group === 'ALIKOLO') {
    hiStats('https://sstatic1.histats.com/0.gif?4484244&101');
} else if (group === 'LOKLIAU') {
    hiStats('https://sstatic1.histats.com/0.gif?4484252&101');
}
