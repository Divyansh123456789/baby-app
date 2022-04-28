img = "";
status = "";
objects = [];
song = "";

function preload() {
   
    song = loadSound("my_baby.mp3");

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);


    objectDetector = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function ModelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);

}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object detected";
           

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    objects = results;
    if(results == "person"){
        document.getElementById("baby_found").innerHTML  = "baby found";
        song.stop();
    }else{
song.play();

document.getElementById("baby_found").innerHTML  = "baby not found";
    }
}