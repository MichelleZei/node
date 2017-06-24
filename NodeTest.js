"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    //    let key: string;
    //    for (key in query)
    //        console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("Sie haben folgendes bestellt:" + "<br>" + "Vanille:" + " " + query["Schoko"] + "<br>");
    _response.write("Die Bestellung geht an: " + query["Vorname"] + " " + query["Name"] + " " + query["strasse"] + "<br>");
    _response.write("Die Rechnung geht an: " + query["Mail"] + "<br>");
    _response.write("Sie haben " + query["Versand"] + "gew�hlt.");
    _response.end();
}
//# sourceMappingURL=NodeTest.js.map