sgb = "";
sgb_1 = "";
leftwristx = 0;
rightwristy = 0;
leftwristy = 0;
rightwristx = 0;
score_rightwrist = 0;
score_leftwrist = 0;

function preload() {
    sgb = loadSound('Believer.mp3');
    sgb_1 = loadSound('Life Goes On.mp3');
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(450,200);
    Video = createCapture(VIDEO);
    Video.hide();
    posenet = ml5.poseNet(Video, modelloaded);
    posenet.on('pose', gotPoses)
}

function modelloaded() {
    console.log("successful");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        leftwristy = result[0].pose.leftWrist.y;
        leftwristx = result[0].pose.leftWrist.x;
        rightwristy = result[0].pose.rightWrist.y;
        rightwristx = result[0].pose.rightWrist.x;
        score_leftwrist = result[0].pose.keypoints[9].score;
        score_rightwrist = result[0].pose.keypoints[10].score;
    } else {
        console.log("The code has error");
    }
}

function draw() {

    song1_status=sgb.isPlaying();
    song2_status=sgb_1.isPlaying();
    image(Video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (score_rightwrist > 0.2) {
        circle(rightwristx, rightwristy, 20);

        sgb.stop();

        if(song2_status==false){
        sgb_1.play();
        document.getElementById("song_info").innerHTML = "Playing - Life Goes On(BTS)"
        }
}

if (score_leftwrist > 0.2) {
    circle(leftwristx, leftwristy, 20);

    sgb_1.stop();

    if(song1_status==false){
    sgb.play();
    document.getElementById("song_info").innerHTML = "Playing - Believer"
    }
}
}