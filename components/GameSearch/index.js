import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import GameCard from '~/components/GameCard';

export default () => (
  <InstantSearch
    indexName="things"
    appId="R7R9RSL45J"
    apiKey="5dbce5273ac0c82b3a070f998ec22cc8"
  >
    <SearchBox />
    <Hits
      hitComponent={ GameCard }
    />
  </InstantSearch>
);
