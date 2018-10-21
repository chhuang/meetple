import styled from 'styled-components';

/**
 * LAYOUT
 */
import Layout from '~/layouts/app';

const HomePage = () => (
  <Layout>
    <section className="section">
      <div className="container">
        <h1 className="title">
          <__Text>Hello World</__Text>
        </h1>
        <p className="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
      </div>
    </section>
  </Layout>
);

export default HomePage;

const __Text = styled.span`
  color: ${ p => p.theme.colour.brand };
`;