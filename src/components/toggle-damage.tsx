import { Component } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";
import Switch2Part from "./two-part-switch";
import { Checkbox } from "./ui/checkbox";

interface Props {}
interface State {
  dmgType: boolean[]; // P, B, S
  multiType: boolean; // Concussive/Modular
  nonlethal: boolean; // lethality
}

export default class ToggleDamage extends Component<Props, State> {
  state: State = {
    dmgType: [false, false, false],
    multiType: false,
    nonlethal: false,
  };

  damageTypes = ["Piercing", "Bludgeoning", "Slashing"];

  updateActive = (values: string[]) => {
    const currentlyActive = this.damageTypes.map((type) =>
      values.includes(type.charAt(0)),
    );
    this.setState({ dmgType: currentlyActive });
  };

  toggleMultiType = () => {
    this.setState((prevState) => ({
      multiType: !prevState.multiType,
    }));
    if (this.state.dmgType[2]){
      this.setState({multiType: false})
    }
  };

  toggleLethal = () => {
    this.setState((prevState) => ({
      nonlethal: !prevState.nonlethal,
    }));
  }

  checkTypes() {
    const { dmgType, multiType } = this.state;
    let opt = [];

    if (
      (dmgType[2] && (dmgType[0] || dmgType[1])) ||
      (dmgType[0] && dmgType[1])
    ) {
      opt.push(
        <Switch2Part key="test"
          left="Modular"
          right="Concussive"
          id="mod-con-toggle"
          checked={multiType}
          disabled={dmgType[2]}
          flip={this.toggleMultiType}
        />,
      );
    }

    return opt;
  }

  showOptions() {
    return this.damageTypes.map((type) => (
      <ToggleGroupItem value={type.charAt(0)} key={type.charAt(0)}>
        {type}
      </ToggleGroupItem>
    ));
  }

  render() {
    return (
      <div className="flex flex-col space-y-2">
        <Label htmlFor="dmgType">Damage Type</Label>
        <div className="flex flex-row space-x-2 pt-2">
          <Checkbox id="lethality" onCheckedChange={this.toggleLethal} />
          <Label htmlFor="lethality">Nonlethal</Label>
        </div>
        <div className="flex flex-row justify-between">
          <ToggleGroup
            key="damageType"
            id="dmgType"
            type="multiple"
            onValueChange={this.updateActive}
          >
            {this.showOptions()}
          </ToggleGroup>
          {this.checkTypes()}
        </div>
      </div>
    );
  }
}
