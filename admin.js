import { kafka } from "./client.js";




async function init(){
    const admin  = kafka.admin();
    console.log("Admin connecting.....");
    admin.connect();
    console.log("Admin connection succes");


    await admin.createTopics({
        topics:[{
            topic: 'rider-updates',
            numPartitions : 2,
        }]
    })
    
    await admin.disconnect()
}

init();