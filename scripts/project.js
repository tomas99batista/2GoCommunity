
function viewModel() {

    var self = this;

    var projectsData = [];
    self.projectId = ko.observable();

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

    function processForm(){
        var queryString = decodeURIComponent(window.location.search);
        var projectIdStr = queryString.substring(1);

        self.projectId(projectIdStr.split("=")[1]);
        console.log("projectId = " + self.projectId());
    }

    processForm();

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

}

ko.applyBindings(new viewModel());