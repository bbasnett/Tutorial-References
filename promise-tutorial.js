function fooPromise(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
const one = fooPromise("one");
const two = fooPromise("two");
const three = fooPromise("three");

// Sequencing your output using promise chains

// Using promise objects
one
  .then(result => {
    console.log(result);
    return two;
  })
  .then(result => {
    console.log(result);
    return three;
  })
  .then(result => {
    console.log(result);
  });

// calling promise functions
fooPromise("one")
  .then(result => {
    console.log(result);
    return fooPromise("two");
  })
  .then(result => {
    console.log(result);
    return fooPromise("three");
  })
  .then(result => {
    console.log(result);
  });

// Nesting then functions
one.then(data => {
  console.log(data);
  two.then(result => {
    console.log(result);
    three.then(result => {
      console.log(result);
    });
  });
});

// Using Promise All
function printUsingPromiseAll() {
  const one = fooPromise("one");
  const two = fooPromise("two");
  const three = fooPromise("three");

  Promise.all([one, two, three]).then(data => {
    console.log(data);
  });
}

// Using async await
async function printAll() {
  const one = await fooPromise("one");
  const two = await fooPromise("two");
  const three = await fooPromise("Three");
  console.log(one);
  console.log(two);
  console.log(three);
}

// Using async await with promise All
async function printUsingPromiseAll() {
  const one = fooPromise("one");
  const two = fooPromise("two");
  const three = fooPromise("three");

  const finalvalue = await Promise.all([one, two, three]);
  return finalvalue;
}

printUsingPromiseAll().then(result => {
  console.log(result);
});
