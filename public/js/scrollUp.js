// scroll up button 
const btn = document.getElementById('scrollBtn');

window.onscroll = function(){
    scrollFunction()
};

function scrollFunction(){
    if(document.body.scrollBottom > 1000 || document.documentElement.scrollTop > 1000){
        btn.style.display = "block";
       
    }else{
        btn.style.display="none";
        
    }
}
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
   
  
}