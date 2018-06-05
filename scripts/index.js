
function loadData(){
    
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