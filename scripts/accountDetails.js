
function viewModel() {

    var self = this;

    var projectsData = [];
    
    self.userId = ko.observable();
    self.profile = ko.observable();
    self.projects = ko.observableArray([]);

    if (!localStorage.projectsData) {
        var ajaxData = [];

        $.ajax({
            dataType: "json",
            async : false,
            /* mimeType: "application/json", */
            url: "https://rawgit.com/joao-p-marques/2GoCommunity/master/data.json",
            success: function(data){
                console.log("JSON Data: " + data);
                $.each(data, function(i, objectR){
                    ajaxData.push(objectR);
                })
            }
        })

        localStorage.setItem("projectsData", JSON.stringify(ajaxData));
    }
    
    projectsData = JSON.parse(localStorage.projectsData);

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

    function processForm(){
        var queryString = decodeURIComponent(window.location.search);
        var userIdStr = queryString.substring(1);
        self.userId(userIdStr.split("=")[1]);
        console.log("userId = " + self.userId());
    }

    processForm();

    function getUserProjects(){
        for(var i=0; i<projectsData.length; i++){
            if(projectsData[i].userId == self.userId()){
                self.projects.push(projectsData[i]);
            }
        }
    }

    getUserProjects();

    console.log(self.projects());

    self.profile(loginData[self.userId()]);

    console.log(self.profile());

    console.log(projectsData);

    saveChanges = function(){
        console.log("in function save changes...");

        loginData[self.userId()].name = $("#personName").val();
        loginData[self.userId()].billingAdress = $("#billingAdress").val();
        loginData[self.userId()].country = $("#country").val();
        loginData[self.userId()].email = $("#email").val();
        loginData[self.userId()].recieveNotifications = $("input[name=optradio]:checked").val();
        loginData[self.userId()].area = $("#area").val();
        loginData[self.userId()].description = $("#description").val();

        console.log(loginData[self.userId()]);

        localStorage.loginData = JSON.stringify(loginData);
    }

}

ko.applyBindings(new viewModel());