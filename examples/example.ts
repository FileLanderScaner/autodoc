function add(a: number, b: number): number {
    return a + b;
}

const greet = (name: string): void => {
    console.log(`Hello, ${name}`);
};

interface IUser {
    name: string;
    age: number;
}

class User implements IUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getInfo(): string {
        return `${this.name} is ${this.age} years old.`;
    }
}
