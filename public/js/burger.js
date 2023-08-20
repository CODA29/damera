
var burger = document.querySelector('.burger');
var links = document.getElementById("myLinks");
var burgerMenu = document.querySelector(".burgerMenu");
var icon = document.querySelector(".icon");
var i = document.getElementById("i");
const x = document.createElement("i");


burger.addEventListener('click', function(){

    
    x.className = "fa-solid fa-xmark fa-lg";

    if(burgerMenu.style.display ==="block"){
        burgerMenu.style.display ="none";
        icon.replaceChild(i, x);
    }
    
    else{
        burgerMenu.style.display ="block";
        icon.replaceChild(x, i);
    }
})

window.addEventListener('resize', function(){
    if(window.innerWidth > 750){
        burgerMenu.style.display ="none";
        icon.replaceChild(i, x);
    }
} )




