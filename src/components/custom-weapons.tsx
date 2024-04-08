import { Component } from "react";
import Weapon_Maker from "./weapon-maker";

interface Props {}
interface State {}

//TODO Add dice, Make sure you cant add more than two Two-handed

export default class Custom_Weapons extends Component<Props, State> {
  render() {
    return (
      <div className="flex flex-col w-2/3 space-y-8">
        <Weapon_Maker />
      </div>
    );
  }
}
