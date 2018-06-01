
//console.log("ALIVE");

function viewModel() {

    var self = this;

    var loginData = [];
    
    if (!localStorage.loginData) {
        var ajaxData = [];

        $.ajax({
            dataType: "json",
            async : false,
            /* mimeType: "application/json", */
            url: "https://rawgit.com/joao-p-marques/2GoCommunity/master/loginData.json",
            success: function(data){
                console.log("JSON Data: " + data);
                $.each(data, function(i, objectR){
                    ajaxData.push(objectR);
                })
            }
        })

        localStorage.setItem("loginData", JSON.stringify(ajaxData));
    }
    
    loginData = JSON.parse(localStorage.loginData);

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

        console.log(self.userId());

        for(var i=0; i<loginData.length; i++){
            if(loginData[i].userName == insertedUser && loginData[i].password == insertedPassword){
                self.userId(loginData[i].userId);
                console.log(self.userId);
                $("#loginForm").attr('action', 'projects.html');
                alert("Log in successful.");
                $("#loginForm").submit();
                // + '?id=' + self.userId()
            }
        }
        });
}

ko.applyBindings(new viewModel());