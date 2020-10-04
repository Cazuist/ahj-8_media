import { isValid } from '../../src/js/functions';

describe('Testing of isValid function', () => {
  test.each([
    ['false for emty input', '', false],
    ['false for many semicolons', '123, 456,78', false],
    ['false for symbols in input ', '12a3 , 1abc', false],
    ['false for one bracket in start', '[123.123, 456.456', false],
    ['false for one bracket in end', '123.123, 456.456]', false],



    ['true for input without brackets', '13.123, 456.456', true],
    ['true for input with brackets', '[123.123, 456.456]', true],
    ['true for input without space&brackets', '13.123,456.456', true],
    ['true for input without space with bracket', '[13.123,456.456]', true],

  ])(('should be %s'), (_, input, expected) => {
    const received = isValid(input);
    expect(received).toBe(expected);
  });    
});
