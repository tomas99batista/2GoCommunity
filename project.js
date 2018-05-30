
var projectId;
var allowEdit;

function processForm(){
    /* console.log("In function porcessForm...");
    var parameters = document.URL.split("#")[1];
    if (parameters.includes("$")){
        projectId = parameters.split("$")[0];
        allowEdit = true;
    }
    else{
        projectId = parameters;
        allowEdit = false;
    }
    console.log("projectId: " + projectId + "; allowEdit: " + allowEdit); */

    var queryString = decodeURIComponent(window.location.search);
    var projectIdStr = queryString.substring(1);

    projectId = projectIdStr.split("=")[1];

    /* console.log(queryString);
    console.log(userIdStr); */

    console.log("projectId = " + projectId);
}

processForm();

console.log(projectsData);

/* if(!allowEdit){
    document.getElementById("saveButton").disabled = true;
    document.getElementById("cancelButton").disabled = true;
    document.getElementById("saveButton").hidden = true;
    document.getElementById("cancelButton").hidden = true;

    //document.getElementsByClassName("form-control").disabled = true;
    var inputs = document.getElementsByClassName("form-control");
    for(var i=0; i<inputs.length; i++){
        inputs[i].readOnly = true;
        inputs[i].placeholder = "";
    }
    document.getElementsByClassName("form-control-file")[0].disabled = true;
    document.getElementsByClassName("form-control-file")[0].hidden = true;

} */

function findProject(){
    if (projectId == 0){
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
        if (projectsData[i].id == projectId){
            return projectsData[i];
        }
    }
}

function viewModel() {

    var self = this;
    
    self.project = ko.observable();
    self.project(findProject());

    console.log(self.project());

}

ko.applyBindings(new viewModel());