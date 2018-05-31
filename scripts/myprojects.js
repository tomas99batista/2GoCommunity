
function viewModel() {

    var self = this;

    var projectsData = [];

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

    console.log(projectsData);
    
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

    var projectsDataThis = [];
    initializeArray();
    populateArray();

    self.failMessage = document.getElementById("failMessage");
    self.failMessage.style.visibility = "hidden";

    filterContentbyName = function() {
        console.log("In function filterContentbyName");
        var filterText = document.getElementById("toSearchName").value;
        self.projects.removeAll() //clean array
        //console.log("B. Search: " + self.projects().length);
        
        if(filterText!=""){
            for(var i=0; i<projectsDataThis.length; i++) {
                //console.log("to Search = " + filterText + " ; arrayData = " + self.projects()[i].name);
                if(filterText.toUpperCase() == projectsDataThis[i].name.toUpperCase()){
                    self.projects.push(projectsDataThis[i]);
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
                for(var j=0; j<projectsDataThis.length; j++){
                    if(projectsDataThis[j].category.includes(self.categories()[i])){
                        self.projects.push(projectsDataThis[j]);
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
        for(var j=0; j<projectsDataThis.length; j++){
            if(projectsDataThis[j].raisedFunds == selectedValue){
                self.projects.push(projectsDataThis[j]);
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
                for(var j=0; j<projectsDataThis.length; j++){
                    if(projectsDataThis[j].location == self.locations()[i]){
                        self.projects.push(projectsDataThis[j]);
                    }
                }
            }
        }
        if(document.getElementById("radioAll").checked) populateArray();
        if(self.projects().length == 0) self.failMessage.style.visibility = "visible";
        else self.failMessage.style.visibility = "hidden";
    }

    function populateArray() {
        for(var i=0; i<projectsDataThis.length; i++){
            self.projects.push(projectsDataThis[i]);
            //ectsDataThis[i].userId == self.userId()) self.projects.push(projectsDataThis[i]);
        }
    }

    function initializeArray() {
        console.log(projectsData);
        for(var i=0; i<projectsData.length; i++){
            if(projectsData[i].userId == self.userId()) projectsDataThis.push(projectsData[i]);
        }
        console.log(projectsDataThis);
    }

}

ko.applyBindings(new viewModel());