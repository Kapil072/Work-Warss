import { QuizQuestion } from '../contexts/QuizContext';

export const quizData: QuizQuestion[] = [
  // UNRANKED LEVEL QUESTIONS (Basic Programming Concepts)
  {
    id: 1,
    question: "What is a variable in programming?",
    options: ["A container for storing data values", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A container for storing data values",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 2,
    question: "What is a function in programming?",
    options: ["A block of code that performs a specific task", "A type of variable", "A programming language", "A computer part"],
    correctAnswer: "A block of code that performs a specific task",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 3,
    question: "What is a loop in programming?",
    options: ["A way to repeat code multiple times", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A way to repeat code multiple times",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 4,
    question: "What is an array in programming?",
    options: ["A collection of elements stored at contiguous memory locations", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A collection of elements stored at contiguous memory locations",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 5,
    question: "What is a string in programming?",
    options: ["A sequence of characters", "A type of number", "A programming language", "A computer part"],
    correctAnswer: "A sequence of characters",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 6,
    question: "What is a boolean in programming?",
    options: ["A data type that can have only true or false values", "A type of number", "A programming language", "A computer part"],
    correctAnswer: "A data type that can have only true or false values",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 7,
    question: "What is an integer in programming?",
    options: ["A whole number without a decimal point", "A type of string", "A programming language", "A computer part"],
    correctAnswer: "A whole number without a decimal point",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 8,
    question: "What is a comment in programming?",
    options: ["Text that is not executed but provides information about the code", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "Text that is not executed but provides information about the code",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 9,
    question: "What is an operator in programming?",
    options: ["A symbol that performs operations on variables and values", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A symbol that performs operations on variables and values",
    topic: "programmer",
    difficulty: "unranked"
  },
  {
    id: 10,
    question: "What is a condition in programming?",
    options: ["A statement that checks if something is true or false", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A statement that checks if something is true or false",
    topic: "programmer",
    difficulty: "unranked"
  },

  // BRONZE LEVEL QUESTIONS (Intermediate Programming Concepts)
  {
    id: 11,
    question: "What is object-oriented programming?",
    options: ["A programming paradigm based on objects", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A programming paradigm based on objects",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 12,
    question: "What is inheritance in programming?",
    options: ["A mechanism that allows a class to inherit properties from another class", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A mechanism that allows a class to inherit properties from another class",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 13,
    question: "What is polymorphism in programming?",
    options: ["The ability of an object to take many forms", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "The ability of an object to take many forms",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 14,
    question: "What is encapsulation in programming?",
    options: ["The bundling of data and methods that operate on that data", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "The bundling of data and methods that operate on that data",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 15,
    question: "What is abstraction in programming?",
    options: ["The concept of hiding complex implementation details", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "The concept of hiding complex implementation details",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 16,
    question: "What is a constructor in programming?",
    options: ["A special method that initializes an object", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A special method that initializes an object",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 17,
    question: "What is a method in programming?",
    options: ["A function that is associated with an object", "A type of variable", "A programming language", "A computer part"],
    correctAnswer: "A function that is associated with an object",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 18,
    question: "What is a class in programming?",
    options: ["A blueprint for creating objects", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A blueprint for creating objects",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 19,
    question: "What is an interface in programming?",
    options: ["A contract that defines a set of methods a class must implement", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A contract that defines a set of methods a class must implement",
    topic: "programmer",
    difficulty: "bronze"
  },
  {
    id: 20,
    question: "What is a package in programming?",
    options: ["A namespace that organizes related classes", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A namespace that organizes related classes",
    topic: "programmer",
    difficulty: "bronze"
  },

  // SILVER LEVEL QUESTIONS (Advanced Programming Concepts)
  {
    id: 21,
    question: "What is a design pattern in programming?",
    options: ["A reusable solution to common problems in software design", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A reusable solution to common problems in software design",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 22,
    question: "What is dependency injection?",
    options: ["A technique where an object receives its dependencies from outside", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A technique where an object receives its dependencies from outside",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 23,
    question: "What is a microservice architecture?",
    options: ["An architectural style that structures an application as a collection of small services", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "An architectural style that structures an application as a collection of small services",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 24,
    question: "What is continuous integration?",
    options: ["A practice of merging all developers' working copies to a shared mainline", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A practice of merging all developers' working copies to a shared mainline",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 25,
    question: "What is test-driven development?",
    options: ["A software development process that relies on the repetition of a very short development cycle", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A software development process that relies on the repetition of a very short development cycle",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 26,
    question: "What is a REST API?",
    options: ["An architectural style for distributed hypermedia systems", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "An architectural style for distributed hypermedia systems",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 27,
    question: "What is a database transaction?",
    options: ["A sequence of operations performed as a single logical unit of work", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A sequence of operations performed as a single logical unit of work",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 28,
    question: "What is a cache in programming?",
    options: ["A hardware or software component that stores data for future requests", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A hardware or software component that stores data for future requests",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 29,
    question: "What is a load balancer?",
    options: ["A device that distributes network or application traffic across servers", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A device that distributes network or application traffic across servers",
    topic: "programmer",
    difficulty: "silver"
  },
  {
    id: 30,
    question: "What is a message queue?",
    options: ["A form of asynchronous service-to-service communication", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A form of asynchronous service-to-service communication",
    topic: "programmer",
    difficulty: "silver"
  },

  // GOLD LEVEL QUESTIONS (Expert Programming Concepts)
  {
    id: 31,
    question: "What is a distributed system?",
    options: ["A system whose components are located on different networked computers", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A system whose components are located on different networked computers",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 32,
    question: "What is a consensus algorithm?",
    options: ["A process used to achieve agreement on a single data value among distributed systems", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A process used to achieve agreement on a single data value among distributed systems",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 33,
    question: "What is a quantum algorithm?",
    options: ["An algorithm that runs on a quantum computer", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "An algorithm that runs on a quantum computer",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 34,
    question: "What is a neural network?",
    options: ["A series of algorithms that attempt to recognize underlying relationships in a set of data", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A series of algorithms that attempt to recognize underlying relationships in a set of data",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 35,
    question: "What is a blockchain?",
    options: ["A distributed ledger that records transactions across many computers", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A distributed ledger that records transactions across many computers",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 36,
    question: "What is a microkernel?",
    options: ["The near-minimum amount of software that can provide the mechanisms needed to implement an operating system", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "The near-minimum amount of software that can provide the mechanisms needed to implement an operating system",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 37,
    question: "What is a virtual machine?",
    options: ["An emulation of a computer system that provides the functionality of a physical computer", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "An emulation of a computer system that provides the functionality of a physical computer",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 38,
    question: "What is a compiler?",
    options: ["A program that translates code from one programming language to another", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A program that translates code from one programming language to another",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 39,
    question: "What is a garbage collector?",
    options: ["A program that automatically reclaims memory that is no longer in use", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A program that automatically reclaims memory that is no longer in use",
    topic: "programmer",
    difficulty: "gold"
  },
  {
    id: 40,
    question: "What is a deadlock?",
    options: ["A situation where two or more processes are unable to proceed because each is waiting for the other", "A type of function", "A programming language", "A computer part"],
    correctAnswer: "A situation where two or more processes are unable to proceed because each is waiting for the other",
    topic: "programmer",
    difficulty: "gold"
  }
];

// Update the Quiz interface in QuizContext.ts to include the difficulty level
