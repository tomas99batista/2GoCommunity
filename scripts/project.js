
function viewModel() {

    var self = this;

    var projectsData = [];
    self.projectId = ko.observable();
    self.userId = ko.observable();

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
            var projectIdStr = valuesString[1];

            self.userId(userIdStr.split("=")[1]);
            self.projectId(projectIdStr.split("=")[1]);

            console.log("userId = " + self.userId());
            console.log("projectId = " + self.projectId());
        }
        else{
            var projectIdStr = queryString.substring(1);
            self.projectId(projectIdStr.split("=")[1]);
            console.log("projectId = " + self.projectId());
            $("#followButton").attr("disabled", true);
        }
    }

    processForm();

    console.log(loginData[self.userId()]);

    if(loginData[self.userId()].followed.includes(parseInt(self.projectId()))){
        $("#followButton").html("Unfollow");
    }

    console.log(projectsData);

    function findProject(){
        if (self.projectId() == 0){
            return { name : "", 
            description : "", 
            comments : "" , 
            category : [] , 
            imgSrc : "" , 
            location : ""  , 
            raisedFunds : 1 ,
            id : 6 }
        }
        for(var i=0; i<projectsData.length; i++){
            if (projectsData[i].id == self.projectId()){
                return projectsData[i];
            }
        }
    }
    
    self.project = ko.observable();
    self.project(findProject());

    console.log(self.project());

    follow = function(){
        console.log("In function (Un)follow...");
        console.log($("#followButton").html());
        if($("#followButton").html()=="Follow"){
            loginData[self.userId()].followed.push(parseInt(self.projectId()));
            localStorage.loginData = JSON.stringify(loginData);
            $("#followButton").html("Unfollow");
        }
        else{
            for(var i=0; i<loginData[self.userId()].followed.length; i++){
                if(loginData[self.userId()].followed[i] == self.projectId()) loginData[self.userId()].followed.splice(i, 1);
            }
            localStorage.loginData = JSON.stringify(loginData);
            $("#followButton").html("Follow");
        }
        console.log(loginData[self.userId()].followed);
    }

}

ko.applyBindings(new viewModel());