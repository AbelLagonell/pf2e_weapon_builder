import { Component } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { KeyedOption } from "./types"
import { Label } from "./ui/label";

interface Props {
  options: KeyedOption[];
  name: string;
}
interface State {
  active: KeyedOption[];
  options: KeyedOption[];
}


export default class Dropdown extends Component<Props, State>{
  state: State = {
    active: [],
    options: this.props.options,
  }


  addActive = (value:string) => {
    if (value === '') return
    const key = +value;
    const optionToAdd = this.state.options.find((opt) => opt.key === key);
    if (optionToAdd) {
      this.setState((prevState) => ({
        active: [...prevState.active, optionToAdd],
        options: prevState.options.filter((opt) => opt.key !== key),
      }))
    }
  }

  removeActive = (key:number|string) => {
    if (typeof key === 'string') return
    const optionToRemove = this.state.active.find((opt) => opt.key === key);
    if (optionToRemove) {
      this.setState((prevState) => ({
        active: prevState.active.filter((opt) => opt.key !== key),
        options: [...prevState.options, optionToRemove],
      }))
    }
  }

  optionValues(){
    let opt = []

    for (let option of this.state.options){
      opt.push(<SelectItem value={option.key.toString()} key={option.key}>{option.str}</SelectItem>);
    }

    return (
      <>
        {opt}
      </>
    )
  }

  currentOptions(){
    let opt = [];

    for (let option of this.state.active){  
      opt.push(<Button type="button" variant="outline" key={option.key} onClick={() => this.removeActive(option.key)}>{option.str}</Button>)
    }

    return (
      <>{opt}</>
    )
  }
  
  render() {
      const {name} = this.props;
      return (
      
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor={name}>{name}</Label>
        <div className='flex flex-row'>
          <Select onValueChange={this.addActive}>
            <SelectTrigger className="w-40 h-[42px]" id={name}>
              <SelectValue placeholder="Select">Select</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" className="border-black border rounded bg-accent w-40">
              {this.optionValues()}
            </SelectContent>
          </Select>
          <div className="flex flex-row rounded mx-2 gap-2">
            {this.currentOptions()}
          </div>
        </div>
      </div>
      )
  }
}
