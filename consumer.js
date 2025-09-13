import { kafka } from "./client.js";

const groupId = process.argv[2]


async function init(){
    const consumer = kafka.consumer({
        groupId:groupId 
    })

    await consumer.connect();

    await consumer.subscribe({topics: ["rider-updates"] , fromBeginning:true})

    await consumer.run({
        eachMessage : async ({ topic, partition, message }) =>{
            console.log(`group:${groupId} [${topic}: PARTION:${partition}: message:${message.value.toString()}  ]`);
            // console.log(message);
        }
    })
}


init()