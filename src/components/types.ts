interface KeyedOption {
  key: number;
  str: string;
}

interface Trait {
  id: string;
  trait: string;
  points: number;
  special?: boolean;
}

export type { KeyedOption, Trait };
