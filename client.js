var net = require('net');
function netcall () {
var client = new net.Socket();
client.setTimeout(3000);
client.on('timeout', () => {
  console.log('socket timeout');
  client.end();
});
var r= Math.ceil(Math.random()*500)
 
client.connect(3000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(r%2==0 ? 'SEND_TIME' : 'SEND_DATE');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});
client.on('error',function(){
    console.log("Error occured");
});
client.on('close', function() {
	console.log('Connection closed');
});
}
for( i=0;i<5000;i++){
var sec= 5000+  Math.random()*1000;
setTimeout(netcall,sec)

}
console.log("++++++++++++++++++")