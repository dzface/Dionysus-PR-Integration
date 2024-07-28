import React, { useState, useEffect } from "react"; // React 라이브러리와 useState, useEffect 훅을 import
import styled, { keyframes } from "styled-components"; // styled-components 라이브러리와 keyframes를 import
import AxiosApi from "../../../api/AxiosApi"; // AxiosApi 모듈을 import
import ListItem from "../Common/ListItem"; // ListItem 컴포넌트를 import
import SortOptions from "../Common/SortOptions"; // SortOptions 컴포넌트를 import

// ThemeItem 스타일 컴포넌트 정의
const ThemeItem = styled.div`
  width: 60vw; // 가로 크기 60% 뷰포트 너비
  height: 100%; // 세로 크기 100%
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
  position: relative; // 상대 위치
  z-index: 1; // 쌓임 순서 1
`;

// fadeInTopLeft 애니메이션 정의
const fadeInTopLeft = keyframes`
  from {
    opacity: 0; // 투명도 0
    transform: translate3d(-100%, -100%, 0); // 왼쪽 위에서 이동
  }

  to {
    opacity: 1; // 투명도 1
    transform: translate3d(0, 0, 0); // 원래 위치로 이동
  }
`;

// Wrapper 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 100%; // 가로 크기 100%
  height: 100%; // 세로 크기 100%
  display: flex; // flexbox 레이아웃
  flex-direction: column; // 수직 방향으로 요소 정렬
  align-items: center; // 수직 가운데 정렬
  animation: ${fadeInTopLeft} 1s; // fadeInTopLeft 애니메이션 적용, 1초 동안
  @media screen and (max-width: 1000px) {
    width: 600px; // 화면 크기가 1000px 이하일 때 가로 크기 600px
  }
`;

// ItemTitle 스타일 컴포넌트 정의
const ItemTitle = styled.div`
  width: 100%; // 가로 크기 100%
  height: 148px; // 세로 크기 148px
  background-color: ${({ bgColor }) => bgColor}; // 배경색 설정
  border-radius: 20px 20px 0 0; // 상단 좌우 모서리 둥글게
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
`;

// IconBox 스타일 컴포넌트 정의
const IconBox = styled.div`
  width: 50%; // 가로 크기 50%
  height: 240px; // 세로 크기 240px
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
`;

// IconImg 스타일 컴포넌트 정의
const IconImg = styled.img`
  width: 150px; // 가로 크기 150px
  height: 140px; // 세로 크기 140px
  border-radius: 50%; // 원형 모양
`;

// RecommendIconDiv 스타일 컴포넌트 정의
const RecommendIconDiv = styled.div`
  width: 100%; // 가로 크기 100%
  min-height: 480px; // 최소 높이 480px 설정
  background-color: rgba(0, 0, 0, 0.5); // 배경색 설정
  border-radius: 0 0 20px 20px; // 하단 좌우 모서리 둥글게
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
  flex-wrap: wrap; // 요소들이 넘칠 경우 줄 바꿈
`;

// SelectListDiv 스타일 컴포넌트 정의
const SelectListDiv = styled.div`
  width: 100vw; // 가로 크기 100% 뷰포트 너비
  display: flex; // flexbox 레이아웃
  flex-direction: column; // 수직 방향으로 요소 정렬
  align-items: center; // 수직 가운데 정렬
  justify-content: center; // 수평 가운데 정렬
  margin: 20px; // 외부 여백 20px
`;

// Recommend2 컴포넌트 정의
const Recommend2 = ({ selectedIcon, selectmenu, selectedMenu }) => {
  const [popularDrinks, setPopularDrinks] = useState([]); // 인기 음료 데이터를 저장할 상태
  const [listItemCount, setListItemCount] = useState(0); // ListItem 컴포넌트의 개수를 저장할 상태
  const [sortBy, setSortBy] = useState(""); // 정렬 기준을 저장할 상태

  // 인기 음료 데이터를 가져오는 함수
  const fetchPopularDrinks = async () => {
    try {
      const response = await AxiosApi.selectpopular(selectedIcon || selectmenu); // API 호출
      setPopularDrinks(response.data); // 받아온 데이터를 popularDrinks 상태에 설정
      setListItemCount(response.data.length); // ListItem 컴포넌트의 개수를 설정
    } catch (error) {
      console.error("인기 음료를 가져오는 중 오류 발생:", error); // 오류 처리
    }
  };

  // 컴포넌트가 마운트될 때와 selectedIcon, selectmenu가 변경될 때 데이터를 가져옴
  useEffect(() => {
    fetchPopularDrinks(); // 인기 음료 데이터를 가져오는 함수 호출
  }, [selectedIcon, selectmenu]); // 의존성 배열에 selectedIcon과 selectmenu 추가

  // 정렬 함수
  const sortItems = (items) => {
    if (sortBy === "price") {
      // 가격 순으로 정렬
      return items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "abv") {
      // 도수 순으로 정렬
      return items.sort((a, b) => a.abv - b.abv);
    } else if (sortBy === "volume") {
      // 용량 순으로 정렬
      return items.sort((a, b) => a.volume - b.volume);
    } else if (sortBy === "rating") {
      // 별점 순으로 정렬
      return items.sort((a, b) => b.rating - a.rating);
    } else {
      return items; // 정렬 기준이 없으면 그대로 반환
    }
  };

  const sortedDrinks = sortItems(popularDrinks); // 정렬된 배열

  // 아이콘 이미지 경로를 반환하는 함수
  const getImagePath = () => {
    if (selectedIcon) {
      return `${process.env.PUBLIC_URL}/recommendationicon/${selectedIcon}.png`; // 감정 아이콘 경로
    } else if (selectmenu) {
      return `${process.env.PUBLIC_URL}/food/${selectedMenu}/${selectmenu}.jpg`; // 메뉴 아이콘 경로
    }
    return null; // 아이콘이 없는 경우 null 반환
  };

  // 배경색을 반환하는 함수(selectedIcon은 구분이 필요해 값으로 구분)
  const bgColor = (selectedIcon, selectmenu) => {
    if (["기쁨", "화남", "슬픔", "사랑"].includes(selectedIcon))
      return "rgba(112, 101, 19, 0.8)"; // 감정 아이콘 배경색
    if (["맑음", "흐림", "비", "눈"].includes(selectedIcon))
      return "rgba(182, 113, 20, 0.8)"; // 날씨 아이콘 배경색
    if (selectmenu) return "rgba(82, 1, 33, 0.8)"; // 메뉴 아이콘 배경색
    return null; // 기본 배경색
  };

  console.log(selectedIcon); // 디버깅을 위한 로그 출력
  console.log(selectmenu); // 디버깅을 위한 로그 출력

  return (
    <ThemeItem>
      <Wrapper>
        <ItemTitle bgColor={bgColor(selectedIcon, selectmenu)}>
          <IconBox>
            <IconImg src={getImagePath()} alt="추천 아이콘" /> {/* 아이콘 이미지 */}
          </IconBox>
        </ItemTitle>
        <RecommendIconDiv style={{ minHeight: `${listItemCount * 170}px` }}>
          {/* ListItem 컴포넌트의 개수에 따라 높이를 설정 */}
          <SelectListDiv>
            <div>
              <SortOptions sortBy={sortBy} setSortBy={setSortBy} /> {/* 정렬 옵션 */}
            </div>
            <ListItem
              alcohols={sortedDrinks}
              alcoholList={fetchPopularDrinks}
              itemcenter={true}
            /> 
          </SelectListDiv>
        </RecommendIconDiv>
      </Wrapper>
    </ThemeItem>
  );
};

export default Recommend2; // Recommend2 컴포넌트 export
