// Asynchronous JavaScript Practice

// Asynchronous programming enables your program to run a single possibly time-consuming task while
// the rest of the code is still able to run, rather than waiting until it's finished. Once the task 
// is finished it will produce the result as usual.


// Simple programming like the following will run quickly and don't really need to be asynchronous

const name1 = "Miriam";
const greeting1 = `Hello, my name is ${name1}!`;
console.log(greeting1);
// "Hello, my name is Miriam!"


function makeGreeting(name) {
    return `Hello, my name is ${name}!`;
  }
  
  const name2 = "Miriam";
  const greeting2 = makeGreeting(name2);
  console.log(greeting2);
  // "Hello, my name is Miriam!"


// The problem arises when the task that you need to run is going to take a lot of time. For instance,
// consider a program where your friend is baking cookies and you want some, but have other things to do.
// You can either stick around in the kitchen waiting for the cookies to finish (synchronous) or you can
// have your friend let you know when the cookies are done baking while you do other things (asynchronous).

// Synchronous
function youWantCookiesSynchronous() {
    console.log("Waiting for cookies...");
  
    // You (the program) wait in the kitchen until the cookies are ready
    bakeCookiesSynchronous();
  
    console.log("Doing other things after getting cookies...");
  }
  
  function bakeCookiesSynchronous() {
    console.log("Baking cookies...");
    timeLoop();
    console.log("Cookies are done!")
  
// A time loop for baking the cookies
    function timeLoop() {
        for (let i = 0; i < 12; i++) {
          // Your code for each 'minute' goes here
          console.log(` ${i + 1} minutes has passed.`);
      
          // Introduce a delay (in this case, using a busy wait)
          const startTime = new Date().getTime();
          while (new Date().getTime() - startTime < 5000) {
            // Busy wait for 5000 milliseconds (5 seconds)
          }
        }
      }
  };
  
  // You start the process by saying you want cookies with this code
  // youWantCookiesSynchronous();

// Going about it like this requires you to sit around and wait for the bakeCookies function to finish running
// before you could do anything else.
// This can be remedied with the addition of Callbacks! Callbacks are our first real intro into Asynchronous JS and are very
// similar to the event listeners that we previously went over. This is because event listeners are technically Asynchronous JS
// Let's give ourselves (the program) the ability to do other things while our friend (a single function) bakes the cookies.

// Asynchronous using Callbacks
function youWantCookiesAsynchronous() {
    console.log("Waiting for cookies...");
  
    // Your friend (the function) is baking cookies separately/asynchronously
    bakeCookiesAsynchronous(() => {
      console.log("Doing other things after getting cookies...");
    });
  
    console.log("Doing other things while waiting for cookies...");
  }
  
  function bakeCookiesAsynchronous(callback) {
    console.log("Baking cookies asynchronously...");
  
    // Simulating the time it takes to bake cookies asynchronously
    setTimeout(() => {
      console.log("Cookies are baked!");
      // Your friend (the function) calls the callback (notifies you)
      callback();
    }, 60000);
  }
  
  // You start the process by saying you want cookies with this code
//   youWantCookiesAsynchronous();
  
// Too many nested callbacks can become much harder to read and debug, resulting in a well known problem
// known as "callback hell" or the "pyramid of doom". This is why most modern asynchronous APIs use the 'Promise'.

