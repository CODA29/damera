const modeBtn = document.getElementById('modeBtn');
const modeLabel = document.getElementById('modeLabel');
const body = document.body;
const bodyText = document.getElementById('bodyText');
const footer = document.querySelector('#foot');
const commentBox = document.querySelector('#commentBox');

const modeDescription ={
    light:{
        emoji: '<i class="fa-solid fa-sun" style="color: #faa44e"></i>',
        label: 'LIGHT MODE',
        background: 'url(https://global-uploads.webflow.com/60d21862724092349138065e/60d22a662e93a76ff5878b0a_geometry.png)',
        txtColor: '#454545'
    },
    night:{
        emoji: '<i class="fa-solid fa-moon"></i>',
        label: 'NIGHT MODE',
        background: '#454545',
        txtColor: '#ffffff'
    }
}


modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
modeLabel.textContent = 'Dark'

modeBtn.addEventListener('click', function(){

    if(modeBtn.innerHTML === '<i class="fa-solid fa-moon"></i>'){
        modeLabel.textContent = 'Light'
        modeBtn.innerHTML = '<i class="fa-solid fa-sun" style="color: #faa44e;"></i>';
        body.style.background ='#454545'
        body.style.color ='white'
        footer.style.background ='#454545'
        
        
       
    }
    else{
        modeLabel.textContent = 'Dark'
        modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        body.style.backgroundImage ='url(https://global-uploads.webflow.com/60d21862724092349138065e/60d22a662e93a76ff5878b0a_geometry.png)'
        body.style.color ='#454545'
        footer.style.background ='#fafafa;'
        
        
    }
    



    
})