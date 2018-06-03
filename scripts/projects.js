

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
    populateArray(projectsData);
    
    console.log(self.projects());

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
                if(projectsData[i].name.toUpperCase().includes(filterText.toUpperCase())){
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

    function populateArray(projectsDataT) {
        console.log("Populating array...");
        //console.log(projectsDataT.length);
        for(var i=0; i<projectsDataT.length; i++){
            //console.log(projectsDataT[i]);
            self.projects.push(projectsDataT[i]);
        }
        //console.log(self.projects());
    }

    follow = function(data){
        console.log(data);
        loginData[self.userId()].followed.push(data.id);
        localStorage.loginData = JSON.stringify(loginData);
    }

}

ko.applyBindings(new viewModel());