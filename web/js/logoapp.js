$(function () {

 //global variable used to store array content
 //here it is used for storing json data
    var team = [];
 //fetching the data from the firebse
    function readFirebase(callback) {
        var ref = firebase.database().ref();
        ref.on("value", function (data) {
            console.log("firebase");
            team = data.val();
            callback(team);

            console.log(team);

        });
    }
      
/*Here first control goes to teamLogo.html and get the data and stored in the cache memory
   after that success function will be executed.At this time compilation of 
   Handlebars code and appending to the list will we happen.
*/
    readFirebase(function (data) {
     $.ajax({
            url: "web/Template/teamLogo.html",
            method: "get",
            cache:true,
            success: function (htmlData) {
                $("div.showHere").append(htmlData);
                var list = $('.all-teams .teams-list');
                var theTemplateScript = $("#teams-template").html();
                //Compile the template​
                var theTemplate = Handlebars.compile(theTemplateScript);
                //appending to html with json data
                list.append(theTemplate(data));

    /*
     when user clicks on particular team logo then respective index will be updated in the URL
    */           

                list.find('li').on('click', function (e) {
                e.preventDefault();
                var teamIndex = $(this).data('index');
                window.location.hash = 'teams/' + teamIndex;
                
      /*
        after clicks on a particular logo teamPlayers.html file will be executed and index will be updated .
        By using that index  we can display the respective  team players. 
      */          
                $("div.showHere").load("web/Template/teamPlayers.html",function(){

                var teamList = $('.teams-list');
                      
                var TemplateScript = $("#players-template").html();
                //Compile the template​
                var Template1 = Handlebars.compile(TemplateScript);
                //appending to html with json data
                teamList.append(Template1(data[teamIndex].team_players));
               
                    });
                    
                });
            }
        })
    });

});

    







