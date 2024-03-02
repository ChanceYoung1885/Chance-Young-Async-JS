// How to implement a promise-based API Practice
// - Code examples from mdn web docs

// The basic idea of implementing a promise-based API is to wrap an asynchronous operation (which could involve events, 
// callbacks, or message-passing) in a Promise object, managing its success or failure correctly.

// Example: Implementing an alarm() API
// - Purpose: Create a promise-based alarm function.
// - Functionality: The alarm() function takes a person's name and a delay in milliseconds. After the delay, it sends a "Wake up!" message.

// Using setTimeout() to Implement alarm()
// - setTimeout() is used for the delay mechanism in alarm().
// - Example code snippet:

// Declare variables

function setAlarm() {
  setTimeout(() => {
    output.textContent = "Wake up!";
  }, 1000);
}

button.addEventListener("click", setAlarm);

// The Promise() Constructor
// - The alarm() function returns a Promise that is fulfilled after the timer expires.
// - The Promise constructor takes a function, called the executor, which in turn takes two functions as arguments: resolve and reject.
// - alarm() implementation example:

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
      if (delay < 0) {
        throw new Error("Alarm delay must not be negative");
      }
      setTimeout(() => {
        resolve(`Wake up, ${person}!`);
      }, delay);
    });
  }

  // - Here, the function checks if the delay is negative, throws an error if so, and uses setTimeout() to resolve the promise after the delay.

// Using the alarm() API
// - The alarm() function is used similarly to other promise-based APIs.
// - You can attach then() and catch() methods to handle fulfillment and rejection.
// - Example:

// Declare variables

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener("click", () => {
  alarm(name.value, delay.value)
    .then((message) => (output.textContent = message))
    .catch((error) => (output.textContent = `Couldn't set alarm: ${error}`));
});

// Using async and await with alarm()
// - The alarm() function, being promise-based, can be used with async/await for more intuitive asynchronous code.
// - Example with async/await:

// Declare variables

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener("click", async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  } catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});


// Key Points
// - Implementing a promise-based API typically involves wrapping existing asynchronous operations with a Promise object.
// - The Promise constructor is central to this process, requiring careful handling of the resolve and reject functions.
// - Such APIs can be used with then(), catch(), and async/await constructs, similar to other promise-based operations.
