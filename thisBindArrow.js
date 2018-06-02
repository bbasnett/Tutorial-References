// bind() is typically used when we loose the object binding to a function (when the function is executed).
// This typically happends in 2 scenarios
// 1. when assigning a function reference (object method reference) to another variable
// 2. when there are nested functions and 'this' reference is lost

// 1. Example: when assigning a object method reference to another variable

let Button = function(content) {
  this.content = content;
};

// assign a click method to the prototype of Button
Button.prototype.click = function() {
  console.log(`${this.content} clicked`);
};

let newButton = new Button("Bikash");
console.log(newButton.click()); // Bikash clicked

let looseButton = newButton.click;
console.log(looseButton); // Undefined clicked because the reference is lost

let boundButton = newButton.click.bind(newButton);
console.log(boundButton()); // Bikash clicked

// 2. Example: when there are nested functions and 'this' reference is lost

let myObj = {
  // a mock method on this object which simulates asynchronous call to get some value
  // whenever it gets the data back, it makes use of the passed callback function
  asyncGet(callback) {
    callback();
  },
  // whichever data this parse method gets, it will parse.This will later be passed to asyncGet method
  parse() {
    console.log(`Parse Called`);
  },
  // this render method will call asyncGet() which inturn call Parse()
  render() {
    console.log(`OUTER`);
    console.log(this); // myObj
    this.asyncGet(function() {
      console.log(`INNER`);
      console.log(this); // OOps !! Window object
      this.parse();
    });
  }
};

myObj.render(); // Uncaught TypeError: this.parse is not a function

// In order to fix the above issue we use the old school technique let that = this

let myObj = {
  // a mock method on this object which simulates asynchronous call to get some value
  // whenever it gets the data back, it makes use of the passed callback function
  asyncGet(callback) {
    callback();
  },
  // whichever data this parse method gets, it will parse.This will later be passed to asyncGet method
  parse() {
    console.log(`Parse Called`);
  },
  // this render method will call asyncGet() which inturn call Parse()
  render() {
    console.log(`OUTER`);
    console.log(this); // myObj
    let that = this; // make a copy of myObj and assign it to 'that' variable
    this.asyncGet(function() {
      console.log(`INNER`);
      console.log(that); // myObj
      that.parse();
    });
  }
};

myObj.render(); // Parse Called.

// The above mentioned technique of assigning let that = this is not said to be efficient.This is where
// arrow functions come in. Since arrow functions inherit the value of 'this' from its parent, 'this' would
// still point it to the original myObj which is the parent and not the window object.

let myObj = {
  // a mock method on this object which simulates asynchronous call to get some value
  // whenever it gets the data back, it makes use of the passed callback function
  asyncGet(callback) {
    callback();
  },
  // whichever data this parse method gets, it will parse.This will later be passed to asyncGet method
  parse() {
    console.log(`Parse Called`);
  },
  // this render method will call asyncGet() which inturn call Parse()
  render() {
    console.log(`OUTER`);
    console.log(this); // myObj
    this.asyncGet(() => {
      // Use an arrow function instead. No need of let that = this assignment
      console.log(`INNER`);
      console.log(this); // myObj
      this.parse();
    });
  }
};

myObj.render();
