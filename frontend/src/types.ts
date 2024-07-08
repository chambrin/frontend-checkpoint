export type Country = {
  id: string;
  name: string;
  code: string;
  emoji: string;
  continent?: {
    id: string;
    name: string;
  };
};

export type CountryDetailsProps = {
  country: Country;
};

export type AddCountryFormData = {
  name: string;
  code: string;
  emoji: string;
};