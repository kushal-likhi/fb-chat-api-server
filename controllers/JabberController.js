"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");


/*
 * Send message
 * */
exports.sendFBChatMessage = function (req, res) {
    //Validations
    req.assert('senderId', 'Sender ID is required.').notEmpty();
    req.assert('receiverId', 'Receiver ID is required.').notEmpty();
    req.assert('accessToken', 'Please provide an access token with the chat rights.').notEmpty();
    req.assert('appId', 'Please provide your fb app id.').notEmpty();
    req.assert('message', 'Limit should be greater than 1 or -1 for infinite.').notEmpty();

    //Check for Errors
    var errors = req.validationErrors();

    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);  //Validation Failed
    } else {
        //Go Ahead
        JabberService.sendFBChatMessage(
                req.param("senderId"),
                req.param("receiverId"),
                req.param("accessToken"),
                req.param("message"),
                req.param("appId")
            )
            .on(EventName.ERROR, function (err) {
                log.error(err);
                res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
            })
            .on(EventName.DONE, function () {
                res.sendSuccessAPIResponse({
                    status: "ok"
                }, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
            });
    }
}