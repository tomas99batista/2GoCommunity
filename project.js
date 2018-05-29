
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
      category : ["Children"] , document.URL.split("#")[1];
      imgSrc : "http://ec.europadocument.URL.split("#")[1];036" , 
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

var projectId;
var allowEdit;

function processForm(){
    console.log("In function porcessForm...");
    var parameters = document.URL.split("#")[1];
    if (parameters.includes("$")){
        projectId = parameters.split("$")[0];
        allowEdit = true;
    }
    else{
        projectId = parameters;
        allowEdit = false;
    }
    console.log("projectId: " + projectId + "; allowEdit: " + allowEdit);
}

processForm();

if(!allowEdit){
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

}

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

}

ko.applyBindings(new viewModel());