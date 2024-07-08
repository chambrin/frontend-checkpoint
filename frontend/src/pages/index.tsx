import { useQuery, gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Liste des pays</h1>
      <ul>
        {data.countries.map(({ name, emoji }: { name: string, emoji: string }) => (
          <li key={name}>
            {emoji} {name}
          </li>
        ))}
      </ul>
    </div>
  );
}