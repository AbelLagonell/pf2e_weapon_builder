import { Component } from "react";
import { Trait } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dropdown from "./dropdown";
import { availableTraits } from "./tables";
import ToggleDamage, { DmgState } from "./toggle-damage";
import Dice_Editor from "./dice-editor";
import Weapon_Content from "./weapon-content";

interface WeaponMakerState {
  weaponName: string;
  weaponDesc: string;
  activeTraits: Trait[];
  damageState: DmgState;
  editFlaws?: boolean;
}

interface WeaponMakerProps {}

class Weapon_Maker extends Component<WeaponMakerProps, WeaponMakerState> {
  state: WeaponMakerState = {
    weaponName: "",
    weaponDesc: "",
    activeTraits: [],
    damageState: {
      dmgType: [],
      multiType: false,
      nonlethal: false,
    },
    editFlaws: true,
  };

  onStateUpdate() {}

  points = 4;

  pointManagementSystem = (trait: Trait) => {
    //Did not find the trait
    if (!this.state.activeTraits.find((value) => value.id === trait.id)) {
      this.points += trait.points;
      if (
        this.state.activeTraits.find((value) => value.id === "f2H") &&
        trait.id == "gR"
      ) {
        this.points -= 3;
      }
      this.setState(
        (prevState) => ({ activeTraits: [...prevState.activeTraits, trait] }),
        () => {
          console.log(this.state.activeTraits.length);
          this.flawUpdate();
        },
      );
    }
    //Found the trait
    else {
      this.points -= trait.points;
      if (
        this.state.activeTraits.find((value) => value.id === "f2H") &&
        trait.id == "gR"
      ) {
        this.points += 3;
      }
      this.setState(
        (prevState) => ({
          activeTraits: prevState.activeTraits.filter(
            (opt) => opt.id !== trait.id,
          ),
        }),
        () => {
          console.log(this.state.activeTraits.length);
          this.flawUpdate();
        },
      );
    }
  };

  flawUpdate() {
    console.log(this.state.activeTraits.length);
    if (
      this.state.activeTraits.find((value) => value.id[0] === "m") ||
      this.state.activeTraits.find((value) => value.id[0] === "g") ||
      this.state.activeTraits.find((value) => value.id[0] === "M")
    ) {
      this.setState({ editFlaws: false });
    } else {
      this.setState({ editFlaws: true });
    }
  }

  updateName = (event) => {
    const newWeaponName = event.target.value;
    this.setState({ weaponName: newWeaponName }, () => {
      this.onStateUpdate();
    });
  };

  updateDesc = (event) => {
    const newWeaponDesc = event.target.value;
    this.setState({ weaponDesc: newWeaponDesc }, () => {
      this.onStateUpdate();
    });
  };

  updateDamage = (dmgState: DmgState) => {
    this.setState({
      damageState: dmgState,
    });
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
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of Weapon</Label>
                <Input
                  id="name"
                  placeholder="Shortsword"
                  onChange={this.updateName}
                />
                <Textarea
                  placeholder="Insert description here..."
                  onChange={this.updateDesc}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Dropdown
                  disabled={!this.state.editFlaws}
                  disabledButtons={!this.state.editFlaws}
                  name="Flaws"
                  options={availableTraits.filter(
                    (value) => value.id[0] === "f",
                  )}
                  updateTrait={this.pointManagementSystem}
                />
                <ToggleDamage getState={this.updateDamage} />
                <Dropdown
                  disabled={this.points < 1}
                  name="Minor"
                  options={availableTraits.filter(
                    (value) => value.id[0] === "m",
                  )}
                  updateTrait={this.pointManagementSystem}
                />
                <Dropdown
                  disabled={this.points < 2}
                  name="Greater"
                  options={availableTraits.filter(
                    (value) => value.id[0] === "g",
                  )}
                  updateTrait={this.pointManagementSystem}
                />
                <Dropdown
                  disabled={this.points < 3}
                  name="Major"
                  options={availableTraits.filter(
                    (value) => value.id[0] === "M",
                  )}
                  updateTrait={this.pointManagementSystem}
                />
              </div>
              <Dice_Editor
                options={availableTraits.filter((value) => value.id[0] === "d")}
                validUp={this.points < 3}
                updateTrait={this.pointManagementSystem}
              />
            </div>
          </CardContent>
        </Card>
        <Weapon_Content
          title={this.state.weaponName}
          desc={this.state.weaponDesc}
          damage={["Piercing", "Bludgeoning", "Slashing"].filter(
            (_, index) => this.state.damageState.dmgType[index],
          )}
          modular={this.state.damageState.multiType ? "Concussive" : "Modular"}
          lethality={this.state.damageState.nonlethal}
          traits={this.state.activeTraits}
        />
      </>
    );
  }
}

export default Weapon_Maker;
