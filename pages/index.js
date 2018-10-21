/**
 * DATA
 */
import GAMES from '~/data/games';

/**
 * LAYOUT
 */
import Layout from '~/layouts/app';

/**
 * COMPONENTS
 */
import GameCard from '~/components/GameCard';

const HomePage = () => (
  <Layout>
    <section className="section">
      <div className="columns is-multiline">
        {
          GAMES.map(game => (
            <div className="column is-4">
              <GameCard game={ game } />
            </div>
          ))
        }
      </div>
    </section>
  </Layout>
);

export default HomePage;