import styled from 'styled-components';

const GameCard = props => (
  <__GameCard href="#">
    <__Figure cover={props.hit.image}>
      <img src={props.hit.image} alt="alt text" />
    </__Figure>

    <__Bottom>
      <h3>{props.hit.name}</h3>
    </__Bottom>
  </__GameCard>
);

export default GameCard;

const __GameCard = styled.a`
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  border-top: 2rem solid #fff;
  border-right: 1rem solid #fff;
  border-left: 1rem solid #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease-in;

  &:hover {
    transform: rotate(-1.5deg);
  }
`;

const __Figure = styled.figure`
  position: relative;
  height: 240px;
  background-color: ${p => p.theme.colour.brown};
  background-image: url(${p => p.cover});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: inset 1px 1px 8px rgba(0, 0, 0, 0.3);
  }

  img {
    display: none;
  }
`;

const __Bottom = styled.div`
  background-color: #fff;
  height: 56px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${p => p.theme.colour.brown};

  h3 {
    font-family: 'Mali';
    font-weight: 500;
    font-size: 20px;
  }
`;
