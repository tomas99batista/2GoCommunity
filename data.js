

var projectsData = [ 
    { name : "Room to Read", 
      description : "We envision a world in which all children can pursue a quality education that enables them to reach their full potential and contribute to their communities and the world.", 
      comments : "“I realize that school can help me achieve my goals and improve my life.” Anna, Program Alumna, Tanzania" , 
      category : ["Children" , "Education"] , 
      imgSrc : "http://www.roomtoread.org/media/1029/rtr-logo-default.jpg?crop=0.2515625,0,0.27224702380952392,0.000000000000000346474172104&cropmode=percentage&width=640&height=350&rnd=131361311310000000" , 
      location : "Asia"  , 
      raisedFunds : 5 ,
      id : 1 } , 
    { name : "Innovate for Good: Bridging the Opportunity Divide with IT in Thailand", 
      description : "Microsoft Thailand collaborated with the National Council for Children and Youth Development (NCYD) to host an Innovate for Good event in Bangkok in April. \n More than 80 young people —including beneficiaries from various Microsoft programmes, youth representatives from non-governmental organisations (NGOs) and young Microsoft employees — came together during the event to discuss the use of technology to bridge the opportunity gap for youth.", 
      comments : "Some comments 2..." , 
      category : ["Education", "Children"] , 
      imgSrc : "https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/93/11/2870.IMG_5904.JPG" , 
      location : "Asia" , 
      raisedFunds : 3 ,
      id : 2 } ,  
    { name : "CREATIVE PRACTICE AS A SOCIAL AGENT: RECENT ARTISTIC, CURATORIAL AND DESIGN PROJECTS THAT FOSTER SOCIAL CHANGE", 
      description : "The creative practice of the last decades has shown that the borders of art are widening significantly and merge with other disciplines and fields. This change concerns not only spaces and unusual locations where art could be placed but also social processes that artists and other art professionals become part of. Nowadays as part of their projects, artists, curators and designers could serve as social therapists and psychologists, policy makers, developers of different urban zones or social workers. They could create links between citizens and government, communities and neighbors.", 
      comments : "Some comments 3..." , 
      category : ["Education", "Children"] , 
      imgSrc : "http://tok-spb.org/new/sites/default/files/styles/page_photo/public/IMG_5187_%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80.jpg" , 
      location : "Europe" , 
      raisedFunds : 3 ,
      id : 3 } , 
    { name : "Berlin’s neighbourhood management project brings", 
      description : "To counteract the negative outcomes of social segregation and social issues found in certain areas of Berlin after the reunification of the city, the Neighbourhood Management Berlin intervention strategy was launched in 1999 by the city authorities and, for more than a decade, it has proven to be a valuable tool in the development of the ‘Socially Integrative City’ of Berlin.", 
      comments : "Some comments 4..." , 
      category : ["Children"] , 
      imgSrc : "http://ec.europa.eu/regional_policy/index.cfm?action=image.display&imageid=2036" , 
      location : "Europe" , 
      raisedFunds : 1 ,
      id : 4 } , 
    { name : "Support for Schools", 
      description : "Every March the foundation selects a specific community to then support between 30 – 40 children. School supplies are then purchased according to what the school requires.", 
      comments : "Some comments 5..." , 
      category : ["Children"] , 
      imgSrc : "http://www.wamanadventures.com/wp-content/uploads/2017/04/Inkayni-Peru-Tours-social-project-3.jpg" , 
      location : "Asia"  , 
      raisedFunds : 2 ,
      id : 5 }
    ];

function viewModel() {

    var self = this;
    
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