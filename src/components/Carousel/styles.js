import styled from "styled-components";

export const Title = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 1;
  margin-bottom: 14px;
  display: inline-block;
  padding: 20px;
  background: red;
  line-height: 1;
  border-radius: 50px;
  @media (max-width: 800px) {
    font-size: 18px;
    padding: 10px;
  }
`;

export const ExtraLink = styled.a`
  margin-left: 20px;
  text-decoration: none;
  transition: opacity 0.2s;
  transition: 0.2s ease-in-out;
  &:hover,
  &:focus {
    opacity: 0.5;
    font-size: 21px;
    color: #f54;
  }
  @media (max-width: 800px) {
    display: block;
    margin-bottom: 16px;
    margin-left: 0;
  }
`;

export const VideoCardList = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-bottom: 32px;
  list-style: none;
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, transparent, #30ff00);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, transparent, #30ffee);
    border-radius: 6px;
  }
  li {
    margin-right: 20px;
  }
`;

export const VideoCardGroupContainer = styled.section`
  color: white;
  min-height: 197px;
  margin-left: 5%;
  margin-bottom: 16px;
`;