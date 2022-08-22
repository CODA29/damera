const id = '1M0SAS4d9Y6cZ3wmC9qaNq8eMIQL5bunzOU4HU1GkgqE';
const domain= 'https://docs.google.com/spreadsheets/d/';
const url = 'https://docs.google.com/spreadsheets/d/1M0SAS4d9Y6cZ3wmC9qaNq8eMIQL5bunzOU4HU1GkgqE/gviz/tq?tqx=out:csv&sheet=Sheet%201&tq=SELECT%20*';
const quote = document.getElementById('quote');
const header = document.getElementById('header');

getJson();

function getJson(){
    const tq = '/gviz/tq?tqx=out:json&tq=';
    const endPoint =`${domain}${id}${tq}`;
    console.log(endPoint);
    fetch(endPoint).then(res =>res.text())
    .then(data =>{
        //console.log(data);
        let modify = data.replace('/*O_o*/','');
        modify = modify.replace('google.visualization.Query.setResponse(','');
        modify = modify.replace(');','');
        let result = JSON.parse(modify);
        //console.log(result);

        let tab = result.table;
        let row = tab.rows;
        var txt ="";
        
        header.innerHTML = "Today's motivational quotes: ";
        for(var i=1; i <= row.length-1; i++){

            var currentRow = row[i];
            txt += ' " ' + currentRow.c[0].v +  ' "'+ " - " + `<span>` + currentRow.c[1].v + `</span>` + `</br>`;

            quote.innerHTML= txt;

            $("#header").fadeToggle (10000); 
            $("#quote").fadeToggle (10000); 

        }
        
        
         
        
    })
}







    

