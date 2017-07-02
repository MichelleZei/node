/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 */
"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
console.log("Server starting");
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
function handleRequest(_request, _response, _inputs) {
    console.log("Request received");
    let query = Url.parse(_request.url, true).query;
    var command = query["command"];
    switch (command) {
        case "insert":
            let student = {
                name: query["name"],
                firstname: query["firstname"],
                matrikel: parseInt(query["matrikel"])
            };
            Database.insert(student);
            respond(_response, "Du hast folgende Daten eingegeben: " + "\n" + "Name: " + student.name + "\n" + "Vorname: " + student.firstname + "\n" + "Matrikelnummer :" + student.matrikel);
            break;
        case "find":
            Database.findAll(function (json) {
                respond(_response, json);
            });
            break;
        case "search":
            Database.findOne(function (json) {
                respond(_response, json);
            });
            //            filter(_request, _response, _inputs);
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
}
//function filter(_request: Http.IncomingMessage, _response: Http.ServerResponse, _inputs: HTMLInputElement): void {
//    let query: AssocStringString = Url.parse(_request.url, true).query;
//    let student: StudentData;
//    let studentArray: StudentData[];
//    for (var i: number = 0; i < studentArray.length; i++) {
//        if (student.name == _inputs.value) {
//            respond(_response, student.name + student.firstname + student.matrikel);
//        }
//        else
//            respond(_response, "Die Suche war leider nicht erfolgreich");
//
//        if (student.matrikel == _inputs.valueAsNumber) {
//            respond(_response, student.name + student.firstname + student.matrikel);
//        }
//        else
//            respond(_response, "Die Suche war leider nicht erfolgreich");
//    }
//}
function respond(_response, _text) {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map