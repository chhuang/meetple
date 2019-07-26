import {
  InstantSearch,
  SearchBox,
  RefinementList,
  Hits
} from 'react-instantsearch-dom';
import GameCard from '@components/GameCard';

const Search = () => (
  <InstantSearch
    indexName="things"
    appId="R7R9RSL45J"
    apiKey="5dbce5273ac0c82b3a070f998ec22cc8"
  >
    <RefinementList attribute="categories.value" showMore />
    <RefinementList attribute="specs.minPlayers" />
    <RefinementList attribute="specs.maxPlayers" />
    <RefinementList attribute="specs.minPlayTime" />
    <RefinementList attribute="specs.maxPlayTime" />
    <SearchBox />
    <Hits hitComponent={GameCard} />
  </InstantSearch>
);

export default Search;
