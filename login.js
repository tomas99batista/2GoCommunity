
//console.log("ALIVE");

function viewModel() {

    var self = this;

    self.userId = ko.observable();

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

        console.log(self.userId);

        for(var i=0; i<loginData.length; i++){
            if(loginData[i].userName == insertedUser && loginData[i].password == insertedPassword){
                alert("Log in successful");
                self.userId(loginData[i].userId);
                console.log(self.userId);
                $("#loginForm").submit();
            }
        }
        });
}

ko.applyBindings(new viewModel());