$(document).ready( ()=>{
  
    // click event for the submit button
    $("#contact_form").submit(event => {
        let isValid = true;
   

    // get input field values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const desc = $("#desc").val().trim();

    // validating name input field
    if(name==""){
        $("#name").next().text(" This field is required. ");
			isValid = false;
    }
    else{
        $("#name").next().text("");
    }
    $("#name").val(name);

    // validating email input field
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    if(email==""){
        $("#email").next().text(" This field is required. ");
			isValid = false;
    }
    else if(!emailPattern.test(email)){
        $("#email").next().text(" Enter a valid email address. ");
        isValid = false;

    }
    else{
        $("#email").next().text("");
    }
    $("#email").val(email);

    // validating desc input field
    if(desc==""){
        $("#desc").next().text(" This field is required. ");
			isValid = false;
    }
    else{
        $("#desc").next().text("");
    }
    $("#desc").val(desc);

    

    // posting the user input data to db.json

    if (isValid == false){
        event.preventDefault()
        
    }else{
	    alert("Thanks, I will get back to you soon");
    }
    
    
})

//clear the input fields
function response(){
    $("#contact_formResponse").html("<p> "+'Thanks ' +name+ ', I will get back to you soon.'+ " </p>");
    $("#contact_formResponse").fadeToggle (7000);

}
function clearField(){
    $("#name").val("");
    $("#email").val("");
    $("#desc").val("");

}

})
