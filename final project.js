var capture;
var ydown = 0;
var openmouth
var mouthUp; 
var mouthDown;
var fr=30;
var by=200;
var bx=700;
var k=1;
var s=0;
var points 
var xp;
var yp;

//m15 facial detection model
var faceapi;
var detections=[];

function setup() {
	angleMode(RADIANS);
	frameRate(fr);
	//background
  createCanvas(1600, 780);
	choppingpad=loadImage('choppingpad1.jpg');
	column1=loadImage('choppingpad2.jpg');
	column2=loadImage('choppingpad2.jpg');
	banana=loadImage('banana.png');

	//apple=loadImage('apple.png');
	
	
	/*fill(51)
	rect(0,0,1600,780);
	*/
	
	//capture setup
  capture = createCapture(VIDEO);
  capture.hide();
	
	const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
	
	//colorMode(HSB); 	
}

//start detecting faces
function faceReady(){
	 faceapi.detect(gotFaces);
}

//got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
	background(246, 232, 124);
	
	//image(column2,0,(capture.height/2.1),250,(780-capture.height/2.1));//picture of dark chopping pad
	//image(column1,250,0,1350,(capture.height/2.1));//picture of dark chopping pad
	//image(choppingpad,0,0,1600,780);//picture of chopping pad
  
	image(capture, 0, 0, 250, (capture.height/2.1));//picture camera captured
	
	image(banana,bx,by,60,60);
	
	strokeWeight(3);//dashboard
	stroke(248,188,50);
	
	fill(255);
	rect(1300,0,300,(capture.height/4.2-2));
	
	textAlign(CENTER);//score
	textSize(60);
	noStroke();
	fill(0)
	text('Score:'+s,1450,(capture.height/4.2-40));
	
	
	strokeWeight(3);//catpture rect
	stroke(248,188,50);
	noFill();
	rect(0,0,250,(capture.height/2.1))
	
	strokeWeight(6);//whole structure
	noFill();
	rect(0,0,1600,780);
	
	ft();
	
	//point(xp,yp);

	
	by = by + k * (deltaTime / 50)
	if(by>=780){
		if(fr===30){
			bx+=random(-30,100);
		}
		by=200;
		k+=2
	}
	if(bx>890||bx<620){
		bx=700
	}
	
	//point(bx,by);
	
	let distance=dist(bx,by,xp,yp);
	
	if(distance==0){//i tried many times to make a connection between point on face and banana but it turns out to be failed. I've try my best but still can not figure it out. 
		s++;
	}
}	


function ft(){/////////////////////////////////////////////////////////////////
push();//facialprojection into white numbers
	translate(580,250);
	if (detections.length > 0) { //draw points of face realtime
   var points = detections[0].landmarks.positions; 
	
    for (let i = 0; i < 48; i++) {//shape of face 1
      stroke(0);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
			//text(i,points[i]._x,points[i]._y);  //<--this helps me identify the number of each point
    }
		
			for(let i=49; i <=60; i++){//red hot lips
			stroke(255,0,0);
		  strokeWeight(12);
			point(points[i]._x, points[i]._y);
		}
		
		for (let i = 61; i <= 63; i++) {//white teeth up (currently is red) 
      stroke(255,0,0);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
		}
		
		 for (let i = 65; i <=67; i++) {//white teeth down (currently is red)
      stroke(255,0,0);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
		}
		 
		 for (let i = 68; i < points.length; i++) {//shape of face 2
      stroke(0);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
		}
		
		//detector to decide whether mouth is open or not
		mouthUp = createVector(points[62]._x, points[62]._y);
    mouthDown = createVector(points[66]._x, points[66]._y);
    openmouth = mouthUp.dist(mouthDown);
		xp=points[66]._x;
		yp=points[66]._y;
		
		if(openmouth>15){
		
		for (let i = 61; i <= 63; i++) {//white teeth up (now is white) 
      stroke(255);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
		}
		
		 for (let i = 65; i <=67; i++) {//white teeth down (now is white)
      stroke(255);
      strokeWeight(8);
      point(points[i]._x, points[i]._y);
		}	
	}
}
pop();	
}


/*function mousePressed(){
	s+=1;
}
*/
////////////////////////////////////////////////////////////////	 

