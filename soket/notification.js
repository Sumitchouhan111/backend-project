export  async function notificationsoket(io) {
    io.on('connection',(socket)=>{
        console.log("a user conneted notification");
        
        socket.on('sendnotification',(data)=>{
            io.emit(`notification data ${data.id}`,data)
        })

        socket.on('disconnect',()=>{
            console.log("disconnect ");
            
        })
    })
}