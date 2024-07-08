import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      emoji
    }
  }
`;

export default function AddCountryForm() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('');

  const [addCountry] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          countries(existingCountries = []) {
            const newCountryRef = cache.writeFragment({
              data: addCountry,
              fragment: gql`
                fragment NewCountry on Country {
                  id
                  name
                  code
                  emoji
                }
              `
            });
            return [...existingCountries, newCountryRef];
          }
        }
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCountry({ variables: { data: { name, code, emoji } } });
    setName('');
    setCode('');
    setEmoji('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom du pays"
      />
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code du pays"
      />
      <input
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        placeholder="Emoji du pays"
      />
      <button type="submit">Ajouter un pays</button>
    </form>
  );
}