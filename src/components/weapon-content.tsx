import { Component, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { KeyedOption } from "./types";
import { Badge } from "./ui/badge";
import { dice, increment } from "./diceUtils";

interface Props {
  title: string;
  desc: string;
  damage: string[];
  modular?: string;
  lethality?: boolean;
  traits: KeyedOption[];
}

interface State {}

export default class Weapon_Content extends Component<Props, State> {
  printTraits() {
    let opt = [];
    for (let traits of this.props.traits) {
      if (traits.key >= 29) continue;
      if (traits.key === 20) {
        let cDice = increment(this.printDice());
        opt.push(<Badge key={traits.key}>{traits.str + " " + cDice}</Badge>);
        continue;
      }
      if (traits.key === 26) {
        let cDice = increment(increment(this.printDice()));
        opt.push(<Badge key={traits.key}>{traits.str + " " + cDice}</Badge>);
        continue;
      }
      opt.push(<Badge key={traits.key}>{traits.str}</Badge>);
    }
    return opt;
  }

  printDamage() {
    let string = "";
    string += this.props.lethality ? "Nonlethal " : "";
    string += this.props.damage.map((value) => value.toString()).join(", ");
    string += " ";
    string += this.props.damage.length > 1 ? this.props.modular : "";
    string += " Damage";

    return <CardDescription>{string}</CardDescription>;
  }

  printDice() {
    let count = 0;
    let diceSize = dice.smallest;
    for (let traits of this.props.traits) {
      if (traits.key >= 29) count++;
    }
    for (let _ = 0; _ < count; _++) {
      diceSize = increment(diceSize);
    }
    return diceSize;
  }

  render(): ReactNode {
    const { title, desc } = this.props;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>{title + " " + this.printDice()}</CardTitle>
            <CardDescription>{desc}</CardDescription>
            {this.printDamage()}
          </CardHeader>
          <CardContent className="space-x-2">{this.printTraits()}</CardContent>
        </Card>
      </>
    );
  }
}
