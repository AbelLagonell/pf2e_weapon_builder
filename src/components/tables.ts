import { KeyedOption, Traits } from "./types";

let flaws: KeyedOption[] = [
  { key: 0, str: "Loading" },
  { key: 1, str: "Two Handed" },
  { key: 2, str: "Volley" },
  { key: 3, str: "Expensive" },
  { key: 4, str: "Martial" },
  { key: 5, str: "Advanced" },
];

let minor: KeyedOption[] = [
  { key: 6, str: "Backstabber" },
  { key: 7, str: "Backswing" },
  { key: 8, str: "Disarm" },
  { key: 9, str: "Finesse" },
  { key: 10, str: "Forceful" },
  { key: 11, str: "Free Hand" },
  { key: 12, str: "Propulsive" },
  { key: 13, str: "Shove" },
  { key: 14, str: "Sweep" },
  { key: 15, str: "Thrown" },
  { key: 16, str: "Twin" },
  { key: 18, str: "Versatile" },
];

let greater: KeyedOption[] = [
  { key: 19, str: "Agile" },
  { key: 20, str: "Deadly" },
  { key: 21, str: "Jousting d6" },
  { key: 22, str: "Parry" },
  { key: 23, str: "Range" },
  { key: 24, str: "Trip" },
  { key: 25, str: "Scatter" },
];

let major: KeyedOption[] = [
  { key: 29, str: "Attached" },
  { key: 26, str: "Fatal" },
  { key: 27, str: "Reach" },
  { key: 28, str: "Unarmed" },
];

let availableTraits: Traits[] = [
  //Flaws
  { id: "fL", trait: "Loading", points: 3, special: true },
  { id: "f2H", trait: "Two Handed", points: 6 },
  { id: "fV", trait: "Volley", points: 3, special: true },
  { id: "fE", trait: "Expensive", points: 1 },
  { id: "fM", trait: "Martial", points: 3 },
  { id: "fA", trait: "Advanced", points: 5 },
  //Minor
  { id: "mBb", trait: "Back Stabber", points: -1 },
  { id: "mBs", trait: "Back Swing", points: -1 },
  { id: "mD", trait: "Disarm", points: -1 },
  { id: "mFs", trait: "Finesse", points: -1 },
  { id: "mFf", trait: "Forceful", points: -1 },
  { id: "mFh", trait: "Free Hand", points: -1 },
  { id: "mP", trait: "Propulsive", points: -1 },
  { id: "mSh", trait: "Shove", points: -1 },
  { id: "mSw", trait: "Swing", points: -1 },
  { id: "mT", trait: "Thrown", points: -1, special: true },
  { id: "mV", trait: "Versatile", points: -1 },
  { id: "mR", trait: "Repeating", points: -1 },
  //Greater
  { id: "gA", trait: "Agile", points: -2 },
  { id: "gD", trait: "Deadly", points: -2, special: true },
  { id: "gJ", trait: "Jousting", points: -2, special: true },
  { id: "gP", trait: "Parry", points: -2 },
  { id: "gR", trait: "Range", points: -2, special: true },
  { id: "gT", trait: "Trip", points: -2 },
  //major
  { id: "MA", trait: "Attached", points: -3 },
  { id: "MF", trait: "Fatal", points: -3, special: true },
  { id: "MR", trait: "Reach", points: -3 },
  { id: "MU", trait: "Unarmed", points: -3 },
  //dice
  { id: "d4", trait: "1d4", points: -3 },
  { id: "d6", trait: "1d6", points: -3 },
  { id: "d8", trait: "1d8", points: -3 },
  { id: "d10", trait: "1d10", points: -3 },
  { id: "d12", trait: "1d12", points: -3 },
];

export { flaws, minor, greater, major, availableTraits };
