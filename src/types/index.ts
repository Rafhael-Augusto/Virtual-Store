type electronicsSpecs = {
  screen?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  battery?: string;
  weight?: string;
  operating_system?: string;
};

type clothesSpecs = {
  material?: string;
  fit?: string;
  sleeve_length?: string;
  color?: string;
  gender?: string;
  size_range?: string;
};

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: electronicsSpecs | clothesSpecs;
}
