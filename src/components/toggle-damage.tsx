import { Component } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface Props {}
interface State {
  dmgType: boolean[]; // P, B, S
  multiType: boolean; // Concussive/Modular
}

export default class ToggleDamage extends Component<Props, State> {
  state: State = {
    dmgType: [false, false, false],
    multiType: false,
  };

  damageTypes = ["Piercing", "Bludgeoning", "Slashing"];

  updateActive = (values: string[]) => {
    const currentlyActive = this.damageTypes.map((type) => values.includes(type.charAt(0)));
    this.setState({ dmgType: currentlyActive });
  };

  toggleMultiType = () => {
    this.setState((prevState) => ({
      multiType: !prevState.multiType,
    }));
  };

  checkTypes() {
    const { dmgType, multiType } = this.state;
    let opt = [];

    if ((dmgType[2] && (dmgType[0] || dmgType[1])) || (dmgType[0] && dmgType[1])) {
      opt.push(
        <div className="flex items-center space-x-2" key="modular">
          <Label htmlFor="mod-con-toggle">Concussive</Label>
          <Switch
            id="mod-con-toggle"
            onCheckedChange={this.toggleMultiType}
            checked={multiType || dmgType[2]}
            disabled={dmgType[2]}
          />
          <Label htmlFor="mod-con-toggle">Modular</Label>
        </div>
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
        <div className="flex flex-row justify-between">
          <ToggleGroup id="dmgType" type="multiple" onValueChange={this.updateActive}>
            {this.showOptions()}
          </ToggleGroup>
          {this.checkTypes()}
        </div>
      </div>
    );
  }
}
