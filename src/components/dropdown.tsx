import { Component } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Trait } from "./types";
import { Label } from "./ui/label";

interface Props {
  options: Trait[];
  name: string;
  updateTrait: (trait: Trait) => any;
  disabled?: boolean;
  disabledButtons?: boolean;
}
interface State {
  active: Trait[];
  options: Trait[];
}

export default class Dropdown extends Component<Props, State> {
  state: State = {
    active: [],
    options: this.props.options,
  };

  addActive = (id: string) => {
    if (id === "") return;
    const optionToAdd = this.state.options.find((opt) => opt.id === id);
    if (optionToAdd) {
      this.setState((prevState) => ({
        active: [...prevState.active, optionToAdd],
        options: prevState.options.filter((opt) => opt.id !== id),
      }));
      this.props.updateTrait(optionToAdd);
    }
  };

  removeActive = (id: string) => {
    const optionToRemove = this.state.active.find((opt) => opt.id === id);
    if (optionToRemove) {
      this.setState((prevState) => ({
        active: prevState.active.filter((opt) => opt.id !== id),
        options: [...prevState.options, optionToRemove],
      }));
      this.props.updateTrait(optionToRemove);
    }
  };

  optionValues() {
    let opt = [];

    for (let option of this.state.options) {
      opt.push(
        <SelectItem value={option.id} key={option.id}>
          {option.trait}
        </SelectItem>,
      );
    }

    return <>{opt}</>;
  }

  currentOptions() {
    let opt = [];

    for (let option of this.state.active) {
      opt.push(
        <Button
          type="button"
          variant="outline"
          key={option.id}
          disabled={this.props.disabledButtons}
          onClick={() => this.removeActive(option.id)}
        >
          {option.trait}
        </Button>,
      );
    }

    return <>{opt}</>;
  }

  render() {
    const { name, disabled } = this.props;
    return (
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={name}>{name}</Label>
        <div className="flex flex-row">
          <Select disabled={disabled} onValueChange={this.addActive}>
            <SelectTrigger className="w-40 min-w-40 h-[42px]" id={name}>
              <SelectValue placeholder="Select">Select</SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="border-black border rounded bg-accent w-40"
            >
              {this.optionValues()}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap rounded mx-2 gap-2">
            {this.currentOptions()}
          </div>
        </div>
      </div>
    );
  }
}
