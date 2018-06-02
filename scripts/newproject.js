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
        var userIdStr = queryString.substring(1);
        self.userId(userIdStr.split("=")[1]);
        console.log("userId = " + self.userId());
    }

    processForm();

    console.log(loginData[self.userId()]);

    if(self.userId()!=undefined){
        if(loginData[self.userId()].followed.includes(parseInt(self.projectId()))){
            $("#followButton").html("Unfollow");
        }
    }

    console.log(projectsData);

    function findProject(){
        if (self.projectId()==undefined || self.projectId() == 0){
            return { name : "", 
            description : "", 
            comments : "" , 
            category : [] , 
            imgSrc : "" , 
            location : ""  , 
            latestUpdates : [] , 
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

    createNew = function() {
        console.log("in function save changes...");
        
        var project = { name : "", 
        description : "", 
        comments : "" , 
        category : [] , 
        imgSrc : "" , 
        location : ""  , 
        latestUpdates : [] , 
        raisedFunds : 0 ,
        id : 0 };

        project.name = $("#projectName").val();
        project.description = $("#description").val();
        project.category = $("#category").val();
        project.comments = $("#comments").val();
        project.imgSrc = "";
        project.location = "Europe";
        project.raisedFunds = 1;
        project.userId = self.userId();

        console.log(project);

        projectsData.push(project);

        localStorage.projectsData = JSON.stringify(projectsData);
    }

}

ko.applyBindings(new viewModel());