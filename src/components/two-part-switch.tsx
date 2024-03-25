import { Component } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface Props {
  left: string;
  right: string;
  id: string;
  disabled?: boolean;
  checked?: boolean;
  flip?: () => any;
}
interface State {
  on: boolean;
}

export default class Switch2Part extends Component<Props, State> {
  state: State = {
    on: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      on: !prevState.on,
    }));
    if(this.props.flip !== undefined){
      this.props.flip();
    }
  };

  render() {
    const { left, right, id, disabled, checked } = this.props;
    return (
      <div className="flex items-center space-x-2">
        <Label>{left}</Label>
        <Switch
          key={id}
          id={id}
          onCheckedChange={this.toggle}
          checked={checked}
          disabled={disabled}
        />
        <Label>{right}</Label>
      </div>
    );
  }
}
