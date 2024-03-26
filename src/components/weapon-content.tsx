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
      opt.push(<Badge key={traits.key}>{traits.str}</Badge>);
    }
    return opt;
  }

  printDamage() {
    let string = "";
    string += this.props.damage.map((value) => value.toString()).join(", ");
    string += " ";
    string += this.props.damage.length > 1 ? this.props.modular : "";
    string += this.props.lethality ? "Nonlethal" : "";
    string += " Damage";

    return <CardDescription>{string}</CardDescription>;
  }

  render(): ReactNode {
    const { title, desc } = this.props;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
            {this.printDamage()}
          </CardHeader>
          <CardContent className="space-x-2">{this.printTraits()}</CardContent>
        </Card>
      </>
    );
  }
}
