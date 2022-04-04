.body{
    background-color: #ddd;
}

.navbar {
    background-color: black;
    position: fixed;
    width: 100%;
    top: 0px;

}

.navbar a {
    float: left;
    font-size: 30px;
    color: white;
    text-align: center;
    padding:  16px;
    text-decoration: none;
}


.dropbtn {
    background-color: black;
    color: white;
    padding: 16px;
    font-size: 30px;
    border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    width: 200px;
    z-index: 1;
    /* EXPERIMENT */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /*
    box-shadow: 2px 2px 4px #000000;
    */
}


.dropdown-child a{
    color: black;
    padding: 12px 16px;
    display: block;
    font-size: 18px;    
}
.dropdown-content:hover .dropdown-child{
    opacity: .25;
}
.dropdown-content .dropdown-child:hover{
    opacity: 1;
}
.dropdown-child a:hover{
    text-decoration: underline;
}
/* Links inside the dropdown */
  
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}
  
/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
    background-color: black;
}


.Mobile_Header_Top_Nav{
    display: none;
}
.overlay{
    display: none;
}




/* PREDICTION TABLE STUFF */
/*
.COMPUTER_PROJECTION_TABLE{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
}
.COMPUTER_PROJECTION_TABLE th{
    background-color:  white;
    font-size: 56px;
    width: 200px;
    text-align: center;
}
.COMPUTER_PROJECTION_TABLE td{
    font-size: 32px;
    text-align: center;
    width: 14%;
}
*/

/* Mobile Header */
@media screen and (max-width: 850px){
    /* https://www.w3schools.com/howto/howto_js_mobile_navbar.asp */
    
    .navbar{
        display: none;
    }
    


    .Mobile_Header_Top_Nav {
        overflow: hidden;
        background-color: gray;
        position: relative;
        display: block;
    }

    /* Hide the links inside the navigation menu (except for logo/home) */
    .Mobile_Header_Top_Nav #mobileLinks {
        display: none;
        background-color: black;
        text-align: center;
    }

    /* Style navigation menu links */
    .Mobile_Header_Top_Nav a {
        color: white;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 32px;
        display: block;
    }

    /* Style the hamburger menu */
    .Mobile_Header_Top_Nav a.icon {
        background: black;
        float: left;
        right: 0;
        top: 0;
    }
    .topnav a:hover {
        background-color: #ddd;
        color: black;
    }


    /* Score Predictions for Mobile, A little bit more complicated */
    /*
    .COMPUTER_PROJECTION_TABLE{
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        border-collapse: collapse;
    }
    .COMPUTER_PROJECTION_TABLE th{
        background-color:  white;
        font-size: 28px;
        width: 50px;
        text-align: center;
    }
    .COMPUTER_PROJECTION_TABLE td{
        font-size: 16px;
        text-align: center;
        width: 14%;
    }
    */
    .overlay {
        /* Height & width depends on how you want to reveal the overlay (see JS below) */ 
        display: block;   
        height: 100%;
        width: 0;
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        background-color: rgb(0,0,0); /* Black fallback color */
        background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
        overflow-x: hidden; /* Disable horizontal scroll */
        transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
      }
      
      /* Position the content inside the overlay */
      .overlay-content {
        position: relative;
        top: 25%; /* 25% from the top */
        width: 100%; /* 100% width */
        text-align: center; /* Centered text/links */
        margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
      }
      
      /* The navigation links inside the overlay */
      .overlay a {
        padding: 8px;
        text-decoration: none;
        font-size: 48px;
        color: white;
        display: block; /* Display block instead of inline */
        transition: 0.3s; /* Transition effects on hover (color) */
      }
      
      /* When you mouse over the navigation links, change their color */
      .overlay a:hover, .overlay a:focus {
        color: #f1f1f1;
      }
      
      /* Position the close button (top right corner) */
      .overlay .closebtn {
        position: absolute;
        font-size: 40px;
        top: 15px;
        right: 35px;
      }

}
