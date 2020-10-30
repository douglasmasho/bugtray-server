const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const sGmail = require("@sendgrid/mail");

sGmail.setApiKey(process.env.API_KEY);

const server = app.listen(PORT, ()=>{
    console.log("the server is running")
})

const socket = require("socket.io");

const io = socket(server);

io.on("connection", socket=>{
    console.log(`The socket ${socket.id} has connected`);

    socket.on("email_devs", data=>{
        console.log(data, "message received");
        // time to email the devs
        let recipients = []
        data.devs.forEach(dev=>{
            recipients.push(dev.emailID);
        })

        console.log(recipients);

        const msg = {
            to: recipients,
            from: "bugtrayapp@gmail.com",
            subject: "New Bug",
            // text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officia repudiandae maxime. Qui praesentium eaque assumenda fugit deleniti optio eligendi explicabo temporibus culpa. Eaque neque officia ea autem, omnis doloribus?",
        
            templateId: "d-7e25e6a0ed2a4be9ac87747585d7ae83",
            dynamic_template_data: {
                name: data.title,
                bugID: data.bugID,
                projectName: data.name,
                author: data.author,
                deadline: data.deadLine,
                text: data.initComment,
                subject: "New Bug",   
            }
        }

        console.log(msg)
        
        
        // sGmail.send(msg).then(()=>{
        //     console.log("ugiu")
        // }).catch(e=>console.log(e));

    })
})


