
/* var projectsData = [];

$.ajax({
    type : 'GET',
    dataType : 'json',
    url: 'data.json',
    async : false,
    success : function(data) {
        projectsData = data;
    } 
});

console.log(projectsData);

projectsData.push({
    name : "Project for example",
    description : "Random description",
    comments : "Some Comments",
    category : ["Education"],
    imgSrc : "",
    location : "Europe",
    raisedFunds : "1",
    id : "6"
});

console.log(projectsData);

$.ajax({
    type: "POST",
    url: 'data.json',
    data: JSON.stringify(projectsData),
    success: function(){
        console.log("Data sent");
    },
    dataType: 'json'
  }); */

function viewModel() {

    var self = this;

    self.userId = ko.observable();
    //self.userId(document.URL.split("#")[1]);

    var queryString = decodeURIComponent(window.location.search);
    var userIdStr = queryString.substring(1);

    self.userId(userIdStr.split("=")[1]);

    /* console.log(queryString);
    console.log(userIdStr); */

    console.log("userId = " + self.userId());
    
    self.categories = ko.observableArray([ "Children", "Education" ]);
    self.locations = ko.observableArray([ "Africa", "America", "Asia", "Europe" ]);
    self.funds = ko.observableArray([ 
        { fund : "<1 000" , value:  1 }, 
        { fund : "1 000-10 000" , value : 2 }, 
        { fund : "10 000-100 000" , value : 3 }, 
        { fund : "100 000-1 000 000", value : 4 }, 
        { fund : ">1 000 000", value : 5 } 
    ]);

    self.projects = ko.observableArray([]);
    populateArray();

    self.failMessage = document.getElementById("failMessage");
    self.failMessage.style.visibility = "hidden";

    filterContentbyName = function() {
        console.log("In function filterContentbyName");
        var filterText = document.getElementById("toSearchName").value;
        self.projects.removeAll() //clean array
        //console.log("B. Search: " + self.projects().length);
        
        if(filterText!=""){
            for(var i=0; i<projectsData.length; i++) {
                //console.log("to Search = " + filterText + " ; arrayData = " + self.projects()[i].name);
                if(filterText.toUpperCase() == projectsData[i].name.toUpperCase()){
                    self.projects.push(projectsData[i]);
                }
            }
        }
        else{
            //console.log("filterText is null");
            populateArray();
        }

        //console.log("A. Search: " + self.projects().length);

        //return filterText;

        if(self.projects().length == 0) self.failMessage.style.visibility = "visible";
        else self.failMessage.style.visibility = "hidden";
    }

    filterContentbyCategory = function() {
        console.log("In function filterContentbyCategory");
        self.projects.removeAll(); //clean array
        var noneIsChecked = 1;
        for(var i=0; i<self.categories().length; i++){
            console.log(self.categories()[i]);
            if(document.getElementById(self.categories()[i]).checked == true){
                noneIsChecked = 0;
                for(var j=0; j<projectsData.length; j++){
                    if(projectsData[j].category.includes(self.categories()[i])){
                        self.projects.push(projectsData[j]);
                    }
                }
            }
        }
        if(noneIsChecked) populateArray();
        if(self.projects().length == 0) self.failMessage.style.visibility = "visible";
        else self.failMessage.style.visibility = "hidden";
    }

    filterContentbyFunds = function() {
        console.log("In function filterContentbyFunds");
        self.projects.removeAll(); //clean array
        var selectBox = document.getElementById("selectThis");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        for(var j=0; j<projectsData.length; j++){
            if(projectsData[j].raisedFunds == selectedValue){
                self.projects.push(projectsData[j]);
            }
        }
        if(selectedValue == 0) populateArray();
        if(self.projects().length == 0) self.failMessage.style.visibility = "visible";
        else self.failMessage.style.visibility = "hidden";
    }

    filterContentbyLocation = function() {
        console.log("In function filterContentbyLocation");
        self.projects.removeAll(); //clean array
        for(var i=0; i<self.locations().length; i++){
            if(document.getElementById('radio' + self.locations()[i]).checked){
                for(var j=0; j<projectsData.length; j++){
                    if(projectsData[j].location == self.locations()[i]){
                        self.projects.push(projectsData[j]);
                    }
                }
            }
        }
        if(document.getElementById("radioAll").checked) populateArray();
        if(self.projects().length == 0) self.failMessage.style.visibility = "visible";
        else self.failMessage.style.visibility = "hidden";
    }

    function populateArray() {
        for(var i=0; i<projectsData.length; i++){
            self.projects.push(projectsData[i]);
        }
    }

}

ko.applyBindings(new viewModel());


/* // Control for projets page

var allowEdit = true;
var projectToLoad = 1;

function allowEdit(){
    allowEdit = true;
}
function notAllowEdit(){
    allowEdit = false;
}

function nextPage(){
    document.cookie = "allowEdit=true";
    console.log("In function nextPage...");
    console.log("cookie: " + document.cookie);
} */






/* console.log(projectsData);

projectsData.push({
    name : "Project for example",
    description : "Random description",
    comments : "Some Comments",
    category : ["Education"],
    imgSrc : "",
    location : "Europe",
    raisedFunds : "1",
    id : "6"
});

console.log(projectsData); */

/* $.ajax({
    dataType: "json",
    mimeType: "application/json",
    url: "data.json",
    success: function(data){
        console.log("JSON Data: " + data);
        projectsData = JSON.parse(data);
    }
}) */

/* $.getJSON("data.json", function(data){
    console.log("JSON Data: " + data[0]);
}); */

/* function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
} */

// this requests the file and executes a callback with the parsed result once
//   it is available

/* $.ajax({
    type : 'GET',
    dataType : 'json',
    url: 'data.json',
    success : function(data) {
        console.log(data); 
    } 
});
var projectsData = []; */


/* fetchJSONFile('data.json', function(data){
        // do something with your data
        projectsData = data;
        console.log(projectsData);
    }); */

    //console.log(projectsData);

    /* projectsData.push({
        name : "Project for example",
        description : "Random description",
        comments : "Some Comments",
        category : ["Education"],
        imgSrc : "",
        location : "Europe",
        raisedFunds : "1",
        id : "6"
    });

    console.log(projectsData);

    data = JSON.stringify(projectsData); */