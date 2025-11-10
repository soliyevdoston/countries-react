import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import About from "./components/About";
import Lottie from "lottie-react";
import loadingAnimation from "./animation/loading.json";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => alert("Xatolik: Ma’lumotni yuklab bo‘lmadi!"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle darkMode={darkMode} />
      <Header>
        <H2>Where in the world?</H2>
        <Dark onClick={() => setDarkMode(!darkMode)}>
          <Img
            src="https://cdn-icons-png.flaticon.com/512/899/899724.png"
            alt=""
            width="20px"
            height="20px"
          />
          <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
        </Dark>
      </Header>

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <LoadingWrapper>
                <Lottie animationData={loadingAnimation} loop={true} />
              </LoadingWrapper>
            ) : (
              <Main>
                {countries.map((country, index) => (
                  <CountryCard key={index}>
                    <Link to={`/about/${country.name.common}`}>
                      <Flag
                        src={country.flags.png}
                        alt={country.name.common}
                        width="264px"
                        height="164px"
                      />
                      <p>{country.name.common}</p>
                    </Link>
                  </CountryCard>
                ))}
              </Main>
            )
          }
        />
        <Route path="/about/:countryName" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => (props.darkMode ? "#111927" : "#f5f5f5")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.3s ease;
  }
`;

// Styled Components
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`;
export const H2 = styled.h2`
  font-size: 24px;
`;
export const Dark = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 8px;
  }
`;
export const Img = styled.img`
  padding-right: 8px;
`;
export const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px 20px;
  max-width: 1280px;
  margin: 0 auto;
`;
export const CountryCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 264px;
  text-align: center;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
export const Flag = styled.img`
  width: 100%;
  border-radius: 4px;
`;
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
