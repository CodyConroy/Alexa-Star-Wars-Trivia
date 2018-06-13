'use strict';

/** 
 * The function Trivia creates a Trivia object which will hold a question in the
 * form of a string and also an array of answers.
 */
 
function Trivia(ques, ans, correctAns) {
  this.ques = ques;
  this.ans = ans;
  this.correctAns = correctAns;
}

/**
 * Below is an array which holds various Trivia objects. There are seven total
 * Trivia objects representing seven different questions.
 */ 
 
var questions = [];
questions.push(new Trivia("How many people can the legendary millennium  falcon fit in its cockpit?", 
                          ["one", "four", "three", "six"],
                          "four")); //Answer: Four
questions.push(new Trivia("What planet does the famous Admiral Ackbar call his homeland?", 
                          ["mon cala", "hoth", "kamino", "dagobah"],
                          "mon cala")); //Answer: Mon Cala
questions.push(new Trivia("What form of lightsaber combat does Obi Wan Kenobi use?", 
                          ["shii-cho", "niman", "soresu", "juyo"],
                          "soresu")); //Answer: Soresu
questions.push(new Trivia("How much total does Obi-Wan Kenobi agree to pay Han Solo for safe passage to Alderaan?", 
                          ["23,000 credits", "5,000 credits", "7,000 credits", "17,000 credits"],
                          "17,000 credits")); //Answer: 17,000 credits
questions.push(new Trivia("Which crime is not found on Jyn Erso's rap sheet?", 
                          ["forging imperial documents", "shipjacking", "petty theft", "impersonating a stormtrooper"],
                          "impersonating a stormtrooper")); //Answer: Impersonating a Stormtrooper
questions.push(new Trivia("At the end of Episode 7, Rey finds Luke Skywalker and says what?", 
                          ["'may the force be with you'", "nothing", "'I found you'", "'I need your help'"],
                          "nothing")); //Answer: Nothing
questions.push(new Trivia("What is the actual name of the Cantina where Obi-Wan and Luke meet Han and Chewie?", 
                          ["bibble's bar", "chalmun's spaceport cantina", "docking bay 94 port", "adi's port cantina"],
                          "chalmun's")); //Answer: Chalmun's

/**
 * var num will be the question that the random number henerator generates, and
 * count will be the number of questions asked for your current Trivia Game
 * session.
 */
 
var num = 0;
var count = 1;
var usedQues = [];

/**
 * the getRandomInt function generates a random number from 0 to 3.
 * This function is utizied within both introIntent and anotherQues.
 * 0 represents question 1, 1 represents question 2, etc.
 */
 
function getRandomInt() {
  let max = questions.length - 1;
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
  
  'introIntent': function() { 
    num = getRandomInt();
    usedQues.push(num);
    count = 1;
    this.response.speak("Question number " + count + ": " + questions[num].ques).listen("");
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
  
  'quesOpt': function() { 
      let opt = "";
      for(let i = 0; i < questions[num].ans.length - 1; i++) {
        opt += questions[num].ans[i] + ", ";
      }
      opt += " or " + questions[num].ans[questions[num].ans.length - 1];
      this.response.speak("Your options are " + opt + ".").listen("Roger doger");
      this.emit(':responseReady');
  },
  
  /** 
   * the answer function is a way for the user to give an answer to alexa's
   * question. The answer function utlizies the ansCheck function, which is 
   * defined below, to determine if the asnwer the user has provided is correct
   * or not.
  */ 
  
  'answer' : function() {
    let ans = this.event.request.intent.slots.actAns.value;
    this.response.speak(ansCheck(ans)).listen("");
    this.emit(':responseReady');
  },
  
  /** 
   * The leave function simply just has alexa say a goodbye message to the user.
   * In order to have alexa say her goodbye message, the user must say "stop",
   * "goodbye", "I want out", "no more test", "stop this madness", "goodbye alexa",
   * or "please let me leave." Once one of these phrases have been said, Alexa
   * will exit the star wars trivia Skill.
  */ 
  
  'leave': function() {
    this.response.speak("Goodbye and may the force be with you.");
    this.emit(':responseReady');
  },
  
  /** 
   * The anotherQues function is used once a question has been answered. In
   * order for the function to be initiated, the user must have already been
   * asked a question. The user, however, did not have to answer the previous
   * question in order to ask Alexa to give another one. 
  */ 
  
  'anotherQues': function() {
    num = getRandomInt();
    for(let i = 0; i < usedQues.length; i++) {
      if(num == usedQues[i]) {
        num = getRandomInt();
      }
    }
    usedQues.push(num);
    this.response.speak("Question number " + count + ": " + questions[num].ques).listen("");
    this.emit(':responseReady');
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
  if(actAns == questions[num].correctAns) {
    return "That is correct!";
  }
  else {
    for(let i = 0; i < 4; i++) {
      if(actAns == questions[num].ans[i]) {
        return "That was an option, but incorrect. I pity your lack of intelligence";
      }
    }
    return "Dude. That was not even an option. You need to stop";
  }
}

exports.handler = function(event, context, callback) {
    const Alexa = require("alexa-sdk");
    
    var alexa = Alexa.handler(event, context);
    
    alexa.registerHandlers(handlers);
    alexa.execute();
};
