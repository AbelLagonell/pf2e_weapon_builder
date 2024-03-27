export enum dice {
  smallest = "1d4",
  smaller = "1d6",
  medium = "1d8",
  bigger = "1d10",
  biggest = "1d12",
}

export function increment(diceState: dice) {
  switch (diceState) {
    case dice.smallest:
      return dice.smaller;
    case dice.smaller:
      return dice.medium;
    case dice.medium:
      return dice.bigger;
    case dice.bigger:
      return dice.biggest;
    case dice.biggest:
    default:
      return dice.biggest;
  }
}

export function decrement(diceState: dice) {
  switch (diceState) {
    case dice.biggest:
      return dice.bigger;
    case dice.bigger:
      return dice.medium;
    case dice.medium:
      return dice.smaller;
    case dice.smaller:
      return dice.smallest;
    case dice.smallest:
    default:
      return dice.smallest;
  }
}
