import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import AddCountryForm from '../components/AddCountryForm';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      emoji
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1>Liste des pays</h1>
      <AddCountryForm />
      <ul>
        {data.countries.map(({ id, name, code, emoji }: { id: string, name: string, code: string, emoji: string }) => (
          <li key={id}>
            <Link href={`/country/${code}`}>
              {emoji} {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}