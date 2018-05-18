

var projectsData = [ 
    { name : "Project1", description : "Some description 1...", comments : "Some comments 1..." , category : ["Category_1"] , imgSrc : "" , location : "Europe"  , raisedFunds : "<1 000"            } , 
    { name : "Project2", description : "Some description 2...", comments : "Some comments 2..." , category : ["Category_2"] , imgSrc : "" , location : "Africa"  , raisedFunds : "1 000-10 000"      } ,  
    { name : "Project3", description : "Some description 3...", comments : "Some comments 3..." , category : ["Category_2"] , imgSrc : "" , location : "America" , raisedFunds : "10 000-100 000"    } , 
    { name : "Project4", description : "Some description 4...", comments : "Some comments 4..." , category : ["Category_3"] , imgSrc : "" , location : "Asia"    , raisedFunds : "100 000-1 000 000" } , 
    { name : "Project5", description : "Some description 5...", comments : "Some comments 5..." , category : ["Category_1"] , imgSrc : "" , location : "Africa"  , raisedFunds : ">1 000 000"        } ,  ];

function viewModel() {

    var self = this;
    
    self.categories = ko.observableArray([ "Category_1", "Category_2", "Category_3" ]);
    self.locations = ko.observableArray([ "Africa", "America", "Asia", "Europe "]);
    self.funds = ko.observableArray([ 
        { fund : "<1 000" , value:  0 }, 
        { fund : "1 000-10 000" , value : 1 }, 
        { fund : "10 000-100 000" , value : 2 }, 
        { fund : "100 000-1 000 000", value : 3 }, 
        { fund : ">1 000 000", value : 4 } 
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

        if(self.projects().length == 0) {
            //console.log("Array is empty");
            self.failMessage.style.visibility = "visible";
        }
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
    }

    function populateArray() {
        for(var i=0; i<projectsData.length; i++){
            self.projects.push(projectsData[i]);
        }
    }

}

ko.applyBindings(new viewModel());