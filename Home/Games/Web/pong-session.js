
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


//Validate Room ID to join
function join() {
    const re = new RegExp("[0-9a-zA-Z]");
    const str = document.getElementById("joinID").value;



    if (!re.test(str)) {
        alert("Nice Try");
        return;
    }
    else {
        if (str.includes(" ")) {
            alert("Spaces not allowed");
            return;
        }
        RoomID = document.getElementById("joinID").value;
        var ref = database.ref(RoomID);
        ref.once("value", gotData, errData);
    }

    console.log(GameState);
}
