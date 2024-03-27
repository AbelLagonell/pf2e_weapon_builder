import { Component } from "react";
import { KeyedOption } from "./types";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

enum dice {
  smallest = "1d4",
  smaller = "1d6",
  medium = "1d8",
  bigger = "1d10",
  biggest = "1d12",
}

interface DiceProps {
  activeTraits: KeyedOption[];
  disabled: boolean;
  changed: (arg0: boolean) => any;
}
interface DiceState {
  diceSize: dice;
  disabledUp: boolean;
  disabledDown: boolean;
}

export default class Dice_Tracker extends Component<DiceProps, DiceState> {
  state: DiceState = {
    diceSize: dice.smallest,
    disabledUp: false,
    disabledDown: false,
  };

  increment() {
    this.setState({ disabledDown: false });
    switch (this.state.diceSize) {
      case dice.smallest:
        this.setState({ diceSize: dice.smaller });
        break;
      case dice.smaller:
        this.setState({ diceSize: dice.medium });
        break;
      case dice.medium:
        this.setState({ diceSize: dice.bigger });
        break;
      case dice.bigger:
        this.setState({ diceSize: dice.biggest });
        break;
      case dice.biggest:
        this.setState({ disabledUp: true });
        break;
      default:
        break;
    }
    this.props.changed(true);
  }

  decrement() {
    this.setState({ disabledUp: false });
    switch (this.state.diceSize) {
      case dice.biggest:
        this.setState({ diceSize: dice.bigger });
        break;
      case dice.bigger:
        this.setState({ diceSize: dice.medium });
        break;
      case dice.medium:
        this.setState({ diceSize: dice.smaller });
        break;
      case dice.smaller:
        this.setState({ diceSize: dice.smallest });
        break;
      case dice.smallest:
        this.setState({ disabledDown: true });
        break;
      default:
        break;
    }
    this.props.changed(false);
  }

  determineDice() {
    this.props.activeTraits.map((value) => {
      switch (value.key) {
        case 1:
          this.increment();
          this.increment();
          break;
        case 21:
          this.setState({ diceSize: dice.smaller });
          break;
        default:
          break;
      }
    });
  }

  determineDisable(bool: boolean) {
    if (this.props.disabled) return true;
    else return bool;
  }

  render() {
    return (
      <div className="flex flex-row w-auto space-x-4">
        <Button
          className="size-8 p-0"
          type="button"
          variant="outline"
          onClick={() => this.decrement()}
          disabled={this.determineDisable(this.state.disabledDown)}
        >
          <Minus />
        </Button>
        <div className="flex h-auto">
          <p className="h-auto text-center text-xl">{this.state.diceSize}</p>
        </div>
        <Button
          className="size-8 p-0"
          type="button"
          variant="outline"
          onClick={() => this.increment()}
          disabled={this.determineDisable(this.state.disabledUp)}
        >
          <Plus />
        </Button>
      </div>
    );
  }
}
