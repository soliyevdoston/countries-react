import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <Header>
      <div>
        <h2>Where in the world?</h2>
      </div>

      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/899/899724.png"
          alt=""
          width="30px"
          height="30px"
        />
        <p>Dark Mode</p>
      </div>
    </Header>
  );
}
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
`;
