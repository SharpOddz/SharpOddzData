

//Getting the paramaters passed through in the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sport = urlParams.get('sport');
const team_1 = urlParams.get('team_1');
const team_2 = urlParams.get('team_2');
const date = urlParams.get('date');

const game_url = "https://raw.githubusercontent.com/SharpOddz/SharpOddzData/main/" + sport + "_DATA/Game_Predictions/" + date + ".csv";
var found_game_data = false;
getGameData(game_url);
async function getGameData(url){
    //We go the date of the game, and look for the game that we need, 
    //Once it is retrieved we break out of the search,
    //Probably lots of optimization can be done for this but,
    //I doubt it would be needed, or at least not yet
    const response = await fetch(url);
    const data = await response.text();
    
    const rows = data.split("\n");
    var found = false;
    var data_arr = [];
    var counter = 0;
    for(let i = 0;i < rows.length;i++){
        var split_str = rows[i].split(",");
        if(found == true){
            if(split_str.includes("*")){
                break;
            }
            counter++;
            //Collect data
            if(counter == 1 || counter == 5 || counter == 6 || counter == 7){
                data_arr.push(split_str[0]);
                data_arr.push(split_str[1]);
            }
            else if(counter == 2 || counter == 3 || counter == 4){
                data_arr.push(rows[i]);
            }
        }
        else if(i == 0 || i%9 == 0){
            if(split_str[0] == team_1){
                found = true;
            }
        }
    }
    //Now that all the data is found we need to alert the program, NOT USED RN
    found_game_data = true;
    //Teams
    document.getElementById("team_1_record").innerHTML = data_arr[0];
    document.getElementById("team_2_record").innerHTML = data_arr[1];

    //Neutral Site?
    var Neutral = data_arr[2];
    Neutral = (Neutral == "Y") ? "vs." : "@";
    document.getElementById("Neutral").innerHTML = Neutral;
    //Values for Radar Chart for the correspondoning teams
    var team_1_data_labels = data_arr[3].split(",");
    var team_2_data_labels = data_arr[4].split(",");
    //Settinng Score Values and their proper colors
    var color_1_1 = (data_arr[5] > data_arr[6]) ? "green" : "red";
    var color_2_1 = (data_arr[6] > data_arr[5]) ? "green" : "red";
    var color_1_2 = (data_arr[7] > data_arr[8]) ? "green" : "red";
    var color_2_2 = (data_arr[8] > data_arr[7]) ? "green" : "red";
    var color_1_3 = (data_arr[9] > data_arr[10]) ? "green" : "red";
    var color_2_3 = (data_arr[10] > data_arr[9]) ? "green" : "red";
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
    console.log("Score 1_2" + data_arr[5]);
    //
    var score_1_1 = document.getElementById("score_1_1");
    score_1_1.innerHTML = data_arr[5];
    score_1_1.style.color = color_1_1;
    score_1_1.style.fontWeight = "bold";
    var score_2_1 = document.getElementById("score_2_1");
    score_2_1.innerHTML = data_arr[6];
    score_2_1.style.color = color_2_1;
    score_2_1.style.fontWeight = "bold";
    var score_1_2 = document.getElementById("score_1_2");
    score_1_2.innerHTML = data_arr[7];
    score_1_2.style.color = color_1_2;
    score_1_2.style.fontWeight = "bold";
    var score_2_2 = document.getElementById("score_2_2");
    score_2_2.innerHTML = data_arr[8];
    score_2_2.style.color = color_2_2;
    score_2_2.style.fontWeight = "bold";
    var score_1_3 = document.getElementById("score_1_3");
    score_1_3.innerHTML = data_arr[9];
    score_1_3.style.color = color_1_3;
    score_1_3.style.fontWeight = "bold";
    var score_2_3 = document.getElementById("score_2_3");
    score_2_3.innerHTML = data_arr[10];
    score_2_3.style.color = color_2_3;
    score_2_3.style.fontWeight = "bold";

    //Now that all the data has been gathered, we can put it on a radar chart
    radarChart(team_1_data_labels,team_2_data_labels);
}

//Radar Chart Drawing
function radarChart(t1_data,t2_data){

    //Getting the proper labels, based on the sport parameter passed through
    labels = [];
    if(sport == "NHL"){
        labels = ["NHL_PARAM_1","NHL_PARAM_2","NHL_PARAM_3","NHL_PARAM_4","NHL_PARAM_5"];
    }





    var temp_line_chrt = document.getElementById("radar_chart").getContext('2d');
    const chrt = new Chart(temp_line_chrt,{
        type: 'radar',
        data: {
            labels: ["Offense","Defense","Misc.","Offense","Defense"],
            datasets: [{ 
                data: t1_data,
                label: team_1,
                borderColor: "#3e95cd",
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }, { 
                data: t2_data,
                label: team_2,
                borderColor: "#8e5ea2",
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }]
        },
        options: {

        }
    });
}



//This seems like the best way, the function is called onload of the page so things can be updated
function updatePage(){
    //Changing all the elements that need the name to include the name
    var t1_ll = document.getElementsByName("team_1_name");
    var t2_ll = document.getElementsByName("team_2_name");
    for(let i = 0;i < t1_ll.length;i++){
        t1_ll[i].innerHTML = team_1;
        t2_ll[i].innerHTML = team_2;
    }
}

