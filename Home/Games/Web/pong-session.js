
var randomID = function () {
    return Math.random().toString(36).replace('0.', '');
}

function setID() {
    RoomID = randomID();
    document.getElementById("lobbyID").innerHTML = RoomID;

    var ref = database.ref(RoomID);
    var e = new entry();
    console.log(e);
    ref.push(e);
}

function join() {
    RoomID = document.getElementById("joinID").value;
    var ref = database.ref(RoomID);
    var game = ref.once("value", gotData, errData);
    console.log(game);
}