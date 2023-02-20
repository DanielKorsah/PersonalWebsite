
// web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCb-jpRATYHS-z_2StRtI0hrXZAmt3zD_E",
    authDomain: "pong-973da.firebaseapp.com",
    databaseURL: "https://pong-973da.firebaseio.com",
    projectId: "pong-973da",
    storageBucket: "pong-973da.appspot.com",
    messagingSenderId: "381597890847",
    appId: "1:381597890847:web:3540d2a6cd135009"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//console.log(firebase)

//firestore database
var database = firebase.database();


class entry {
    constructor() {
        this.blueY = sizey / 2;
        this.redY = sizey / 2;
        this.ballX = sizex / 2;
        this.ballY = sizey / 2;
        this.playerJoined = false;
    }
}

function gotData(data) {
    var lobby = data.val();
    var keys = Object.keys(lobby);
    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var bx = lobby[k].ballX;
        console.log(lobby);
        console.log(keys[i]);
        console.log(lobby[k]);
        console.log(bx);
    }
    var f = lobby[Object.keys(lobby)[0]];
    //console.log(f.playerJoined);
    GameState = lobby;
    //console.log(GameState);

}

function p1Get(snapshot) {
    var lobby = snapshot.val();
    GameState.playerJoined = lobby.playerJoined;
    console.log(lobby.redY);
    GameState.redY = lobby.redY;
    //console.log(f.playerJoined);
    //console.log(GameState);
}

function p2Get(snapshot) {
    var lobby = snapshot.val();
    console.log(lobby.blueY);
    GameState.blueY = lobby.blueY;
    GameState.ballX = lobby.ballX;
    GameState.ballY = lobby.ballY;
    //console.log(GameState);
}

function errData(err) {
    console.error("Data Error! : " + err);
}
