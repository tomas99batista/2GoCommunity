
//console.log("ALIVE");

$("#loginForm").submit(function(){
    event.preventDefault();
    $("#inputUser").val("");
    $("#inputPassword").val("");
})

$("#submitButton").click(function() {
    var insertedUser = $("#inputUser").val();
    var insertedPassword = $("#inputPassword").val();
    //alert("Form submited");
    console.log(insertedUser);
    console.log(insertedPassword);
    //alert(insertedUser + " " + insertedPassword);

    for(var i=0; i<loginData.length; i++){
        if(loginData[i].userName == insertedUser && loginData[i].password == insertedPassword){
            alert("Log in successful");
            userId = loginData[i].userId;
            $("#loginForm").submit();
        }
    }
});