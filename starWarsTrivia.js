'use strict';

var ans1 = ["one", "four", "three", "six"];
var ques1 = "How many people can the legendary millennium  falcon fit in its cockpit?"; //Answer: Four

var ans2 = ["mon cala", "hoth", "kamino", "dagobah"];
var ques2 = "What planet does the famous Admiral Ackbar call his homeland?"; //Answer: Mon Cala

var ans3 = ["shii-cho", "niman", "soresu", "juyo/vaapad"];
var ques3 = "What form of lightsaber combat does Obi Wan Kenobi use?"; //Answer: Soresu

var ans4 = ["23,000 credits", "5,000 credits", "7,000 credits", "17,000 credits"];
var ques4 = "How much total does Obi-Wan Kenobi agree to pay Han Solo for safe passage to Alderaan?"; //Answer: 17,000 credits

var num = 0;

function getRandomInt() {
  let max = 3;
  return Math.floor(Math.random() * (max + 1));
}

var handlers = {
  'LaunchRequest': function () { 
      this.emit(':tell', "There is no intent by that name."); 
  },
  'introIntent': function () { 
    num = getRandomInt();
    if(num == 0) {
        this.response.speak(ques1)
            .listen("");
    }
    else if(num == 1) {
        this.response.speak(ques2)
            .listen("");
    }
    else if(num == 2) {
        this.response.speak(ques3)
            .listen("");
    }
    else {
        this.response.speak(ques4)
            .listen("");
    }
    this.emit(':responseReady');
  },
  'quesOpt': function () { 
      let opt = "";
      if(num == 0) {
        for(let i = 0; i < ans1.length; i++) {
          if(i < ans1.length - 1) {
            opt += ans1[i] + ", ";
          }
          else {
            opt += "or " + ans1[i];
          }
        }
      }
      else if(num == 1) {
        for(let i = 0; i < ans2.length; i++) {
          if(i < ans2.length - 1) {
            opt += ans2[i] + ", ";
          }
          else {
            opt += "or " + ans2[i];
          }
        }
      }
      else if(num == 2) {
        for(let i = 0; i < ans3.length; i++) {
          if(i < ans3.length - 1) {
            opt += ans3[i] + ", ";
          }
          else {
            opt += "or " + ans3[i];
          }
        }
      }
      else if(num == 3) {
        for(let i = 0; i < ans4.length; i++) {
          if(i < ans4.length - 1) {
            opt += ans4[i] + ", ";
          }
          else {
            opt += "or " + ans4[i];
          }
        }
      }
      this.response.speak("Your options are " + opt + ".").listen("Roger doger");
      this.emit(':responseReady');
  },
  'answer' : function () {
    let ans = this.event.request.intent.slots.actAns.value;
    this.response.speak(ansCheck(ans));
    this.emit(':responseReady');
  },
  'anotherQues': function () {
    num = getRandomInt();
    if(num == 0) {
        this.response.speak(ques1)
            .listen("");
    }
    else if(num == 1) {
        this.response.speak(ques2)
            .listen("");
    }
    else if(num == 2) {
        this.response.speak(ques3)
            .listen("");
    }
    else {
        this.response.speak(ques4)
            .listen("");
    }
    this.emit(':responseReady');
  }
};

/** 
 * ansCheck is a function that checks the user's answer. It then tells them if
 * they were correct or incorrect. If incorrect, alexa will tell you that your 
 * answer was either incorrect and not on her list of options or that you were
 * incorrect and that your answer was on her list of options.
 * */ 
 
function ansCheck(actAns) {
  if(num == 0) {
    if(actAns == "four" || actAns == "4") {
      return "That is correct!";
    }
    for(let i = 0; i < ans1.length; i++) {
      if((actAns != "four" || actAns != "4") && actAns == ans1[i]) {
        return "That was an option, but incorrect. I pity your lack of intelligence";
      }
    }
    for(let i = 0; i < ans1.length; i++) {
      if((actAns != "four" || actAns != "4") && actAns != ans1[i]) {
        return "Dude. That wasn't even an option. What are you doing.";
      }
    }
  }
  else if(num == 1) {
    if(actAns == "mon cala") {
      return "That is correct!";
    }
    for(let i = 0; i < ans2.length; i++) {
      if(actAns != "mon mala" && actAns == ans2[i]) {
        return "That was an option, but incorrect. I pity your lack of intelligence";
      }
    }
    for(let i = 0; i < ans2.length; i++) {
      if(actAns != "mon cala" && actAns != ans2[i]) {
        return "Dude. That wasn't even an option. What are you doing.";
      }
    }
      
  }
  else if(num == 2) {
    if(actAns == "soresu") {
      return "That is correct!";
    }
    for(let i = 0; i < ans3.length; i++) {
      if(actAns != "soresu" && actAns == ans3[i]) {
        return "That was an option, but incorrect. I pity your lack of intelligence";
      }
    }
    for(let i = 0; i < ans3.length; i++) {
      if(actAns != "soresu" && actAns != ans3[i]) {
        return "Dude. That wasn't even an option. What are you doing.";
      }
    }
  }
  else if(num == 3) {
    if(actAns == "17,000" || actAns == "17,000 credits") {
      return "That is correct!";
    }
    for(let i = 0; i < ans4.length; i++) {
      if((actAns != "17,000 credits" || actAns != "17,000") && actAns == ans4[i]) {
        return "That was an option, but incorrect. I pity your lack of intelligence";
      }
    }
    for(let i = 0; i < ans4.length; i++) {
      if((actAns != "17,000 credits" || actAns != "17,000") && actAns != ans4[i]) {
        return "Dude. That wasn't even an option. What are you doing.";
      }
    }
  }
}

exports.handler = function(event, context, callback) {
    const Alexa = require("alexa-sdk");
    
    var alexa = Alexa.handler(event, context);
    
    alexa.registerHandlers(handlers);
    alexa.execute();
};
