
var randomID = function () {
    return Math.random().toString(36).replace('0.', '');
}

function setID() {
    RoomID = randomID();
    document.getElementById("lobbyID").innerText = RoomID;
    var ref = database.ref(RoomID);
    var e = new entry();
    console.log(e);
    ref.push(e);
}

function join() {

    if (document.getElementById("joinID").value.includes("<")) {
        alert("Nice Try");
    }
    else {
        RoomID = document.getElementById("joinID").value;
        var ref = database.ref(RoomID);
        ref.once("value", gotData, errData);
    }

    console.log(GameState);
}