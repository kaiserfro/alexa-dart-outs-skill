'use strict';

var AlexaSkill = require('./AlexaSkill');
var Outs = require('./outs');

var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var DartOuts = function () {
    AlexaSkill.call(this, APP_ID);
};

DartOuts.prototype = Object.create(AlexaSkill.prototype);
DartOuts.prototype.constructor = DartOuts;

DartOuts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the dart out Helper. You can ask a question like, what's the out for 170? ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

DartOuts.prototype.intentHandlers = {
    "OutIntent": function (intent, session, response) {
        var pointSlot = intent.slots.Points;
        var cardTitle = 'Out for ' + pointSlot.value;
        var speechOutput;
        if (pointSlot.value in Outs) {
            var outResponse = Outs[pointSlot.value];
            speechOutput = {
                speech: outResponse,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, outResponse);
        }
        else {
            var speech;
            speech = "I'm sorry, there is no out for " + pointSlot.value;
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, speech);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about dart outs such as, what's the out for 170, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what's the out for 170, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var dartOuts = new DartOuts();
    dartOuts.execute(event, context);
};
