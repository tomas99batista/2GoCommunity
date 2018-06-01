
function viewModel() {

    var self = this;

    var projectsData = [];
    
    self.userId = ko.observable();
    self.ownerId = ko.observable();
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
        
        if(queryString.includes("&")){
            var valuesString = queryString.substring(1).split("&");
            var userIdStr = valuesString[0]
            var ownerIdStr = valuesString[1];

            self.userId(userIdStr.split("=")[1]);
            self.ownerId(ownerIdStr.split("=")[1]);

            console.log("userId = " + self.userId());
            console.log("ownerId = " + self.ownerId());
        }
        else{
            var ownerIdStr = queryString.substring(1);
            self.ownerId(ownerIdStr.split("=")[1]);
            console.log("ownserId = " + self.ownerId());
        }
    }

    processForm();

    function getUserProjects(){
        for(var i=0; i<projectsData.length; i++){
            if(projectsData[i].userId == self.ownerId()){
                self.projects.push(projectsData[i]);
            }
        }
    }

    getUserProjects();

    console.log(self.projects());

    self.profile(loginData[self.ownerId()]);

    console.log(self.profile());

    console.log(projectsData);

}

ko.applyBindings(new viewModel());