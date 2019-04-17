'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const makeRichText = Alexa.utils.TextUtils.makeRichText;

var fillerTextContent ="Nobody is going to read or hear this. At least, I hope not. Because, if they do, they'll realise that they have learned nothing of value.";
var imgAddress = "http://www.pngall.com/wp-content/uploads/2016/07/Car-Transparent.png";
var imgTwoAddress = "http://www.pngall.com/wp-content/uploads/2016/07/Car-High-Quality-PNG.png";
var colorImage = "https://s3.amazonaws.com/imageslambda/colors.png";
var templateBackground = "https://s3.amazonaws.com/imageslambda/bac.jpg";
var carInterior = "https://s3.amazonaws.com/imageslambda/interior.png";
var modelmage = "https://www.lamborghini.com/sites/it-en/files/DAM/it/models_gateway/blocks/special.png";
var model = []
const handlers = {
    'LaunchRequest': function () {
        var speechOutput = "Welcome to the Mazda car configurator. How can I help?";
        var reprompt = "How can I help?";
        
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(":responseReady");
    },
    'ElementSelected': function () {
        if (this.event.request.token == 'one')
        {
            var speechOutput = "You have selected " + this.event.request.token;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
        else if (this.event.request.token == 'two')
        {
            const bodyTemplate3 = new Alexa.templateBuilders.BodyTemplate3Builder();
                    
            var template = bodyTemplate3.setTitle("Body Template 3 Title")
                                .setTextContent(makePlainText(fillerTextContent))
                                .setImage(makeImage(imgAddress))
                                .build();
                                
            this.response.speak("Rendering Body Template 3")
                                .renderTemplate(template)
                                .shouldEndSession(null);
            this.emit(":responseReady");
        }
    },
    'BodyTemplateIntent': function () {
        var userNumber;
        
        if (this.event.request.intent.slots.numberValue.value)
            userNumber = this.event.request.intent.slots.numberValue.value;
            
        if (userNumber)
        {
            if (supportsDisplay.call(this))
            {
                if (userNumber == 2)
                {   
                    model.push(userNumber)
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                    var template = bodyTemplate2.setTitle("Choosing model")
                                        .setImage(makeImage(modelmage))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();
                                        
                    this.response.speak("Car model. What do you want to configure next?")
                                        .renderTemplate(template)
                                        .shouldEndSession(null);
                    this.emit(":responseReady");
                }
                else if (userNumber == "porsche")
                {
                    const bodyTemplate7 = new Alexa.templateBuilders.BodyTemplate7Builder();
                    
                    var template = bodyTemplate7.setTitle("Body Template 2 Title")
                                        .setImage(makeImage(imgAddress))
                                        .build();
                                        
                    this.response.speak("Rendering Body Template 7")
                                        .renderTemplate(template)
                                        .shouldEndSession(null);
                    this.emit(":responseReady");
                }
            }
            else
            {
                var speechOutput = fillerTextContent + " What would you like?";
                var reprompt = "What would you like?";
            
                this.response.speak(speechOutput);
                this.response.listen(reprompt);
                this.emit(":responseReady");
            }
        }
        else
        {
            var speechOutput = "Sorry, I didn't quite get that. What would you like?";
            var reprompt = "What would you like?";
        
            this.response.speak(speechOutput);
            this.response.listen(reprompt);
            this.emit(":responseReady");
        }
    },
    'ColorTemplateIntent': function () {
        var colorNameVar;
        
        colorNameVar = this.event.request.intent.slots.colorName.value;
        if (colorNameVar == "orange")
                {
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                    var template = bodyTemplate2.setTitle("your " + colorNameVar + " car" + "from model "+ model[0])
                                        .setImage(makeImage(carInterior))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();
                                        
                     var template2 = bodyTemplate2.setTitle("your " + colorNameVar + " car" + "from model "+ model[0])
                                        .setImage(makeImage(imgAddress))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();

                                        
                    this.response.speak("Giving you the color of your choice. What do you want to configure next? ")
                    .renderTemplate(template2)
                    .shouldEndSession(null);
                    this.emit(":responseReady");
                    
                }
        else if (colorNameVar == "yellow")
                {
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                    var template = bodyTemplate2.setTitle("your " + colorNameVar + " car")
                                        .setImage(makeImage(imgTwoAddress))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();
                    this.response.speak("Giving you the color of your choice "+ colorNameVar)
                    .renderTemplate(template)
                    .shouldEndSession(null);
                    this.emit(":responseReady");
                }
         
    },
    'NextColorIntent': function () {
        
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                                        
                     var template2 = bodyTemplate2.setTitle("car color")
                                        .setImage(makeImage(colorImage))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();

                                        
                    this.response.speak("Choose your car color")
                    .renderTemplate(template2)
                    .shouldEndSession(null);
                    this.emit(":responseReady");
                    
         
    },
    'NextInteriorIntent': function () {
        
                    const bodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();
                    
                                        
                     var template2 = bodyTemplate2.setTitle("car interior")
                                        .setImage(makeImage(carInterior))
                                        .setBackgroundImage(makeImage(templateBackground))
                                        .build();

                                        
                    this.response.speak("Choose your car interior")
                    .renderTemplate(template2)
                    .shouldEndSession(null);
                    this.emit(":responseReady");
                    
         
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function supportsDisplay() {
    var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

    return hasDisplay;
}