

var projectsData = [ 
    { name : "Project1", description : "Some description 1...", comments : "Some comments 1..." , category : ["Category_1"] , imgSrc : "" , location : "Europe"  , raisedFunds : 1 } , 
    { name : "Project2", description : "Some description 2...", comments : "Some comments 2..." , category : ["Category_2"] , imgSrc : "" , location : "Africa"  , raisedFunds : 2 } ,  
    { name : "Project3", description : "Some description 3...", comments : "Some comments 3..." , category : ["Category_2"] , imgSrc : "" , location : "America" , raisedFunds : 3 } , 
    { name : "Project4", description : "Some description 4...", comments : "Some comments 4..." , category : ["Category_3"] , imgSrc : "" , location : "Asia"    , raisedFunds : 4 } , 
    { name : "Project5", description : "Some description 5...", comments : "Some comments 5..." , category : ["Category_1"] , imgSrc : "" , location : "Africa"  , raisedFunds : 5 }  ];

function viewModel() {

    var self = this;
    
    self.categories = ko.observableArray([ "Category_1", "Category_2", "Category_3" ]);
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