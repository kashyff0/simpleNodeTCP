# simpleNodeTCP
Simple TCP server and client for custom command and response
Commands supported for now:
1. SEND_DATE - request current date from server
2.SEND_TIME - request current time.

client.js creates and sends 1000 requests with random command
Usage:
npm install
node server.js
In another terminal
node client.js

Can also be called from browser
After running server,  open following from browser
http://localhost/SEND_DATE
or
http://localhost/SEND_TIME

