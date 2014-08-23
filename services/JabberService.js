"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");

//Load modules
var xmpp = require('node-xmpp');
var domain = require("domain");

/*
 * Send chat message
 * */
exports.sendFBChatMessage = function (senderId, receiverId, accessToken, message, appId) {
    var emitter = this;

    var jabberClient = new xmpp.Client({
        jid: senderId + "@chat.facebook.com",
        api_key: appId,
        access_token: accessToken
    });

    jabberClient.on('online', function () {
        var element = new xmpp.Element('message',
            {
                to: "-" + receiverId + "@chat.facebook.com",
                from: "-" + senderId + "@chat.facebook.com",
                type: 'chat'
            });
        element.c("body").t(message);
        element.c("active", {xmlns: 'http://jabber.org/protocol/chatstates'});

        log.info("Online, Sending private message in facebook: " + element.toString());

        jabberClient.send(element);

        getMistakeWrapper()(function () {
            jabberClient.close();
        }).catch(function (err) {
                log.warn("Killing client via domain", err);
            });

    });

    jabberClient.on('error', function (e) {
        emitter.emit(EventName.ERROR, e);
    });

    jabberClient.on('stanza', function (s) {
        console.log("Stanza : " + s);
    });

}.toEmitter();

function getMistakeWrapper(func) {
    var F = function () {
    };
    var dom = domain.create();
    F.prototype.catch = function (errHandle) {
        var args = arguments;
        dom.on("error",function (err) {
            return errHandle(err);
        }).run(function () {
                func.call(null, args);
            });
        return this;
    };
    return new F();
}