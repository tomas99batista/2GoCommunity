
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
                self.userId(loginData[i].userId);
                console.log(self.userId);
                $("#loginForm").attr('action', 'projects.html');
                alert("Log in successful. Form Action: " + $("#loginForm").attr('action'));
                $("#loginForm").submit();
                // + '?id=' + self.userId()
            }
        }
        });
}

ko.applyBindings(new viewModel());