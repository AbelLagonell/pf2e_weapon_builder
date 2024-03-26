import { Component } from "react";
import Weapon_form, { WeaponState } from "./weapon-form";
import Weapon_Content from "./weapon-content";

interface Props {}

//TODO Add dice, Make sure you cant add more than two Two-handed

export default class Custom_Weapons extends Component<Props, WeaponState> {
  state: WeaponState = {
    weaponName: "",
    weaponDesc: "",
    activeTraits: [],
    damageType: [],
    multiType: false,
    nonlethal: false,
  };

  onStateUpdate = (state: WeaponState) => {
    this.setState({
      weaponName: state.weaponName,
      weaponDesc: state.weaponDesc,
      activeTraits: state.activeTraits,
      damageType: state.damageType,
      multiType: state.multiType,
      nonlethal: state.nonlethal,
    });
  };

  render() {
    return (
      <div className="flex flex-col w-2/3 space-y-8">
        <Weapon_form getState={this.onStateUpdate} />
        <Weapon_Content
          damage={this.state.damageType}
          lethality={this.state.nonlethal}
          modular={this.state.multiType ? "Concussive " : "Modular "}
          title={this.state.weaponName}
          desc={this.state.weaponDesc}
          traits={this.state.activeTraits}
        />
      </div>
    );
  }
}
