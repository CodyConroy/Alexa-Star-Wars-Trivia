'use strict';

/** 
 * Below are the gobal variables of my function. Most hold the string for the 
 * corresponding question while others are an array hoding the possible answers
 * to each question. The variable num is used within getRandomInt and holds the
 * value which lets alexa know which question to ask and which question to
 * list the answer options for.
 */
 
var ans1 = ["one", "four", "three", "six"];
var ques1 = "How many people can the legendary millennium  falcon fit in its cockpit?"; //Answer: Four

var ans2 = ["mon cala", "hoth", "kamino", "dagobah"];
var ques2 = "What planet does the famous Admiral Ackbar call his homeland?"; //Answer: Mon Cala

var ans3 = ["shii-cho", "niman", "soresu", "juyo"];
var ques3 = "What form of lightsaber combat does Obi Wan Kenobi use?"; //Answer: Soresu

var ans4 = ["23,000 credits", "5,000 credits", "7,000 credits", "17,000 credits"];
var ques4 = "How much total does Obi-Wan Kenobi agree to pay Han Solo for safe passage to Alderaan?"; //Answer: 17,000 credits

var num = 0;
var count = 0;

/**
 * the getRandomInt function generates a random number from 0 to 3.
 * This function is utizied within both introIntent and anotherQues.
 * 0 represents question 1, 1 represents question 2, etc.
 */
 
function getRandomInt() {
  let max = 3;
  return Math.floor(Math.random() * (max + 1));
}

 /** 
 * var handlers is where all of my intents can be found.
 */ 
 
var handlers = {
  'LaunchRequest': function () { 
      this.emit(':tell', "There is no intent by that name."); 
  },
  
  /**
   * introIntent utilizies the getRandomInt() function and picks a question to
   * ask based off of the number that was generated. Alexa will then say the
   * question.
  */ 
  
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
    count++;
  },
  
  /** 
   * The quesOpt function gives the user options to choose from if he or she 
   * wishes to do so. In order for this function to be executed, the user must
   * ask aexa for a list of options after she has asked the question. The
   * function will then use the random number generated to pick the question
   * asked to determine the appropiate list of answers. This list of answers 
   * is in the form of a string array.
  */
  
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
  
  /** 
   * the answer function is a way for the user to give an answer to alexa's
   * question. The answer function utlizies the ansCheck function, which is 
   * defined below, to determine if the asnwer the user has provided is correct
   * or not.
  */ 
  
  'answer' : function () {
    let ans = this.event.request.intent.slots.actAns.value;
    this.response.speak(ansCheck(ans));
    this.emit(':responseReady');
  },
  
  /** 
   * The anotherQues function is used once a question has been answered. In
   * order for 
  */ 
  
  'anotherQues': function () {
    if(count > 0) {
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
    count++;
  },
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
