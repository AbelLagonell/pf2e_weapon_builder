import { Component } from "react";
import { KeyedOption } from "./types";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { decrement, dice, increment } from "./diceUtils";

interface DiceProps {
  activeTraits: KeyedOption[];
  validUp: boolean;
  validDown: boolean;
  changed: (arg0: boolean) => any;
}
interface DiceState {
  diceSize: dice;
}

export default class Dice_Tracker extends Component<DiceProps, DiceState> {
  state: DiceState = {
    diceSize: dice.smallest,
  };

  increment() {
    this.setState((prevState) => ({
      diceSize: increment(prevState.diceSize),
    }));
    this.props.changed(true);
  }

  decrement() {
    this.setState((prevState) => ({
      diceSize: decrement(prevState.diceSize),
    }));
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

  determineDisable(upDown: boolean) {
    const { validUp, validDown } = this.props;

    if (upDown) {
      //UP
      if (validUp) return true;
      if (this.state.diceSize === dice.biggest) return true;
      return false;
    } else {
      //DOWN
      if (validDown) return true;
      if (this.state.diceSize === dice.smallest) return true;
      return false;
    }
  }

  render() {
    return (
      <div className="flex flex-row w-auto space-x-4">
        <Button
          className="size-8 p-0"
          type="button"
          variant="outline"
          onClick={() => this.decrement()}
          disabled={this.determineDisable(false)}
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
          disabled={this.determineDisable(true)}
        >
          <Plus />
        </Button>
      </div>
    );
  }
}
