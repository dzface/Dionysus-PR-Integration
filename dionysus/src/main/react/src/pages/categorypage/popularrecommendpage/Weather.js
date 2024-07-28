import React, { useState, useEffect } from "react"; // React와 Hook(useState, useEffect) import
import styled from "styled-components"; // styled-components 라이브러리 import

// weatherCategory에 따라 배경 색상을 반환하는 함수
const getBackgroundColor = (weatherCategory) => {
  switch (weatherCategory) {
    case "맑음": // 맑음
      return "#ffa500"; // 주황색
    case "흐림": // 흐림
      return "#808080"; // 회색
    case "눈": // 눈
      return "#87ceeb"; // 하늘색
    case "비": // 비
      return "#4682b4"; // 진한 파란색
    default: // 기본 배경 색상
      return "#121212"; // 어두운 색
  }
};

// 오늘의 날씨를 보여줄 styled-component
const TodayWeather = styled.div`
  width: 327px;
  height: 240px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ weatherCategory }) =>
    getBackgroundColor(weatherCategory)};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
  opacity: 0.9;
  position: absolute;

  @media (max-width: 768px) {
    visibility: hidden; // 작은 화면에서는 숨기기
  }
`;

// 텍스트를 보여줄 styled-component
const Text = styled.p`
  font-size: x-large;
  color: #ffffff;
  margin-bottom: 10px;
`;

// 로딩 상태를 보여줄 styled-component
const Loading = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 24px;
  color: #ffffff;
`;

// 아이콘 박스를 위한 styled-component
const IconBox = styled.div`
  width: 327px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 아이콘 이미지를 위한 styled-component
const IconImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(0.9); // 호버 시 아이콘 크기를 줄이기
  }
`;

// 날씨 정보를 표시할 메인 컴포넌트
const DisplayWeather = () => {
  const key = "0ff7f6cfb7b7c06333e16f6974fc0453"; // OpenWeatherMap API 키
  const [apiValue, setApiValue] = useState(""); // API 응답을 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태

  // 날씨 데이터를 API에서 가져오는 함수
  const getWeather = async () => {
    try {
      const responseFirst = fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&APPID=${key}&units=metric`
      );

      const data1 = await responseFirst; // API 응답 대기
      const result1 = await data1.json(); // JSON 형태로 변환
      console.log("Weather API response:", result1);
      setApiValue(result1); // API 응답을 상태에 저장
      setLoading(false); // 로딩 상태를 false로 설정
    } catch (error) {
      console.error("Error: ", error); // 에러 로그 출력
    }
  };

  // 컴포넌트가 마운트될 때 getWeather 함수 호출
  useEffect(() => {
    getWeather();
  }, []);

  // 날씨 설명에 따라 카테고리 반환하는 함수
  const getWeatherCategory = (main) => {
    if (main === "Clear") return "맑음"; // 맑음
    if (
      main === "Thunderstorm" ||
      main === "Drizzle" ||
      main === "Atmosphere" ||
      main === "Clouds"
    )
      return "흐림"; // 흐림
    if (main === "Rain") return "비"; // 비
    if (main === "Snow") return "눈"; // 눈
    return ""; // 기본값
  };

  return (
    <>
      {loading ? ( // 로딩 중일 때
        <Loading>Loading...</Loading> // 로딩 컴포넌트 표시
      ) : (
        // 로딩이 끝나면
        <TodayWeather
          weatherCategory={
            getWeatherCategory(apiValue.weather[0].main) // 날씨 카테고리 설정
          }
        >
          <IconBox>
            <IconImg
              src={`${process.env.PUBLIC_URL}/weather/${getWeatherCategory(
                apiValue.weather[0].main
              )}.gif`} // 날씨 아이콘 이미지 설정
            />
          </IconBox>
          <Text>
            {getWeatherCategory(apiValue.weather[0].main)}/{apiValue.main.temp}
          </Text>
        </TodayWeather>
      )}
    </>
  );
};

export default DisplayWeather; // DisplayWeather 컴포넌트를 기본 export
