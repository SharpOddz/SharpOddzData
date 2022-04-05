
//Getting the sport from the URL parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sport = urlParams.get('sport');

//Getting the Date, Takes a lot of work to pass it through in the URL but it would speed this up
//if it is slow
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

var string_date = month + "-" + day + "-" + year;

const baseURL = "https://raw.githubusercontent.com/SharpOddz/SharpOddzData/main/" + sport + "_DATA/Ratings/" + string_date + ".csv";
var team_list = [];
getTeamRatings(baseURL);



//Generating the table for ratings
async function getTeamRatings(URL){
    const response = await fetch(URL);
    const data = await response.text();

    const rows = data.split("\n");
    for(let i = 0;i < rows.length-1;i++){
        let split_row = rows[i].split(",");
        var temp_team = new Team(split_row[0],split_row[1],split_row[2],split_row[3],i);
        team_list.push(temp_team);
    }

    //Now Change the HTML of the table
    createTable();
}

function createTable(){
    var table = document.getElementById("TABLE").innerHTML;

    table += "<thead> <tr> <th onclick='sortTable(0)'> Rank </th> <th onclick='sortTable(1)'> Team </th> <th onclick='sortTable(2)'> Rating </th> <th onclick='sortTable(3)'> Offense Rating </th> <th onclick='sortTable(4)'> Defense Rating </th> </tr> </thead>";

    table += "<tbody>";

    for(let i = 0;i < team_list.length;i++){
        let tt = team_list[i];
        table += "<tr>";
        table += "<td> " + (i+1) + "</td>";
        table += "<td> " + tt.name + "</td>";
        table += "<td> " + tt.rating+ "</td>";
        table += "<td> " + tt.offense_rating + "</td>";
        table += "<td> " + tt.defense_rating + "</td>";
        table += "</tr>";
    }
    
    table += "</tbody>";
    document.getElementById("TABLE").innerHTML = table;
    console.log(table.rows);
}

/* 

    SORTING TABLES 

*/
var col_1_sorted = true;
var col_2_sorted = false;
var col_3_sorted = true;
var col_4_sorted = false;
var col_5_sorted = false;

function sortTable(n){
  var table = "<thead> <tr> <th onclick='sortTable(0)'> Rank </th> <th onclick='sortTable(1)'> Team </th> <th onclick='sortTable(2)'> Rating </th> <th onclick='sortTable(3)'> Offense Rating </th> <th onclick='sortTable(4)'> Defense Rating </th> </tr> </thead>";
  table += "<tbody>";
  

  //Sorting
  sort_asc = true;
  if(n == 0){
    team_list.sort((a,b) => (a.rank > b.rank) ? 1 : -1);
    if(col_1_sorted == true){
      col_1_sorted = false;
      sort_asc = false;
    }
    else{
      col_1_sorted = true;
      sort_asc = true;
    }    
  }
  else if(n == 1){
    team_list.sort((a,b) => (a.name > b.name) ? 1 : -1);
    if(col_2_sorted == true){
      col_2_sorted = false;
      sort_asc = false;
    }
    else{
      col_2_sorted = true;
      sort_asc = true;
    }
  }
  else if(n == 2){
    team_list.sort((a,b) => (a.rating > b.rating) ? 1 : -1);
    if(col_3_sorted == true){
      col_3_sorted = false;
      sort_asc = false;
    }
    else{
      col_3_sorted = true;
      sort_asc = true;
    }
  }
  else if(n == 3){
    team_list.sort((a,b) => (a.offense_rating > b.offense_rating) ? 1 : -1);
    if(col_4_sorted == true){
      col_4_sorted = false;
      sort_asc = false;
    }
    else{
      col_4_sorted = true;
      sort_asc = true;
    }
  }
  else if(n == 4){
    team_list.sort((a,b) => (a.defense_rating > b.defense_rating) ? 1 : -1);
    if(col_5_sorted == true){
      col_5_sorted = false;
      sort_asc = false;
    }
    else{
      col_5_sorted = true;
      sort_asc = true;
    }
  }
  /*
  for(let i = 0;i < team_list.length;i++){
    console.log(team_list[i].name + " , " + team_list[i].rating + "," + team_list[i].offense_rating);
  }
  */

  if(sort_asc == false){
    for(let i = 0;i < team_list.length;i++){
      let tt = team_list[i];
      table += "<tr>";
      table += "<td> " + (i+1) + "</td>";
      table += "<td> " + tt.name + "</td>";
      table += "<td> " + tt.rating+ "</td>";
      table += "<td> " + tt.offense_rating + "</td>";
      table += "<td> " + tt.defense_rating + "</td>";
      table += "</tr>";        
    }
  }
  else if(sort_asc == true){
    console.log("AHDJAJDJA");
    for(let i = team_list.length-1;i > -1;i--){
      let tt = team_list[i];
      table += "<tr>";
      table += "<td> " + (i+1) + "</td>";
      table += "<td> " + tt.name + "</td>";
      table += "<td> " + tt.rating+ "</td>";
      table += "<td> " + tt.offense_rating + "</td>";
      table += "<td> " + tt.defense_rating + "</td>";
      table += "</tr>";        
    }   
  }

  table += "</tbody>";
  document.getElementById("TABLE").innerHTML = table;
}



function updatePage(){
    //Upadting the title on page load
    document.getElementById("SPORT_TITLE").innerHTML = sport + " Team Ratings";
    document.getElementById("UPDATE_TIME").innerHTML = "Last Updated: " + string_date;
}

class Team{
    constructor(nm,rt,o_rt,d_rt,rk){
        this.rank = parseInt(rk);
        this.name = nm;
        this.rating = parseInt(rt);
        this.offense_rating = parseInt(o_rt);
        this.defense_rating = parseInt(d_rt);
    }
}
