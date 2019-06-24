
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
    document.getElementById("indicator").innerText = RoomID;
    isPlayer1 = true;
}


//Validate Room ID to join
function join() {
    const re = /^[0-9a-zA-Z]*$/;
    const str = document.getElementById("joinID").value.replace(/\s/g, '');
    console.log("\"" + str + "\"");
    if (str == "") {
        alert("Enter a lobby code to join.")
        return;
    }

    console.log(re.test(str));
    if (!re.test(str)) {
        alert("Nice Try");
        return;
    }
    else {
        RoomID = str;
        var ref = database.ref(RoomID);
        ref.once("value", gotData, errData);
        document.getElementById("lobbyID").innerText = "###";
        isPlayer1 = false;
        alert("Joined Room: " + RoomID);
    }

    document.getElementById("indicator").innerText = RoomID;
    console.log(GameState);
}

function disconnect() {
    RoomID = "";
    isPlayer1 = true;
    document.getElementById("lobbyID").innerText = "###";
    document.getElementById("indicator").innerText = "Offline";
}
