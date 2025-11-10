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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <GlobalStyle darkMode={darkMode} />
      <DarkNext />
      <Header>
        <H2>Where in the world?</H2>
        <Dark onClick={() => setDarkMode(!darkMode)}>
          <Img
            src="https://cdn-icons-png.flaticon.com/512/899/899724.png"
            alt=""
            width="20px"
            height="20px"
          />
          <p>
            {(() => {
              if (darkMode) return "Light Mode";
              return "Dark Mode";
            })()}
          </p>
        </Dark>
      </Header>

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <Loading>
                <Lottie animationData={loadingAnimation} loop={true} />
              </Loading>
            ) : (
              <Main>
                {countries.map((country, index) => (
                  <CountryCard key={index}>
                    <Link to={`/about/${country.name.common}`}>
                      <Flag
                        src={country.flags.png}
                        alt={country.name.common}
                        width="264px"
                        height="160px"
                      />
                      <CountryName>{country.name.common}</CountryName>
                      <CountryInfo>
                        <p>Population: {country.population.toLocaleString()}</p>

                        <p>
                          Capital:{" "}
                          {country.capital ? country.capital[0] : "N/A"}
                        </p>
                      </CountryInfo>
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
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.3s;
  }

  body.dark-mode {
    background-color: black;;
    color: #fff;
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
  transition: background 0.3s;
`;

export const H2 = styled.h2`
  font-size: 24px;
  padding-left: 80px;
`;
export const Dark = styled.div`
  padding-right: 80px;
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
export const CountryCard = styled.div.attrs(() => ({
  className: "country-card",
}))`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 264px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

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
export const CountryName = styled.h3`
  margin: 10px 0 5px;
`;
export const CountryInfo = styled.div`
  font-size: 14px;

  p {
    margin: 3px 0;
  }
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
const DarkNext = createGlobalStyle`
  body.dark-mode .country-card {
    background-color: black;
  }

  body:not(.dark-mode) .country-card {
    background-color: #fff;
  }

  body.dark-mode ${Header} {
    background-color: black;
    color: #fff;
  }
`;
