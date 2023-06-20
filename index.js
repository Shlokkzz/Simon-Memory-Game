// Intialization of variables
var started=false;
var level=1;
var arr=[];
var numclick=0;

// keypress section 
$(document).on("keypress",function(e){
    var idd=e.key;
    if(!started){
        arr=[];
        level=0;
        started=true;
        numclick=0;
        pusharr();
    }
    else{
       if(idd==1 || idd==2 || idd==3 || idd==4){
        checkbtn(getID(idd));
       }
    }
});

//click on button
$("div.btn").click(function(){
    if(started===true){                  
       checkbtn(this.id);
    }
})

function checkbtn(idd){
    buttonanimation(idd);

    if(idd===arr[numclick]){
        buttonSound(idd);
        numclick++;
        //current level completed. Increase level and add more items to array
        if(numclick===level){

            var num=Math.random();
            num=Math.floor(num*4)+1;
            var idd=getID(num);
            arr.push(idd);
            $("#level-title").text("Level "+(level+1));//update level

           againn(level,0); //to hear back the previous sounds
    
            level++;
            numclick=0;//will click the previous buttons again. therefore num=0
            } 
    }
    else{
        var aud=new Audio("sounds/wrong.mp3");
        aud.play();
        //game-over animation
        var butn=  $("body");
        butn.addClass("game-over");
        setTimeout(function(){butn.removeClass("game-over");},300);

        //Intialize again ->started==0 and wait for key press
        $("#level-title").html("Game Over<br><score-color>Your score was: "+ level+"</score-color><br>Press Any Key to Restart");
        started=0;
    }
}

function buttonSound(idd){
    var aud=new Audio("sounds/"+idd+".mp3");
    aud.play();
}

function buttonanimation(idd){
    var butn=  $("#"+idd);
    butn.addClass("pressed");
    setTimeout(function(){butn.removeClass("pressed");},300);
}

function pusharr(){
    var num=Math.random();
    num=Math.floor(num*4)+1;
    var idd=getID(num);
    arr.push(idd);
    buttonanimation(idd);
    buttonSound(idd);
    level++;
    $("#level-title").text("Level "+level);
}

function againn(level,ini){
  //hear back previous sounds
  setTimeout(function(){
      buttonSound(arr[ini]);
      buttonanimation(arr[ini]);
      ini++;
      if(ini<=level){
          againn(level,ini);
      }
  },600)
}
function getID(num) {
    if(num==2){
        return "red";
    }
    else if(num==4){
        return "blue";      
    }
    else if(num==3){
        return "yellow";
    }
    else if(num==1){
        return "green";
    }
  }
