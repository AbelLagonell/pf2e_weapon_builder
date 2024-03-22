import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import Dropdown from "./dropdown";
import { KeyedOption } from "./types";
import ToggleDamage from "./toggle-damage";

let flaws : KeyedOption[] = [
  {key: 0, str: "Loading"},
  {key: 1, str: "Two Handed"},
  {key: 2, str: "Volley"},
  {key: 3, str: "Expensive"},
  {key: 4, str: "Increased Training"},
]

let minor: KeyedOption[] =[
  {key: 0 , str: "Backstabber"}
]

export default function Weapon_form(){
  return (
    <>
      <Card className='w-2/3'>
        <CardHeader>
          <CardTitle>Weapon Maker</CardTitle>
          <CardDescription>
            <a href='https://docs.google.com/document/d/1j0uUtVcTgvn2a0oMYFKMwe_-tAPOdnFY21_0FOiX2DI/edit?pli=1#heading=h.q84jc6jvfir0'>
              Pronate's Guide to Custom Weapons
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name of Weapon</Label>
                <Input id='name' placeholder='Shortsword'/>
              </div>
              <Dropdown options={flaws} name="Flaws"/>
              <ToggleDamage></ToggleDamage>
              <Dropdown options={minor} name="Minor"/>
            </div>
          </form>
        </CardContent>
      </Card>     
    </>
  )
}
