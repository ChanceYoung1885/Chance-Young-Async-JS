// Introducing Workers

// Core Concepts of Workers
// - Workers allow tasks to run in a different thread, separate from the main execution thread of a web application.
// - This parallel execution helps in keeping the main window responsive even when executing long-running tasks.
// - Workers operate in an isolated thread and do not have direct access to the DOM or the main thread's variables.

// Types of Workers
// 1. Dedicated Workers: Used by a single script instance.
// 2. Shared Workers: Can be utilized by multiple scripts across different windows.
// 3. Service Workers: Act as proxy servers, enabling offline capabilities and resource caching for Progressive Web Apps.

// Implementing a Worker: A Prime Number Generator Example
// - The example involves a web page that calculates prime numbers using a worker, maintaining responsiveness during the calculation.

// Synchronous Prime Generator: A Review
// - The initial setup includes a function generatePrimes() which calculates prime numbers synchronously, causing unresponsiveness.
// - Example synchronous code:

function generatePrimes(quota) {
    // ... prime number generation logic ...
  }
  document.querySelector("#generate").addEventListener("click", () => {
    const primes = generatePrimes(document.querySelector("#quota").value);
    // ... update DOM ...
  });
  
// Implementing Prime Generation with a Worker
// - The worker code is separated from the main script and placed in "generate.js".
// - The main script communicates with the worker through messages.
// - Worker creation and message handling in "main.js":

const worker = new Worker("./generate.js");
document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({ command: "generate", quota });
});
worker.addEventListener("message", (message) => {
  document.querySelector("#output").textContent =
    `Finished generating ${message.data} primes!`;
});

// - The worker script "generate.js" listens for messages and executes the prime generation task:

addEventListener("message", (message) => {
    if (message.data.command === "generate") {
      generatePrimes(message.data.quota);
    }
  });
  function generatePrimes(quota) {
    // ... prime number generation logic ...
    postMessage(primes.length);
  }
  

// Conclusion
// - Web workers enable offloading tasks to a separate thread, thereby keeping the main application thread responsive.
// - They communicate with the main script via message passing, avoiding direct access to shared data and the DOM.
// - Workers, especially service workers, are instrumental in developing advanced web applications, including Progressive Web Apps.
// - To run examples using workers, a local web server is needed due to browser security restrictions on file:// URLs.
