var count  = -3;
var turtleNumber;
var rabbitNumber;
var turtlePosition = 1;
var rabbitPosition = 1;
var turtleAction = "";
var rabbitAction = "";
var interval = null;

var time = document.getElementById("time");
var referee = document.getElementById("referee");

function start(){
    var startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", startCount, false);
    drawLine1();
    drawLine2();
}

function startCount(){  
    if(interval!=null){
        return;
    }
    drawLine1();
    drawLine2();
    count = -3;
    turtlePosition = 1;
    rabbitPosition = 1;
    document.getElementById("time").innerHTML = "Time: 0";
    document.getElementById("referee").innerHTML= "Referee: ";
    interval= window.setInterval("run()", 1000);
}

function run(){
    count++;
    switch(count){
        case -2:
            document.getElementById("referee").innerHTML="Referee: ON YOUR MARK";
            break;
        case -1:
            document.getElementById("referee").innerHTML="Referee: GET SET";
            break;
        case 0:
            document.getElementById("referee").innerHTML="Referee: GO";
            break;
    }

    if(count>=1){
        document.getElementById("time").innerHTML = "Time: " + count;
        turtleNumber = Math.floor(1+Math.random()*10);
        rabbitNumber = Math.floor(1+Math.random()*10);

        //Turtle
        if(turtleNumber>=1&&turtleNumber<=5){		
            turtlePosition+=3;
            turtleAction ="Turtle fast plod!";
        } else {
            if(turtleNumber>=6&&turtleNumber<=7){
                turtlePosition-=6;
                if(turtlePosition<=0){
                    turtlePosition=1;
                }
                turtleAction ="Turtle slip!";
            } else {
            turtlePosition+=1;
            turtleAction ="Turtle slow plod!";
            }
        }
        
        // Rabbit
        if(rabbitNumber>=1&&rabbitNumber<=2){
            rabbitAction="Rabbit sleep!";
        }else{
            if(rabbitNumber>=3&&rabbitNumber<=4){
                rabbitPosition+=9;
                rabbitAction="Rabbit big hop!";
            }else{
                if(rabbitNumber==5){
                    rabbitPosition-=12;
                    if(rabbitPosition<=0){
                        rabbitPosition=1;
                    }
                    rabbitAction="Rabbit big slip!";
                }
                if(rabbitNumber>=6&&rabbitNumber<=8){
                    rabbitPosition+=1;
                    rabbitAction="Rabbit small hop!";
                }
                if(rabbitNumber>=9&&rabbitNumber<=10){
                    rabbitPosition-=2;
                    if(rabbitPosition<=0){
                        rabbitPosition=1;
                    }
                    rabbitAction="Rabbit small slip!";
                }					 
            }
        }

        if(rabbitPosition==turtlePosition){
            if(rabbitPosition>=70){
            drawLine1();
            drawLine2(70,70,true);
            document.getElementById("referee").innerHTML="Referee: IT'S A TIE.";
            }else{
                if(rabbitPosition<=35){
                    drawLine1(turtlePosition,rabbitPosition,true);
                    drawLine2();
                    document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                }else{
                    drawLine1();
                    drawLine2(turtlePosition,rabbitPosition,true);
                    document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                }
            }
        }else{
            if(turtlePosition>=70){
                if(rabbitPosition<=35){
                    drawLine1(0,rabbitPosition,false);
                    drawLine2(70,0,false);
                }else{
                    drawLine1();
                    drawLine2(70,rabbitPosition,false);
                }
                document.getElementById("referee").innerHTML="Referee: The Turtle WON.";
            }else{
                if(rabbitPosition>=70){
                    if(turtlePosition<=35){
                        drawLine1(turtlePosition,0,false);
                        drawLine2(0,70,false);
                    }else{
                        drawLine1();
                        drawLine2(turtlePosition,70,false);
                    }
                    document.getElementById("referee").innerHTML="Referee: The Rabbit WON.";
                }else{
                    if(rabbitPosition<=35&&turtlePosition<=35){
                        drawLine1(turtlePosition,rabbitPosition,false);
                        drawLine2();
                        document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                    }
                    if(rabbitPosition<=35&&turtlePosition>35){
                        drawLine1(0,rabbitPosition,false);
                        drawLine2(turtlePosition,0,false);
                        document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                    }
                    if(rabbitPosition>35&&turtlePosition<=35){
                        drawLine1(turtlePosition,0,false);
                        drawLine2(0,rabbitPosition,false);
                        document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                    }
                    if(rabbitPosition>35&&turtlePosition>35){
                        drawLine1();
                        drawLine2(turtlePosition,rabbitPosition,false);
                        document.getElementById("referee").innerHTML="Referee: "+turtleAction+" "+rabbitAction;
                    }
                }
            }
        }
    }
    
    if(rabbitPosition >= 70 || turtlePosition >= 70){
        window.clearInterval(interval);
        interval = null;
    }
}

function drawLine1(turtle,rabbit,same){
    if(turtle==null){
        var line = "<table><tbody><tr>";
        var result= "<tr>";
        for(var i = 0; i<35;i++){    
            line += "<td>"+(i+1)+"</td>";
            result +="<td>_</td>";
        }
        line += "</tr>"+result+"</tr></tbody></table>";
        document.getElementById("line1").innerHTML = line;
    } else {
        var line = "<table><tbody><tr>";
        var result = "<tr>";
        for(var i = 0; i<35;i++){  
            line += "<td>"+(i+1)+"</td>";
            if(same){
                if(rabbit==(i+1)){
                    result+="<td>OUCH!!!</td>";
                }else{
                    result+="<td>_</td>";
                }
            }else{
                if(rabbit==(i+1)){
                    result +="<td class=\"rabbit\">R</td>"; 
                }else{
                    if(turtle==(i+1)){
                        result +="<td class=\"turtle\">T</td>";
                    } else {
                        result +="<td>_</td>";
                    }		  
                }
            }
        }
        line += "</tr>"+result+"</tr></tbody></table>";
        document.getElementById("line1").innerHTML = line;  
    }
} 

function drawLine2(turtle,rabbit,same){
    if(turtle==null){
        var line = "<table><tbody><tr>";
        var result = "<tr>";
        for(var i = 35; i<70; i++){
            line += "<td>"+(i+1)+"</td>";
            result +="<td>_</td>";
        }
        line += "</tr>"+result+"</tr></tbody></table>";
        document.getElementById("line2").innerHTML = line;
    }else{
        var line = "<table><tbody><tr>";
        var result = "<tr>";
        for(var i = 35; i<70;i++){
            line += "<td>"+(i+1)+"</td>";
            if(same){
                if(rabbit==(i+1)){
                    result+="<td>OUCH!!!</td>";
                }else{
                    result+="<td>_</td>";
                }
            }else{
                if(rabbit==(i+1)){
                    result +="<td class=\"rabbit\">R</td>"; 
                }else{
                    if(turtle==(i+1)){
                        result +="<td class=\"turtle\">T</td>";
                    }else{
                        result +="<td>_</td>";
                    }		  
                }
            }
        }
        line += "</tr>"+result+"</tr></tbody></table>";
        document.getElementById("line2").innerHTML = line;  
    }
} 

window.addEventListener("load",start,false);
