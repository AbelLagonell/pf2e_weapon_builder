import { KeyedOption } from "./types";

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
  { key: 17, str: "Two Handed" },
  { key: 18, str: "Versatile" },
];

let greater: KeyedOption[] = [
  { key: 19, str: "Agile" },
  { key: 20, str: "Deadly" },
  { key: 21, str: "Jousting" },
  { key: 22, str: "Parry" },
  { key: 23, str: "Range" },
  { key: 24, str: "Trip" },
];

let major: KeyedOption[] = [
  { key: 25, str: "Attached" },
  { key: 26, str: "Fatal" },
  { key: 27, str: "Reach" },
  { key: 28, str: "Unarmed" },
];

export { flaws, minor, greater, major };
