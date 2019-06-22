
var randomID = function () {
    return Math.random().toString(36).replace('0.', '');
}

function setID() {
    RoomID = randomID();
    document.getElementById("lobbyID").innerText = RoomID;
    if (RoomID.includes("<"))
        console.log("nice try");

    var ref = database.ref(RoomID);
    var e = new entry();
    console.log(e);
    ref.push(e);
}

function join() {
    RoomID = document.getElementById("joinID").value;
    var ref = database.ref(RoomID);
    ref.once("value", gotData, errData);
    console.log(GameState);
}