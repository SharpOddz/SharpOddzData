//The following code extracts relevant data and translates it into appropiate looking prediction tables



//Gets the date in UTC Time, but then have to translate back to PST Time so -7 hours otherwise
//The website would update for some users and not for others, also would probably break the website
const date = new Date();
const pst_date = date.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
});
console.log(pst_date);

var date_temp_arr = pst_date.split(",");
var long_date = date_temp_arr[0];
var date_split = long_date.split("/");
var month = date_split[0];
if(month.length < 2){
    month = "0" + month;
}
var day = date_split[1];
if(day.length < 2){
    day = "0" + day;
}
var year = date_split[2];
console.log("Day:" + day + " Month:" + month + " Year:" + year);

//Getting the Team Ranking Data
const base_url = "https://raw.githubusercontent.com/SharpOddz/SharpOddzData/main/";
//NHL URL
const nhl_rating_url = base_url + "NHL_DATA/Ratings/" + month + "-" + day + "-" + year + ".csv";
NHL_RATING_LIST = [];
genTeamRatings(nhl_rating_url,"NHL_RATING_TABLE","NHL");
//Other Major League Team Rankings

async function genTeamRatings(URL,table_id,league){
    const response = await fetch(URL);
    const data = await response.text();
    if(data.includes("Not Found")){
        //Figure out some exception handling here
    }
    else{
        const rows = data.split("\n");
        //Only want the first 5
        for(let i = 0;i < 5;i++){

            var split_str = rows[i].split(",");
            var team = split_str[0];
            var rating = split_str[1];
            var tt = new Team(team,rating);
            NHL_RATING_LIST.push(tt);
        }
    }
    //Now that the data is retrieved we simply add it to the corresponding table
    var table_html = "<thead> <caption> <b> " + league + " Team Ratings " + "</b> </caption>";
    table_html += "<tr> <th> Team </th> <th> Rating </th> </tr> </thead> <tbody>"; 
    for(let i = 0;i < 5;i++){
        table_html += "<tr> <td>" + NHL_RATING_LIST[i].name + "</td> <td> " + NHL_RATING_LIST[i].rating + "</td></tr>";
    }
    table_html += "</tbody>";
   
    //Adding the Rating tables to the front page
    document.getElementById(table_id).innerHTML += table_html;


    //document.getElementById("Game_Prediction_One").href="sport_home.html?sport=NBA";
}


//Getting the game predictions
const base_pred_url = "https://raw.githubusercontent.com/SharpOddz/SharpOddzData/main/";
const NHL_pred_url = base_pred_url + "/NHL_DATA/Game_Predictions/" + month + "-" + day + "-" + year + ".csv";
var NHL_pred_array = [];

getGamePredictions(NHL_pred_url,"NHL",(month+"-"+day+"-"+year));
async function getGamePredictions(NHL_pred_url,sport,game_date){
    const response = await fetch(NHL_pred_url);
    const data = await response.text();
    //Should do something if it cannot find the data
    if(data.includes("Not Found")){
        
    }
    else{
        const rows = data.split("\n");
        var game_array = [];
        for(let i = 0;i < rows.length;i++){
            let temp_row = rows[i].split(",");
            //New Game, so we gotta push the old game to the list of game predictions
            if(temp_row[0].includes("*")){
                NHL_pred_array.push(new Game(game_array,sport,game_date));
                game_array = [];
            }
            else{
                game_array.push(temp_row[0]);
                game_array.push(temp_row[1]);
            }
        }
    }
    //The last game wouldn't be pushed so we have to push it if there is data for it
    if(game_array.length > 0){
        NHL_pred_array.push(new Game(game_array,sport,game_date));
    }

    //Creating the tables
    var div_element = document.getElementById("RIGHT_DIV_ELEMENT");

    for(let i = 0;i < NHL_pred_array.length;i++){
        var game = NHL_pred_array[i];
        var table_html = "<table style='width: 70%;margin-left: auto;margin-right: auto;border: 1px solid black;text-align: center;'>";
        //Table Header
        table_html += "<thead style='font-size: 32px;'>";
        table_html += "<tr> <th colspan='2' style='width: 30%;'> " + game.team_1 + "</th>";
        table_html += "<th> @ </th>";
        table_html += "<th colspan='2' style='width: 30%;'> " + game.team_2 + "</th> </thead>";  
        //Table Body(Records)
        table_html += "<tbody> <tr style='font-size: 24px;'> <td colspan='2'> <b> " + game.record_1 + "</b></td>";
        table_html += "<td> <b> Score Predictions </b> </td>";
        table_html += "<td colspan='2'> <b> " + game.record_1 + "</b></td></tr>";
        //Table Body(Score Predictions)
        var color_1_1 = ((game.score_1_1 > game.score_2_1) ? "style='color: green;'" : "style='color: red;'");
        var color_2_1 = ((game.score_2_1 > game.score_1_1) ? "style='color: green;'" : "style='color: red;'");
        var color_1_2 = ((game.score_1_2 > game.score_2_2) ? "style='color: green;'" : "style='color: red;'");
        var color_2_2 = ((game.score_2_2 > game.score_1_2) ? "style='color: green;'" : "style='color: red;'");
        var color_1_3 = ((game.score_1_3 > game.score_2_3) ? "style='color: green;'" : "style='color: red;'");
        var color_2_3 = ((game.score_2_3 > game.score_1_3) ? "style='color: green;'" : "style='color: red;'");
        //If there is a tie then they both should be black
        if(color_1_1 == color_2_1){
            color_1_1 = "black";
            color_2_1 = "black";
        }
        if(color_1_2 == color_2_2){
            color_1_2 = "black";
            color_2_2 = "black";
        }
        if(color_1_3 == color_2_3){
            color_1_3 = "black";
            color_2_3 = "black";
        }
        //Row 1 Score Predictions
        table_html += "<tr style='font-size: 20px;'> <td colspan='2'" + color_1_1 + "><b>" + game.score_1_1 + "</b></td>"; 
        table_html += "<td> G.B </td>";
        table_html += "<td colspan='2'" + color_2_1 + "><b>" + game.score_2_1 + "</b></td></tr>";
        //Row 2 Score Predictions
        table_html += "<tr style='font-size: 20px;'> <td colspan='2'" + color_1_2 + "><b>" + game.score_1_2 + "</b></td>"; 
        table_html += "<td> R.F </td>";
        table_html += "<td colspan='2'" + color_2_2 + "><b>" + game.score_2_2 + "</b></td></tr>";
        //Row 3 Score Predictions
        table_html += "<tr style='font-size: 20px;'> <td colspan='2'" + color_1_3 + "><b>" + game.score_1_3 + "</b></td>"; 
        table_html += "<td> P.C.A </td>";
        table_html += "<td colspan='2'" + color_2_3 + "><b>" + game.score_2_3 + "</b></td></tr>";


        //Create the Dynamic Link
        var dynamic_game_link = "index.html?";
        //the team names 
        dynamic_game_link += "team_1=" + game.team_1;
        dynamic_game_link += "&team_2=" + game.team_2;
        dynamic_game_link += "&sport=" + game.sport; 
        dynamic_game_link += "&date=" + game.date;
        
        table_html += "<tr> <td colspan='2'> &nbsp; </td>";
        table_html += "<td> <a href='" + dynamic_game_link + "' class='Game_Prediction_Link'> See Game Details </a> </td>";
        table_html += "<td colspan='2'> &nbsp; </td></tr>";


        table_html += "</tbody> </table><br>"; 
        
        div_element.innerHTML += table_html;
    }
    

}


class Game{
    constructor(arr,sprt,dt){
        //Basic Info of the game
        this.team_1 = arr[0];
        this.team_2 = arr[1];
        this.record_1 = arr[2];
        this.record_2 = arr[3];
        this.score_1_1 = arr[4];
        this.score_2_1 = arr[5];
        this.score_1_2 = arr[6];
        this.score_2_2 = arr[7];
        this.score_1_3 = arr[8];
        this.score_2_3 = arr[9]; 
        //This info is needed for when the user wants to see more about a specific game
        this.sport = sprt;    
        this.date = dt; 
    }
}


class Team{
    constructor(nm,rt){
        this.name = nm;
        this.rating = rt;
    }
}
