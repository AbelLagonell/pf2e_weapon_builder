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
import ToggleDamage, { DmgState } from "./toggle-damage";
import { flaws, greater, major, minor } from "./tables";
import { Component } from "react";
import { Textarea } from "./ui/textarea";
import { KeyedOption } from "./types";
import Dice_Tracker from "./damage-dice";

interface Props {
  getState: (state: WeaponState) => any;
}
interface WeaponState {
  weaponName: string;
  weaponDesc: string;
  activeTraits: KeyedOption[];
  damageType: string[];
  multiType: boolean;
  nonlethal: boolean;
}

export type { WeaponState };

export default class Weapon_Form extends Component<Props, WeaponState> {
  state: WeaponState = {
    weaponName: "",
    weaponDesc: "",
    activeTraits: [],
    damageType: [],
    multiType: false,
    nonlethal: false,
  };

  points = 1;
  disabled = [false, true, true];

  onTriggerUpdate() {
    this.props.getState(this.state);
  }

  pointManagement(trait: KeyedOption, multiply: number = 1) {
    switch (trait.key) {
      //FLAWS
      case 0:
      case 2:
      case 4:
        this.points += 3 * multiply;
        break;
      case 3:
        this.points *= 1 * multiply;
        break;
      case 1:
        this.points += 6 * multiply;
        break;
      case 5:
        this.points += 5 * multiply;
        break;
      //MINOR
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        this.points -= 1 * multiply;
        break;
      //GREATER
      case 23:
        if (this.state.activeTraits.find((value) => value.key === 23))
          this.points -= 3 * multiply;
      case 19:
      case 20:
      case 21:
      case 22:
      case 24:
        this.points -= 2 * multiply;
        break;
      //MAJOR
      case 25:
      case 26:
      case 27:
      case 28:
      default:
        this.points -= 3 * multiply;
        break;
    }

    if (this.points === 0) {
      this.disabled = [true, true, true];
    } else if (this.points === 1) {
      this.disabled = [false, true, true];
    } else if (this.points === 2) {
      this.disabled = [false, false, true];
    } else {
      this.disabled = [false, false, false];
    }
  }

  updateDamage = (state: DmgState) => {
    let dmgTypes = [];
    if (state.dmgType[0]) {
      dmgTypes.push("Piercing");
    }
    if (state.dmgType[1]) {
      dmgTypes.push("Bludgeoning");
    }
    if (state.dmgType[2]) {
      dmgTypes.push("Slashing");
    }
    this.setState(
      {
        damageType: dmgTypes,
        multiType: state.multiType,
        nonlethal: state.nonlethal,
      },
      () => {
        this.onTriggerUpdate();
      },
    );
  };

  updateName = (event: any) => {
    const newWeaponName = event.target.value;
    this.setState({ weaponName: newWeaponName }, () => {
      this.onTriggerUpdate();
    });
  };

  updateDesc = (event: any) => {
    const newWeaponDesc = event.target.value;
    this.setState({ weaponDesc: newWeaponDesc }, () => {
      this.onTriggerUpdate();
    });
  };

  addTraits = (trait: KeyedOption) => {
    this.setState(
      (prevState) => ({
        activeTraits: [...prevState.activeTraits, trait],
      }),
      () => {
        this.onTriggerUpdate();
        this.pointManagement(trait);
        console.log(this.state.activeTraits);
      },
    );
  };

  removeTraits = (trait: KeyedOption) => {
    this.setState(
      (prevState) => ({
        activeTraits: prevState.activeTraits.filter(
          (opt) => opt.key !== trait.key,
        ),
      }),
      () => {
        this.onTriggerUpdate();
        this.pointManagement(trait, -1);
        console.log(this.state.activeTraits);
      },
    );
  };

  onDiceChange = (which: boolean) => {
    let maxval = this.state.activeTraits;
    this.pointManagement({ key: 29, str: "" }, which ? 1 : -1);
    this.addTraits({ key: 29, str: "" });
  };

  render() {
    return (
      <>
        <Card>
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
                  <Input
                    id="name"
                    placeholder="Shortsword"
                    onChange={this.updateName}
                  />
                </div>
                <Dropdown
                  options={flaws}
                  name="Flaws"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                />
                <ToggleDamage getState={this.updateDamage} />
                <Dropdown
                  disabled={this.disabled[0]}
                  options={minor}
                  name="Minor"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                  check={
                    this.state.activeTraits.find((value) => value.key === 1)
                      ? this.state.activeTraits.find((value) => value.key === 1)
                      : undefined
                  }
                />
                <Dropdown
                  disabled={this.disabled[1]}
                  options={greater}
                  name="Greater"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                />
                <Dropdown
                  disabled={this.disabled[2]}
                  options={major}
                  name="Major"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                />
                <Dice_Tracker
                  disabled={this.disabled[2]}
                  activeTraits={this.state.activeTraits}
                  changed={this.onDiceChange}
                />
                <Textarea
                  placeholder="Insert description here..."
                  onChange={this.updateDesc}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}
