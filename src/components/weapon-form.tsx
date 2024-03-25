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
import ToggleDamage from "./toggle-damage";
import { flaws, greater, major, minor } from "./tables";
import { Component } from "react";
import { Textarea } from "./ui/textarea";
import { KeyedOption } from "./types";

interface Props {
  getState: (state: State) => any;
}
interface State {
  weaponName: string;
  weaponDesc: string;
  activeTraits: KeyedOption[];
}

export default class Weapon_Form extends Component<Props, State> {
  state: State = {
    weaponName: "",
    weaponDesc: "",
    activeTraits: [],
  };

  onTriggerUpdate() {
    this.props.getState(this.state);
  }

  updateName = (event: any) => {
    this.setState({
      weaponName: event.target.valu,
    });
    this.onTriggerUpdate();
  };

  updateDesc = (event: any) => {
    const newWeaponDesc = event.target.value;
    this.setState({ weaponDesc: newWeaponDesc }, () => {
      this.onTriggerUpdate();
    });
  };

  addTraits = (trait: KeyedOption) => {
    this.setState((prevState) => ({
      activeTraits: [...prevState.activeTraits, trait],
    }));
    this.onTriggerUpdate();
  };

  removeTraits = (trait: KeyedOption) => {
    this.setState((prevState) => ({
      activeTraits: prevState.activeTraits.filter(
        (opt) => opt.key !== trait.key,
      ),
    }));
    this.onTriggerUpdate();
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
                <ToggleDamage />
                <Dropdown
                  options={minor}
                  name="Minor"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                />
                <Dropdown
                  options={greater}
                  name="Greater"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
                />
                <Dropdown
                  options={major}
                  name="Major"
                  addTrait={this.addTraits}
                  removeTrait={this.removeTraits}
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
