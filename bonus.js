function createCounter(init) {
  let current = init;
  return {
    increment() {
      current += 1;
      return current;
    },
    decrement() {
      current -= 1;
      return current;
    },
    reset() {
      current = init;
      return current;
    },
  };
}
const counter = createCounter(5);
