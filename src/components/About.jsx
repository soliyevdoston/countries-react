import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Lottie from "lottie-react";
import loadingAnimation from "../animation/loading.json";

export default function About() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch(() => alert("Xatolik: Ma’lumotni yuklab bo‘lmadi!"));
  }, [countryName]);

  if (!country)
    return (
      <Loading>
        <Lottie animationData={loadingAnimation} loop={true} />
      </Loading>
    );

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "Malumot mavjud emas";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "Malumot mavjud emas";

  const tld = country.tld ? country.tld.join(", ") : "Malumot mavjud emas";

  const borders = country.borders ? country.borders.join(", ") : "None";

  return (
    <Wrapper>
      <BackButton to="/">← Back</BackButton>
      <Card>
        <Left>
          <Flag src={country.flags.png} alt={country.name.common} />
        </Left>
        <Right>
          <h2>{country.name.common}</h2>
          <Info>
            <p>
              <strong>Native Name:</strong> {nativeName || country.name.common}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Sub Region:</strong>{" "}
              {country.subregion || "Malumot mavjud emas"}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              {country.capital ? country.capital[0] : "Malumot mavjud emas"}
            </p>
            <p>
              <strong>Top Level Domain:</strong> {tld}
            </p>
            <p>
              <strong>Currencies:</strong> {currencies}
            </p>
            <p>
              <strong>Languages:</strong> {languages}
            </p>
            <p>
              <strong>Border Countries:</strong> {borders}
            </p>
          </Info>
        </Right>
      </Card>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  margin-bottom: 40px;
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;

  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: #eee;
  }
`;

const Card = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  min-width: 560px;
`;

const Right = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Info = styled.div`
  margin-top: 20px;
  p {
    margin: 8px 0;
    font-size: 16px;
  }
`;

const Flag = styled.img`
  width: 560px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
