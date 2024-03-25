import { Component } from "react";
import Weapon_form from "./weapon-form";
import Weapon_Content from "./weapon-content";
import { KeyedOption } from "./types";

interface Props {}
interface State {
  weaponName: string;
  weaponDesc: string;
  activeTraits: KeyedOption[];
}

export default class Custom_Weapons extends Component<Props, State> {
  state: State = {
    weaponName: "",
    weaponDesc: "",
    activeTraits: [],
  };

  onStateUpdate = (state: State) => {
    this.setState({
      weaponName: state.weaponName,
      weaponDesc: state.weaponDesc,
      activeTraits: state.activeTraits,
    });
  };

  render() {
    return (
      <div className="flex flex-col w-2/3 space-y-8">
        <Weapon_form getState={this.onStateUpdate} />
        <Weapon_Content
          title={this.state.weaponName}
          desc={this.state.weaponDesc}
          traits={[]}
        />
      </div>
    );
  }
}
