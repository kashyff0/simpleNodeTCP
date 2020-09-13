var net = require('net');
//import * as wp from 'workerpool'
const workerpool = require('workerpool');

const pool = workerpool.pool();
 
const PORT = 3000
const IP = '127.0.0.1'
const BACKLOG = 100
 var connectionCount=0;

function handleRequest(requestReceived) {

let command=""
var isHttp= false
 if(requestReceived.startsWith('GET')){
 
  parts= requestReceived.split("\r\n")
  params = parts[0].split(" ")
  command = params[1].replace("/","")
  isHttp= true;
 }
  else {
    
     command= requestReceived

  }
  console.log("command=",command)
 let resp= ""
  let date_ob = new Date();
   switch(command){
    case 'SEND_TIME':
    
      resp=  ("0" + date_ob.getHours()).slice(-2)+ ":" + ("0" +date_ob.getMinutes()).slice(-2)+ ":" + ("0" +date_ob.getSeconds()).slice(-2);
       break;
   case 'SEND_DATE':
 
    resp =  ("0"+date_ob.getDate()).slice(-2)+ "/" + ("0"+ (1+date_ob.getMonth())) .slice(-2)+ "/" + date_ob.getFullYear(); 
    break;   
    default:
      resp =  command

   }

   if(isHttp)
   resp= "HTTP/1.1 200 OK"+"\r\n\r\n"+resp.toString('base64')
console.log("resp",resp);
return resp;
}





net.createServer()
  .listen(PORT, IP, BACKLOG)
  .on('connection', socket => {
    console.log('>>>>>>>new connection',connectionCount)
    connectionCount++;
    socket
      .on('data', buffer => {
        pool.exec(handleRequest, [buffer.toString()])
        .then(res => {
          socket.write(res)
          console.log('done with connection')
          socket.end()
          connectionCount--;
        })
        .catch(function (err) {
          console.log("ERR",err)
          socket.end()
          connectionCount--;
          pool.terminate()
        })
        .then(function () {
         if(connectionCount<=0)
         pool.terminate();
        });
      })
      socket.on('close', function(data) {
        console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);

      })

      socket.on('error', function(data) {
        console.log('Error : ' +  data);
       socket.end()
      })
  })