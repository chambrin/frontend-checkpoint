import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Country } from '../../types';

const GET_COUNTRY_BY_CODE = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;

  const { loading, error, data } = useQuery<{ country: Country }>(GET_COUNTRY_BY_CODE, {
    variables: { code },
    skip: !code, // Skip the query if `code` is undefined
  });

  if (router.isFallback || !code) {
    return <p>Loading...</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error:', error);
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.country) {
    return <p>No country data found</p>;
  }

  const { id, name, emoji, continent } = data.country;

  return (
    <div>
      <h1>{emoji} {name}</h1>
      <p>Code: {code}</p>
      <p>ID: {id}</p>
      {continent && (
        <div>
          <h2>Continent</h2>
          <p>Name: {continent.name}</p>
          <p>ID: {continent.id}</p>
        </div>
      )}
    </div>
  );
}