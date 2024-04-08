import { Component } from "react";
import { Trait } from "./types";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { decrement, dice, increment } from "./diceUtils";

interface DiceProps {
  options: Trait[];
  validUp: boolean;
  validDown?: boolean;
  updateTrait: (trait: Trait) => any;
}

interface DiceState {
  diceSize: dice;
}

class Dice_Editor extends Component<DiceProps, DiceState> {
  state: DiceState = {
    diceSize: dice.smallest,
  };

  increment() {
    this.setState(
      (prevState) => ({
        diceSize: increment(prevState.diceSize),
      }),
      () => {
        this.props.updateTrait(
          this.props.options.find(
            (value) => value.trait === this.state.diceSize,
          ),
        );
      },
    );
  }

  decrement() {
    this.setState(
      (prevState) => ({
        diceSize: decrement(prevState.diceSize),
      }),
      () => {
        this.props.updateTrait(
          this.props.options.find(
            (value) => value.trait === increment(this.state.diceSize),
          ),
        );
      },
    );
  }

  render() {
    return (
      <div className="flex flex-row w-auto space-x-4">
        <Button
          className="size-8 p-0"
          type="button"
          variant="outline"
          onClick={() => this.decrement()}
          disabled={this.state.diceSize === dice.smallest}
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
          disabled={this.props.validUp || this.state.diceSize === dice.biggest}
        >
          <Plus />
        </Button>
      </div>
    );
  }
}

export default Dice_Editor;
