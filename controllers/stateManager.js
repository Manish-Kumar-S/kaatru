//Since ticket handler ID is consecutive
const fs = require("fs");

let currentManager = -1;
let mutexLock = false;


const pathToTicketHandlers = "./db/ticketHandlers.json";
const ticketHandlers = 5;


async function updateCurrentManager(req,res) {
    const ticket = res.locals.ticket;
    if (mutexLock) {
        await new Promise((resolve) => {
            const check = () => {
                if (!mutexLock) {
                    resolve();
                } else {
                    setTimeout(check, 10);
                }
            }
        });
    }
    mutexLock = true;
    currentManager += 1;
    if (currentManager == ticketHandlers) {
        currentManager = 0;
    }

    fs.readFile(pathToTicketHandlers, (err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({message : "Internal Server Error"});
        }

        try {
            let ticketHandlers = JSON.parse(data);
            ticketHandlers[currentManager].tickets.push(ticket);
            ticketHandlers = JSON.stringify(ticketHandlers);
            fs.writeFile(pathToTicketHandlers, ticketHandlers, (err,data) => {
                if (err) {
                    console.log(err.message);
                    return res.status(401).send({message : "Error in handling ticket"});
                } 
            });

        }
        catch (err) {
            console.log(err.message);
            return res.status(401).send({message : "Error in handling ticket"});
        }
    });
    
    mutexLock = false;
    return res.status(200).send({message : "Ticket handled"});
}


module.exports = {updateCurrentManager};