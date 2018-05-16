

var projectsData = [ 
    { name : "Project1", description : "Some description 1...", comments : "Some comments 1..." , category : "Category 1" , imgSrc : "" } , 
    { name : "Project2", description : "Some description 2...", comments : "Some comments 2..." , category : "Category 2" , imgSrc : "" } ,  
    { name : "Project3", description : "Some description 3...", comments : "Some comments 3..." , category : "Category 2" , imgSrc : "" } , 
    { name : "Project4", description : "Some description 4...", comments : "Some comments 4..." , category : "Category 3" , imgSrc : "" } , 
    { name : "Project5", description : "Some description 5...", comments : "Some comments 5..." , category : "Category 1" , imgSrc : "" } ,  ];

function viewModel() {

    var self = this;
    
    this.categories = ko.observableArray([ "Category 1", "Category 2", "Category 3" ]);

    this.projects = ko.observableArray(projectsData);

    filterContent = function() {
        console.log("I'm in function filterContent");
        var filterText = document.getElementById("toSearch").value;
        console.log(self.projects());
        if(filterText!=""){
            //self.projects.removeAll();
            //console.log("Am here");
            repopulateArray();
            for(var i=0; i<self.projects().length; i++) {
                //console.log("to Search = " + filterText + " ; arrayData = " + self.projects()[i].category);
                if(filterText != self.projects()[i].category){
                    self.projects.remove(self.projects()[i]);
                }
            }
        }
    }

    function repopulateArray() {
        self.projects.removeAll();
        self.projects(projectsData);
    }

}

ko.applyBindings(new viewModel());