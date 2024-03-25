import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Dropdown from "./dropdown";
import { KeyedOption } from "./types";
import ToggleDamage from "./toggle-damage";

let flaws: KeyedOption[] = [
  { key: 0, str: "Loading" },
  { key: 1, str: "Two Handed" },
  { key: 2, str: "Volley" },
  { key: 3, str: "Expensive" },
  { key: 4, str: "Increased Training" },
];

let minor: KeyedOption[] = [
  { key: 5, str: "Backstabber" },
  { key: 6, str: "Backswing" },
  { key: 7, str: "Disarm" },
  { key: 8, str: "Finesse" },
  { key: 9, str: "Forceful" },
  { key: 10, str: "Free Hand" },
  { key: 11, str: "Propulsive" },
  { key: 12, str: "Shove" },
  { key: 13, str: "Sweep" },
  { key: 14, str: "Thrown" },
  { key: 15, str: "Twin" },
  { key: 16, str: "Two Handed" },
  { key: 17, str: "Versatile" },
];

let greater: KeyedOption[] = [
  { key: 18, str: "Agile" },
  { key: 19, str: "Deadly" },
  { key: 20, str: "Jousting" },
  { key: 21, str: "Parry" },
  { key: 22, str: "Range" },
  { key: 23, str: "Trip" },
];

let major: KeyedOption[] = [
  { key: 23, str: "Attached" },
  { key: 24, str: "Fatal" },
  { key: 25, str: "Reach" },
  { key: 26, str: "Unarmed" },
];

export default function Weapon_form() {
  return (
    <>
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Weapon Maker</CardTitle>
          <CardDescription>
            <a href="https://docs.google.com/document/d/1j0uUtVcTgvn2a0oMYFKMwe_-tAPOdnFY21_0FOiX2DI/edit?pli=1#heading=h.q84jc6jvfir0">
              Pronate's Guide to Custom Weapons
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of Weapon</Label>
                <Input id="name" placeholder="Shortsword" />
              </div>
              <Dropdown options={flaws} name="Flaws" />
              <ToggleDamage></ToggleDamage>
              <Dropdown options={minor} name="Minor" />
              <Dropdown options={greater} name="Greater" />
              <Dropdown options={major} name="Major" />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
