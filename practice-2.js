// How to use promises Practice

// Promises are the objects returned by an asynchronous function, representing the operations
// current state. When a promise is returned, it does not necessarily mean the operation is complete,
// but rather, like the name says, is a 'promise' to handle the eventual success/failure of the operation.

// There are 3 states for the Promise Object
//     - pending (initial state, neither fulfilled or rejected)
//     - fulfilled(operation succeeded)
//     - rejected (operation failed)

// Attached handlers are executed upon operation success or failure

// The following code is from mdn web docs with some comments from me


// Creating a promise by fetching a JSON file from github
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
// Logging the promise object (or rather that current state of the object, pending in this case)
console.log(fetchPromise);
  
// Once the fetchPromise operation has completed it will execute the following handlers
// returning the status, or I believe number of products in this case.
fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});
    
// Because the of the asynchronous callback function in the previous then() method this is logged immediately
// after the code begins to run and is logged before the response status
console.log("Started request…");
  

// Chaining promises


fetchPromise.then((response) => {
    // Similar to before but now we are calling response.json() 
    const jsonPromise = response.json();
    // Then passing a new then() handler into the returned promise.
    jsonPromise.then((data) => {
      console.log(data[0].name);
    });
  });

// All of that creates a problem just like the aforementioned "callback hell" so instead of all that
// nesting, we can use promise chaining like so 

fetchPromise
    // This way you remove the second then() and instead return the promise returned by json()
    .then((response) => response.json())
    // and then you can call the new second then() on the previous return value
    .then((data) => {
        // This will simply log the name property of one of the items in the data array
        console.log(data[0].name);
    });
  
// In the simplest terms, it waits for fetchPromise to run and 'then' takes the promise returned by it
// to run it through .json() and 'then' once that has occurred it will log the items name property.

// You'll also want to check if the server failed to handle the request and throw an error by using the ok
// property to check like the following code

  
fetchPromise
.then((response) => {
    // Checks how the server reacted, if failure run this
    if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
    }
    // Either way it returns the .json promise
    return response.json();
})
// Then just like before it logs the name property of an item in the array
.then((data) => {
    console.log(data[0].name);
});

// Apart from coding it in with the if statement, you can use the catch() method to handle an error
// in an asynchronous operation. The following code is meant not to work and will use the .catch() handling
    
const badFetchPromise = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    badFetchPromise
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    })
    // Should the operation fail, the catch() method will show the user in the console that they have an error,
    // as well as the error if applicable 
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
    

// Going over promise terminology again

// The 3 states of a Promise Object - from mdn web docs ("succeeded" and "failed" can and do mean different things for each API)

//     - pending - the promise has been created, and the asynchronous function it's associated with has not
// succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(),
// and the request is still being made
//     - fulfilled - the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called
//     - rejected - the asynchronous function has failed. When a promise is rejected, its catch() handler is called

// You can easily combine multiple promises using the Promise.all() method.
// It takes an array of promises and returns a single one, should you need all or a number of the asynchronous
// functions to run before doing something

const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });

// Or if you only need one of the promises to be fulfilled, and don't need it to be a specific promise you can
// use the Promise.any() method like so;

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((response) => {
    console.log(`${response.url}: ${response.status}`);
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`);
  });


// async and await

// Using the keyword async, in conjunction with the await keyword, allows you to write asynchronous functions
// in a way that looks like synchronous code. Consider the following

async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
fetchProducts();

// This way, when you use the await keyword instead of retuning a promise object, you get a response object.

// Important things to remember
    // async functions always return a promise.
        // This means that instead of something like this;

        async function badFetchProducts() {
            try {
            const response = await fetch(
                "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
            );
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            return data;
            } catch (error) {
            console.error(`Could not get products: ${error}`);
            }
        }
        
        const promise = badFetchProducts();
        console.log(promise[0].name);  // This won't work because promise is a promise object

        //You would need to change the last line to something like this;

        promise.then((data) => console.log(data[0].name)); // This takes the data from the promise object and logs an items name property
        
    // await can only be use inside an async function, unless your code is in a JavaScript module