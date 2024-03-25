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
  traits: KeyedOption[];
}

interface State {
  activeTraits: KeyedOption[];
  points: number;
}

export default class Weapon_Content extends Component<Props, State> {
  state: State = {
    activeTraits: this.props.traits,
    points: 1,
  };

  printTraits() {
    let opt = [];
    for (let traits of this.state.activeTraits) {
      opt.push(<Badge>{traits.str}</Badge>);
    }
    return opt;
  }

  render(): ReactNode {
    const { title, desc } = this.props;

    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
          <CardContent>{this.printTraits()}</CardContent>
        </Card>
      </>
    );
  }
}
