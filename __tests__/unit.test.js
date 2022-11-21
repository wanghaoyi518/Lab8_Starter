// unit.test.js
const functions = require('../code-to-unit-test/unit-test-me.js');
//import functions from '../code-to-unit-test/unit-test-me.js';

// TODO - Part 2
test('Phone number is', () => {
    const data = functions.isPhoneNumber("111-222-3333");
    expect(data).toBe(true);
});

test('Email is', () => {
    expect(functions.isEmail("abc@ucsd.edu")).toBe(true);
});

test('Strong Password is', () => {
    expect(functions.isStrongPassword(123)).toBe(false);
});

test('Date is', () => {
    expect(functions.isDate(1/1/2001)).toBe(false);
});