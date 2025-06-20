import { QuizQuestion } from '../contexts/QuizContext';

export const quizData: QuizQuestion[] = [
  // BEGINNER LEVEL QUESTIONS (Easy)
  {
    id: 1,
    question: "How many students in your class ___ from Korea?",
    options: ["come", "comes", "are coming", "came"],
    correctAnswer: "come",
    topic: "general",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "What is the capital city of France?",
    options: ["London", "Berlin", "Madrid", "Paris"],
    correctAnswer: "Paris",
    topic: "geography",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    topic: "science",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    topic: "science",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    topic: "science",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    topic: "general",
    difficulty: "beginner"
  },
  {
    id: 7,
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    topic: "general",
    difficulty: "beginner"
  },
  {
    id: 8,
    question: "Which instrument has 88 keys?",
    options: ["Guitar", "Violin", "Piano", "Flute"],
    correctAnswer: "Piano",
    topic: "general",
    difficulty: "beginner"
  },
  {
    id: 9,
    question: "In which sport would you perform a slam dunk?",
    options: ["Football", "Basketball", "Tennis", "Golf"],
    correctAnswer: "Basketball",
    topic: "sports",
    difficulty: "beginner"
  },
  {
    id: 10,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    topic: "geography",
    difficulty: "beginner"
  },
  
  // INTERMEDIATE LEVEL QUESTIONS (Medium)
  {
    id: 11,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    topic: "history",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green",
    topic: "general",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    topic: "geography",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: "Skin",
    topic: "science",
    difficulty: "intermediate"
  },
  {
    id: 15,
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Gold", "Copper"],
    correctAnswer: "Mercury",
    topic: "science",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Japan", "South Korea"],
    correctAnswer: "Japan",
    topic: "geography",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    topic: "science",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    topic: "history",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    topic: "geography",
    difficulty: "intermediate"
  },
  {
    id: 20,
    question: "What is the main component of air?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen",
    topic: "science",
    difficulty: "intermediate"
  },
  
  // EXPERT LEVEL QUESTIONS (Hard)
  {
    id: 21,
    question: "Who discovered penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
    correctAnswer: "Alexander Fleming",
    topic: "science",
    difficulty: "expert"
  },
  {
    id: 22,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond",
    topic: "science",
    difficulty: "expert"
  },
  {
    id: 23,
    question: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    correctAnswer: "Neil Armstrong",
    topic: "history",
    difficulty: "expert"
  },
  {
    id: 24,
    question: "Which team has won the most FIFA World Cup tournaments?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctAnswer: "Brazil",
    topic: "sports",
    difficulty: "expert"
  },
  {
    id: 25,
    question: "Who holds the record for the most Olympic gold medals?",
    options: ["Usain Bolt", "Michael Phelps", "Simone Biles", "Carl Lewis"],
    correctAnswer: "Michael Phelps",
    topic: "sports",
    difficulty: "expert"
  },
  {
    id: 26,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "United Kingdom", "Brazil", "Russia"],
    correctAnswer: "Brazil",
    topic: "sports",
    difficulty: "expert"
  },
  {
    id: 27,
    question: "What year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: "1945",
    topic: "history",
    difficulty: "expert"
  },
  {
    id: 28,
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Mother Teresa", "Marie Curie", "Rosalind Franklin", "Ada Lovelace"],
    correctAnswer: "Marie Curie",
    topic: "history",
    difficulty: "expert"
  },
  {
    id: 29,
    question: "Which mountain is the tallest in the world?",
    options: ["K2", "Kilimanjaro", "Mount Everest", "Matterhorn"],
    correctAnswer: "Mount Everest",
    topic: "geography",
    difficulty: "expert"
  },
  {
    id: 30,
    question: "Which sport uses the term 'love' for a score of zero?",
    options: ["Golf", "Tennis", "Cricket", "Basketball"],
    correctAnswer: "Tennis",
    topic: "sports",
    difficulty: "expert"
  },
  
  // Adding technology-specific questions based on topics
  // JAVASCRIPT - BEGINNER
  {
    id: 31,
    question: "What keyword is used to declare a variable in JavaScript?",
    options: ["variable", "var", "v", "int"],
    correctAnswer: "var",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 32,
    question: "How do you create an alert box in JavaScript?",
    options: ["alert()", "msg()", "alertBox()", "msgBox()"],
    correctAnswer: "alert()",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 33,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    options: ["=", "*", "==", "==="],
    correctAnswer: "=",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 34,
    question: "How do you write a comment in JavaScript?",
    options: ["<!-- comment -->", "/* comment */", "// comment", "# comment"],
    correctAnswer: "// comment",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 35,
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = (1:'red', 2:'green')", "var colors = 'red', 'green'", "var colors = ['red', 'green']", "var colors = 'red' + 'green'"],
    correctAnswer: "var colors = ['red', 'green']",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 36,
    question: "How do you declare a JavaScript function?",
    options: ["function = myFunction()", "function:myFunction()", "function myFunction()", "create myFunction()"],
    correctAnswer: "function myFunction()",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 37,
    question: "How do you call a function named 'myFunction'?",
    options: ["call myFunction()", "myFunction()", "call function myFunction()", "myFunction.start()"],
    correctAnswer: "myFunction()",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 38,
    question: "What is the correct JavaScript syntax to change the content of an HTML element with id='demo'?",
    options: ["document.getElementById('demo').innerHTML = 'Hello';", "demo.innerHTML = 'Hello';", "document.getElement('demo').innerHTML = 'Hello';", "#demo.innerHTML = 'Hello';"],
    correctAnswer: "document.getElementById('demo').innerHTML = 'Hello';",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 39,
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function = myFunction()", "function:myFunction()", "declare myFunction()"],
    correctAnswer: "function myFunction()",
    topic: "javascript",
    difficulty: "beginner"
  },
  {
    id: 40,
    question: "What is the correct way to write an IF statement in JavaScript?",
    options: ["if i = 5 then", "if i == 5", "if (i == 5)", "if i = 5"],
    correctAnswer: "if (i == 5)",
    topic: "javascript",
    difficulty: "beginner"
  },
  
  // JAVASCRIPT - INTERMEDIATE
  {
    id: 41,
    question: "Which method adds an element to the end of an array in JavaScript?",
    options: ["push()", "append()", "addToEnd()", "insert()"],
    correctAnswer: "push()",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "What does DOM stand for in JavaScript?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
    correctAnswer: "Document Object Model",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 43,
    question: "What will the following code return: Boolean(10 > 9)?",
    options: ["true", "false", "NaN", "undefined"],
    correctAnswer: "true",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 44,
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onclick", "onmouseover", "onchange", "onmouseclick"],
    correctAnswer: "onclick",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 45,
    question: "How do you find the number with the highest value of x and y?",
    options: ["Math.ceil(x, y)", "top(x, y)", "Math.max(x, y)", "Math.highest(x, y)"],
    correctAnswer: "Math.max(x, y)",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "What is the correct way to write a JavaScript object?",
    options: ["var person = {firstName:'John', lastName:'Doe'};", "var person = [firstName:'John', lastName:'Doe'];", "var person = firstName:'John', lastName:'Doe';", "var person = (firstName:'John', lastName:'Doe');"],
    correctAnswer: "var person = {firstName:'John', lastName:'Doe'};",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 47,
    question: "How do you round the number 7.25 to the nearest integer?",
    options: ["round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
    correctAnswer: "Math.round(7.25)",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "What is the correct JavaScript syntax for opening a new window?",
    options: ["window.open()", "window.new()", "open.window()", "new.window()"],
    correctAnswer: "window.open()",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "What will the following code return: typeof []?",
    options: ["array", "object", "undefined", "null"],
    correctAnswer: "object",
    topic: "javascript",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "Which method is used to remove the last element from an array?",
    options: ["pop()", "last()", "remove()", "delete()"],
    correctAnswer: "pop()",
    topic: "javascript",
    difficulty: "intermediate"
  },
  
  // JAVASCRIPT - EXPERT
  {
    id: 51,
    question: "What is the output of: console.log(typeof typeof 1)?",
    options: ["number", "string", "undefined", "NaN"],
    correctAnswer: "string",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 52,
    question: "Which of these is NOT a JavaScript Promise state?",
    options: ["fulfilled", "pending", "rejected", "resolved"],
    correctAnswer: "resolved",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 53,
    question: "What does the 'use strict' directive do in JavaScript?",
    options: ["Enforces stricter parsing and error handling", "Makes the code run faster", "Allows the use of restricted keywords", "Prevents the use of global variables"],
    correctAnswer: "Enforces stricter parsing and error handling",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 54,
    question: "Which method is used to serialize an object into a JSON string in JavaScript?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.toText()", "JSON.fromObject()"],
    correctAnswer: "JSON.stringify()",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 55,
    question: "What is the purpose of the 'bind' method in JavaScript?",
    options: ["To create a new function with a specific 'this' value", "To combine two strings together", "To create a reference to another object", "To bind an event handler to an element"],
    correctAnswer: "To create a new function with a specific 'this' value",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 56,
    question: "What is a closure in JavaScript?",
    options: ["A function that can access the variables from its outer function scope", "A function with no parameters", "A function that closes the application", "A method to protect code from being accessed"],
    correctAnswer: "A function that can access the variables from its outer function scope",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 57,
    question: "What is the output of: [1, 2, 3, 4].reduce((a, b) => a + b, 0)?",
    options: ["10", "24", "1234", "Error"],
    correctAnswer: "10",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 58,
    question: "Which method would you use to schedule asynchronous execution of a function?",
    options: ["setTimeout()", "setExecute()", "asyncCall()", "callLater()"],
    correctAnswer: "setTimeout()",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 59,
    question: "What does the 'new' keyword do in JavaScript?",
    options: ["Creates a new instance of a user-defined object or built-in object type", "Declares a new variable", "Creates a new scope", "Refreshes the current page"],
    correctAnswer: "Creates a new instance of a user-defined object or built-in object type",
    topic: "javascript",
    difficulty: "expert"
  },
  {
    id: 60,
    question: "What is event bubbling in JavaScript?",
    options: ["When an event triggered on an element also triggers the same event on all parent elements", "When JavaScript errors bubble up to the global scope", "When multiple events are triggered simultaneously", "When events are queued for execution"],
    correctAnswer: "When an event triggered on an element also triggers the same event on all parent elements",
    topic: "javascript",
    difficulty: "expert"
  },
  
  // HTML - BEGINNER
  {
    id: 37,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
    topic: "html",
    difficulty: "beginner"
  },
  {
    id: 38,
    question: "Which tag is used for creating a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
    topic: "html",
    difficulty: "beginner"
  },
  
  // HTML - INTERMEDIATE
  {
    id: 39,
    question: "What attribute is used to define inline styles in HTML?",
    options: ["styles", "class", "style", "css"],
    correctAnswer: "style",
    topic: "html",
    difficulty: "intermediate"
  },
  {
    id: 40,
    question: "Which HTML element is used for playing video files?",
    options: ["<media>", "<video>", "<movie>", "<play>"],
    correctAnswer: "<video>",
    topic: "html",
    difficulty: "intermediate"
  },
  
  // HTML - EXPERT
  {
    id: 41,
    question: "Which HTML5 element is used to specify a header for a document or section?",
    options: ["<head>", "<top>", "<header>", "<section>"],
    correctAnswer: "<header>",
    topic: "html",
    difficulty: "expert"
  },
  {
    id: 42,
    question: "In HTML5, which attribute is used to specify that an input field must be filled out?",
    options: ["validate", "required", "important", "needed"],
    correctAnswer: "required",
    topic: "html",
    difficulty: "expert"
  },
  
  // PROGRAMMING - BEGINNER
  {
    id: 61,
    question: "What is the output of console.log(2 + '2') in JavaScript?",
    options: ["22", "4", "NaN", "Error"],
    correctAnswer: "22",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 62,
    question: "Which of these is a valid way to declare a variable in JavaScript?",
    options: ["let x = 5;", "variable x = 5;", "v x = 5;", "x := 5;"],
    correctAnswer: "let x = 5;",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 63,
    question: "What is the correct way to write a comment in JavaScript?",
    options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment", "# This is a comment"],
    correctAnswer: "// This is a comment",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 64,
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "append()", "add()", "insert()"],
    correctAnswer: "push()",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 65,
    question: "What is the correct way to write an if statement in JavaScript?",
    options: ["if (x === 5) {}", "if x = 5 {}", "if x == 5 {}", "if x === 5 {}"],
    correctAnswer: "if (x === 5) {}",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 66,
    question: "Which operator is used for strict equality comparison?",
    options: ["===", "==", "=", "=>"],
    correctAnswer: "===",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 67,
    question: "What is the correct way to create a function in JavaScript?",
    options: ["function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "create myFunc() {}"],
    correctAnswer: "function myFunc() {}",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 68,
    question: "Which method converts a string to an integer?",
    options: ["parseInt()", "toInteger()", "convertToInt()", "stringToInt()"],
    correctAnswer: "parseInt()",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 69,
    question: "What is the correct way to access an object property?",
    options: ["object.property", "object->property", "object[property]", "object::property"],
    correctAnswer: "object.property",
    topic: "programmer",
    difficulty: "beginner"
  },
  {
    id: 70,
    question: "Which method removes the last element from an array?",
    options: ["pop()", "remove()", "delete()", "splice()"],
    correctAnswer: "pop()",
    topic: "programmer",
    difficulty: "beginner"
  },

  // PROGRAMMING - INTERMEDIATE
  {
    id: 71,
    question: "What is a closure in JavaScript?",
    options: ["A function that has access to variables from its outer scope", "A way to close a program", "A method to protect code", "A type of loop"],
    correctAnswer: "A function that has access to variables from its outer scope",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 72,
    question: "What is the purpose of the 'use strict' directive?",
    options: ["Enforces stricter parsing and error handling", "Makes code run faster", "Allows use of restricted keywords", "Prevents global variables"],
    correctAnswer: "Enforces stricter parsing and error handling",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 73,
    question: "Which method is used to serialize an object to JSON?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.serialize()", "JSON.toJSON()"],
    correctAnswer: "JSON.stringify()",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 74,
    question: "What is the output of typeof []?",
    options: ["object", "array", "undefined", "null"],
    correctAnswer: "object",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "Which method creates a new array with all elements that pass a test?",
    options: ["filter()", "map()", "forEach()", "reduce()"],
    correctAnswer: "filter()",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 76,
    question: "What is the purpose of the bind() method?",
    options: ["Creates a new function with a specific 'this' value", "Combines two strings", "Creates a reference to another object", "Binds an event handler"],
    correctAnswer: "Creates a new function with a specific 'this' value",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "Which method is used to schedule asynchronous execution?",
    options: ["setTimeout()", "setInterval()", "setImmediate()", "setAsync()"],
    correctAnswer: "setTimeout()",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "What is the output of [1, 2, 3].map(x => x * 2)?",
    options: ["[2, 4, 6]", "[1, 2, 3]", "[2, 2, 2]", "[1, 4, 9]"],
    correctAnswer: "[2, 4, 6]",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 79,
    question: "Which method creates a new array with the results of calling a function for every array element?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correctAnswer: "map()",
    topic: "programmer",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "What is the purpose of the async/await syntax?",
    options: ["Handle asynchronous operations more elegantly", "Make code run faster", "Create multiple threads", "Handle errors"],
    correctAnswer: "Handle asynchronous operations more elegantly",
    topic: "programmer",
    difficulty: "intermediate"
  },

  // PROGRAMMING - EXPERT
  {
    id: 81,
    question: "What is the output of console.log(typeof typeof 1)?",
    options: ["string", "number", "undefined", "NaN"],
    correctAnswer: "string",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 82,
    question: "Which of these is NOT a JavaScript Promise state?",
    options: ["resolved", "pending", "fulfilled", "rejected"],
    correctAnswer: "resolved",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 83,
    question: "What is the output of [1, 2, 3, 4].reduce((a, b) => a + b, 0)?",
    options: ["10", "24", "1234", "Error"],
    correctAnswer: "10",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 84,
    question: "What is event bubbling in JavaScript?",
    options: ["When an event triggered on an element also triggers on parent elements", "When JavaScript errors bubble up", "When multiple events trigger simultaneously", "When events are queued"],
    correctAnswer: "When an event triggered on an element also triggers on parent elements",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 85,
    question: "What is the purpose of the Symbol type in JavaScript?",
    options: ["Create unique identifiers", "Create mathematical symbols", "Create special characters", "Create emojis"],
    correctAnswer: "Create unique identifiers",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 86,
    question: "What is the output of console.log(0.1 + 0.2 === 0.3)?",
    options: ["false", "true", "undefined", "Error"],
    correctAnswer: "false",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 87,
    question: "What is the purpose of the Proxy object in JavaScript?",
    options: ["Create a proxy for another object to intercept operations", "Create a proxy server", "Create a proxy connection", "Create a proxy variable"],
    correctAnswer: "Create a proxy for another object to intercept operations",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 88,
    question: "What is the output of console.log([1, 2, 3] + [4, 5, 6])?",
    options: ["1,2,34,5,6", "[1,2,3,4,5,6]", "[1,2,3][4,5,6]", "Error"],
    correctAnswer: "1,2,34,5,6",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 89,
    question: "What is the purpose of the WeakMap object?",
    options: ["Store key-value pairs with weak references to keys", "Create a weak connection", "Store weak values", "Create a weak map"],
    correctAnswer: "Store key-value pairs with weak references to keys",
    topic: "programmer",
    difficulty: "expert"
  },
  {
    id: 90,
    question: "What is the output of console.log(typeof null)?",
    options: ["object", "null", "undefined", "Error"],
    correctAnswer: "object",
    topic: "programmer",
    difficulty: "expert"
  },

  // DUMMY INDUSTRY/ROLE/CLUSTER/SKILL QUESTIONS FOR DEMO (10 per level)
  // UNRANKED
  {
    id: 3001, question: "[Unranked] Dummy Q1", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3002, question: "[Unranked] Dummy Q2", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3003, question: "[Unranked] Dummy Q3", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3004, question: "[Unranked] Dummy Q4", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3005, question: "[Unranked] Dummy Q5", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3006, question: "[Unranked] Dummy Q6", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3007, question: "[Unranked] Dummy Q7", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3008, question: "[Unranked] Dummy Q8", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3009, question: "[Unranked] Dummy Q9", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  {
    id: 3010, question: "[Unranked] Dummy Q10", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "unranked"
  },
  // BRONZE
  {
    id: 3011, question: "[Bronze] Dummy Q1", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3012, question: "[Bronze] Dummy Q2", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3013, question: "[Bronze] Dummy Q3", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3014, question: "[Bronze] Dummy Q4", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3015, question: "[Bronze] Dummy Q5", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3016, question: "[Bronze] Dummy Q6", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3017, question: "[Bronze] Dummy Q7", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3018, question: "[Bronze] Dummy Q8", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3019, question: "[Bronze] Dummy Q9", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  {
    id: 3020, question: "[Bronze] Dummy Q10", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "bronze"
  },
  // SILVER
  {
    id: 3021, question: "[Silver] Dummy Q1", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3022, question: "[Silver] Dummy Q2", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3023, question: "[Silver] Dummy Q3", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3024, question: "[Silver] Dummy Q4", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3025, question: "[Silver] Dummy Q5", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3026, question: "[Silver] Dummy Q6", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3027, question: "[Silver] Dummy Q7", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3028, question: "[Silver] Dummy Q8", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3029, question: "[Silver] Dummy Q9", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  {
    id: 3030, question: "[Silver] Dummy Q10", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "silver"
  },
  // GOLD
  {
    id: 3031, question: "[Gold] Dummy Q1", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3032, question: "[Gold] Dummy Q2", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3033, question: "[Gold] Dummy Q3", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3034, question: "[Gold] Dummy Q4", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3035, question: "[Gold] Dummy Q5", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3036, question: "[Gold] Dummy Q6", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3037, question: "[Gold] Dummy Q7", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3038, question: "[Gold] Dummy Q8", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3039, question: "[Gold] Dummy Q9", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },
  {
    id: 3040, question: "[Gold] Dummy Q10", options: ["A", "B", "C", "D"], correctAnswer: "A", topic: "DummySkill", difficulty: "gold"
  },

  // DUMMY INDUSTRY/ROLE/CLUSTER/SKILL QUESTIONS FOR DEMO (ALL LEVELS)
  {
    id: 2001,
    question: "What color is the Dummy mascot?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Blue",
    topic: "DummySkill",
    difficulty: "unranked"
  },
  {
    id: 2002,
    question: "Which tool is most used in DummyRole?",
    options: ["Hammer", "Laptop", "Brush", "Microscope"],
    correctAnswer: "Laptop",
    topic: "DummySkill",
    difficulty: "bronze"
  },
  {
    id: 2003,
    question: "DummyCluster is famous for which value?",
    options: ["Speed", "Innovation", "Tradition", "Strength"],
    correctAnswer: "Innovation",
    topic: "DummySkill",
    difficulty: "silver"
  },
  {
    id: 2004,
    question: "What is the secret of DummyIndustry's success?",
    options: ["Luck", "Hard Work", "Magic", "Guesswork"],
    correctAnswer: "Hard Work",
    topic: "DummySkill",
    difficulty: "gold"
  }
];

// Update the Quiz interface in QuizContext.ts to include the difficulty level
