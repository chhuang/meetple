/**
 * LIBS
 */
import { withRouter } from 'next/router';

/**
 * DATA
 */
import GAMES from '@root/data/games';

/**
 * LAYOUT
 */
import Layout from '@root/layouts/app';

/**
 * COMPONENTS
 */
import GameCard from '@components/GameCard';

const BoardgameViewPage = props => {
  const _game = GAMES.find(game => game.slug === props.router.query.slug);

  return (
    <Layout>
      <section className="section">
        {!!_game && <GameCard game={_game} />}
      </section>
    </Layout>
  );
};

export default withRouter(BoardgameViewPage);
