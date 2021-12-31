img = "";
objects = [];
status = "";

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status_label").innerHTML = "status : detecting objects";
}

function modelLoaded()
{
    console.log("model Is Loaded");
    status = true;
}

function gotResults(error,results)
{
   if(error)
   {
       console.log(error);
   }
   console.log(results);
   objects = results;
}

function preload()
{
    img = loadImage('lion image.jpg');
}

function draw()
{
    image(video,0,0,380,380);
    
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video , gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status_label").innerHTML = "status : object detected" ;
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are " + objects.length;
            fill(r,g,b);
            accuracy = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + accuracy + "%" , objects[i].x , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x - 15 , objects[i].y , objects[i].width , objects[i].height - 30);
        }
    }
}