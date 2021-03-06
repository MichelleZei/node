console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");

    console.log(_request.url);

    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");

    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);

//    let key: string;
//    for (key in query)
//        console.log(key + ":" + query[key]);

    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write("Die Bestellung geht an: " + query["Vorname"] + " " + query["Name"] + " "  + query["strasse"] + "<br>");
    _response.write("Die Rechnung geht an: " + query["Mail"] + "<br>");
    _response.write("Sie haben " + query["Versand"] + " gew�hlt.");
    _response.end();
}
