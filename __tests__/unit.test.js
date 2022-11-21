// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2
test('Phone number is', () => {
    expect(isPhoneNumber(12345)).toBe(12345);
});

test('Email is', () => {
    expect(isEmail(qwert)).toBe("qwert");
});

test('Strong Password is', () => {
    expect(isStrongPassword(123)).toBe(0);
});

test('Date is', () => {
    expect(isDate(1.1)).toBe(0.0);
});