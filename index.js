import { parse } from "vite";
import { WebSocketServer } from "ws";


 const collection=[]

const wss=new WebSocketServer({port:8080})
wss.on("connection",(socket)=>{
    socket.on("message",(msg)=>{
        const parsed_msg=JSON.parse(msg);
        const roomid=parsed_msg.roomId
        const filter=collection.filter((p)=>{return p.roomid==roomid})
        if(parsed_msg.type=='login'){
            
            let colour=null
            if(filter.length!=0){
                console.log("black condition")
                colour="black"
                socket.send(JSON.stringify({type:"set-color",colour}))
                collection.push({roomid,socket,colour})
            }
            else{
                console.log("white condition")
                colour="white"
                socket.send(JSON.stringify({type:"set-color",colour}))
                collection.push({roomid,socket,colour})

            }
        }
        if(parsed_msg.type=='move-made'){
            const file=parsed_msg.file
            const rank=parsed_msg.rank
            const p_id=parsed_msg.piece_id
            const colour=parsed_msg.colour
            const sessionid=parsed_msg.roomId
            const pair=collection.filter((p)=>{ return p.roomid==sessionid && p.colour!=colour})
            if(pair.length!=0){
            pair[0].socket.send(JSON.stringify({type:"move-made",file:file,rank:rank,piece_id:p_id}))
            }
            else{
                console.log("no second player exists ")
            }
        }
        if(parsed_msg.type=='piece-removed'){
            const piece_id=parsed_msg.piece_id
            const roomId=parsed_msg.roomId
            const pair=collection.filter((p)=>{return p.roomid==roomId})
            if(pair.length!=0){
                pair[0].socket.send(JSON.stringify({type:"piece-removed",piece_id:piece_id}))
            }
            else{
                console.log("could'nt find the secodn player ")
            }
            
            
        }
    })

})



