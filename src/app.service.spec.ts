import { divide } from './app.service';

describe('divide', () => {
  it('should divide two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(0, 5)).toBe(0);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    expect(() => divide(-5, 0)).toThrow('Division by zero is not allowed');
  });
});
