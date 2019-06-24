
var randomID = function () {
    return Math.random().toString(36).replace('0.', '');
}

function setID() {
    RoomID = randomID();
    document.getElementById("lobbyID").innerText = RoomID;
    var ref = database.ref(RoomID);
    var e = new entry();
    console.log(e);
    ref.update(e);
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

        firebase.database().ref(RoomID).limitToFirst(1).once("value", snapshot => {
            if (snapshot.exists()) {
                console.log("exists!");
                //Handle that IDs that do exist
                ref.once("value", gotData, errData);
                document.getElementById("lobbyID").innerText = "###";
                isPlayer1 = false;
                document.getElementById("indicator").innerText = RoomID;
                return true;
            }
            else {
                //Handle ID''s that don't exist.
                alert("Invalid ID: Lobby not found.")
                RoomID = "";
                document.getElementById("indicator").innerText = "Offline";
            }
        });

    }


    console.log(GameState);
}

function disconnect() {
    RoomID = "";
    isPlayer1 = true;
    document.getElementById("lobbyID").innerText = "###";
    document.getElementById("indicator").innerText = "Offline";
}
