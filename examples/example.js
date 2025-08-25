function classicFunction(a, b) {
    return a + b;
}

const arrowFunction = (name) => {
    console.log(`Hello, ${name}`);
};

class MyClass {
    constructor(value) {
        this.value = value;
    }

    myMethod(param) {
        return this.value + param;
    }
}
