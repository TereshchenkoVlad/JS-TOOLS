var dollar = 27.4;
var xiaomi = 350 * dollar;
var iphone = 750 * dollar;

var Xiaomi = document.querySelector("#xiaomi");
var Iphone = document.querySelector("#iphone");
var answet = document.querySelector("#answer");

if (dollar > 26 || dollar === 26) {
    Xiaomi.innerHTML = xiaomi;
    Iphone.innerHTML = iphone;  
} else{
    Xiaomi.innerHTML = "none";
    Iphone.innerHTML = "none"; 
    answet.innerHTML = "Not available!"
}
