/**
 * LAYOUT
 */
import Layout from '@root/layouts/app';

/**
 * COMPONENTS
 */
import GameSearch from '@components/GameSearch';

const HomePage = () => (
  <Layout>
    <section className="section">
      <GameSearch />
    </section>
  </Layout>
);

export default HomePage;
