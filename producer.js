import { kafka } from "./client.js";

import readline from "readline";

// create interface for reading/writing to terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "   // sets the prompt symbol
});

// show the first prompt
rl.prompt("> " );


async function init() {
    const producer = kafka.producer();
    console.log("connecting producer");
    await producer.connect();
    console.log("prodcuer connected suucesfully ")


    rl.on("line", async (line) => {
        // split by spaces
        const parts = line.trim().split(" ");
        const [name, location] = parts

        // do something with parts[0], parts[1], etc.
        if (parts[0] === "exit") {
            rl.close();
            await producer.disconnect()
        } else {
            const result = await producer.send({
                topic: 'rider-updates',
                messages: [
                    {
                        partition: location == "SOUTH" ? 0 : 1,
                        key: "location-update",
                        value: JSON.stringify({
                            name: name,
                            location: location,
                        })
                    }
                ]
            })
            console.log(result)
            rl.prompt(); // show prompt again
        }
    });




}

init()