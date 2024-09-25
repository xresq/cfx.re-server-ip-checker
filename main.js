//Change it to true if you want to write it in json (required node js)
const write_to_json = false;


let serverId = ""; //fivem server id
if (serverId === '') return console.log("Server ID is too short");

const url = `https://servers-frontend.fivem.net/api/servers/single/${serverId}`;

fetch (url)
.then(response => response.json())
.then(async data => {
    if (!data.Data) return console.log("Failed to fetch server data");

    //clients - number of players rn
    //sv_maxclients - maximum number of players
    //ownerName - name of the owner
    const { gametype, hostname, clients, sv_maxclients, ownerName, connectEndPoints } = data.Data;
    const ip = connectEndPoints.toString().split(":")[0];
    const IpFetch = `http://ip-api.com/json/${ip}`;
    const ipResponse = await fetch(IpFetch);
    const ipData = await ipResponse.json();
    

    console.log(`Server Name: ${gametype}`);
    console.log(`Description: ${hostname}`);
    console.log(`Max players: ${sv_maxclients}`);
    console.log(`Players Amount: ${clients}`);
    console.log(`Owner Name: ${ownerName}`);
    console.log(`Server ip: ${ipData.query}`);

    const stringi = [
        {
            ip: ipData.query,
            isp: ipData.isp,
            location: ipData.city,
        },
        data.Data
        
    ]
    
    // Save server data to JSON file
    if (write_to_json) {
        const fs = require("fs");
        fs.writeFileSync("server_data.json", JSON.stringify(stringi, null, 2));
    }
    
})

