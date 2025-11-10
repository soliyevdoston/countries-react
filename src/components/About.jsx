import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Lottie from "lottie-react";
import loadingAnimation from "../animation/loading.json"; // Yo‘lni o‘zgartiring

export default function About() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch((err) => alert("Xatolik: Ma’lumotni yuklab bo‘lmadi!"));
  }, [countryName]);

  if (!country)
    return (
      <LoadingWrapper>
        <Lottie animationData={loadingAnimation} loop={true} />
      </LoadingWrapper>
    );

  return (
    <Wrapper>
      <BackLink to="/">← Back</BackLink>
      <h2>{country.name.common}</h2>
      <Flag src={country.flags.png} alt={country.name.common} />
      <Info>
        <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
      </Info>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: #eee;
  }
`;

const Info = styled.div`
  margin-top: 20px;
  p {
    margin: 10px 0;
    font-size: 18px;
  }
`;

const Flag = styled.img`
  width: 200px;
  margin: 20px 0;
  border-radius: 8px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; // kerak bo‘lsa o‘zgartiring
`;
