import React from "react"; // React 라이브러리 import
import styled, { keyframes } from "styled-components"; // styled-components 라이브러리와 keyframes import
import Recommend2 from "./CategoryList"; // Recommend2 컴포넌트 import
import { useState } from "react"; // useState Hook import

// bounce 애니메이션을 styled-components로 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); // 원래 위치
  }

  40% {
    transform: translateY(-30px); // 위로 30px 이동
  }

  60% {
    transform: translateY(-15px); // 위로 15px 이동
  }
`;

// ThemeContainer 스타일 컴포넌트 정의
const ThemeContainer = styled.div`
  width: 100%; // 가로 크기 100%
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
  flex-wrap: wrap; // 요소들이 넘칠 경우 줄 바꿈
  flex-direction: column; // 수직 방향으로 요소 정렬
  padding: 20px; // 내부 여백 20px
  position: relative; // 상대 위치
`;

// ThemeItem 스타일 컴포넌트 정의
const ThemeItem = styled.div`
  width: 1000px; // 가로 크기 1000px
  height: 100%; // 세로 크기 100%
  display: flex; // flexbox 레이아웃
  flex-direction: column; // 수직 방향으로 요소 정렬
  position: relative; // 상대 위치
  z-index: 1; // 쌓임 순서 1
`;

// bounceIn 애니메이션을 styled-components로 정의
const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); // 애니메이션 시간 함수 설정
  }

  0% {
    opacity: 0; // 투명도 0
    transform: scale3d(0.3, 0.3, 0.3); // 크기 0.3배
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1); // 크기 1.1배
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9); // 크기 0.9배
  }

  60% {
    opacity: 1; // 투명도 1
    transform: scale3d(1.03, 1.03, 1.03); // 크기 1.03배
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97); // 크기 0.97배
  }

  to {
    opacity: 1; // 투명도 1
    transform: scale3d(1, 1, 1); // 크기 원래대로
  }
`;

// Wrapper 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 100%; // 가로 크기 100%
  height: 100%; // 세로 크기 100%
  display: flex; // flexbox 레이아웃
  flex-direction: column; // 수직 방향으로 요소 정렬
  align-items: center; // 수직 가운데 정렬
  animation: ${bounceIn} 1s; // bounceIn 애니메이션 적용, 1초 동안
`;

// ItemTitle 스타일 컴포넌트 정의
const ItemTitle = styled.div`
  width: 100%; // 가로 크기 100%
  height: 148px; // 세로 크기 148px
  background-color: rgba(82, 1, 33, 0.8); // 배경색 설정
  border-radius: 20px 20px 0 0; // 상단 좌우 모서리 둥글게
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
`;

// RecommendIconDiv 스타일 컴포넌트 정의
const RecommendIconDiv = styled.div`
  width: 100%; // 가로 크기 100%
  height: 1000px; // 세로 크기 1000px
  background-color: rgba(0, 0, 0, 0.5); // 배경색 설정
  border-radius: 0 0 20px 20px; // 하단 좌우 모서리 둥글게
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
  flex-wrap: wrap; // 요소들이 넘칠 경우 줄 바꿈

  @media (max-width: 768px) { // 화면 크기가 768px 이하일 때
    flex-direction: column; // 수직 방향으로 요소 정렬
    height: auto; // 세로 크기 자동 설정
  }
`;

// IconBox 스타일 컴포넌트 정의
const IconBox = styled.div`
  width: 50%; // 가로 크기 50%
  height: 240px; // 세로 크기 240px
  display: flex; // flexbox 레이아웃
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬

  @media (max-width: 768px) { // 화면 크기가 768px 이하일 때
    width: 100%; // 가로 크기 100%
    height: auto; // 세로 크기 자동 설정
    margin: 20px; // 외부 여백 20px
  }
`;

// MainIconImg 스타일 컴포넌트 정의
const MainIconImg = styled.img`
  width: 150px; // 가로 크기 150px
  height: 140px; // 세로 크기 140px
  border-radius: 50%; // 원형 모양
  animation: ${bounce} 0.7s infinite; // bounce 애니메이션 적용, 0.7초 간격으로 무한 반복
`;

// IconImg 스타일 컴포넌트 정의
const IconImg = styled.img`
  width: 300px; // 가로 크기 300px
  height: 150px; // 세로 크기 150px
  transition: transform 0.2s ease; // transform 속성 변화 시 0.2초 동안 변화

  &:hover {
    transform: scale(0.9); // 호버 시 크기 0.9배
  }
`;

// ButtonItem 스타일 컴포넌트 정의
const ButtonItem = styled.button`
  margin-left: auto; // 오른쪽 정렬

  @media (max-width: 768px) { // 화면 크기가 768px 이하일 때
    position: absolute; // 절대 위치
  }
`;

// Menu 컴포넌트 정의
const Menu = ({ selectedMenu, setShowMenu }) => {
  const [showRecommend2, setShowRecommend2] = useState(false); // Recommend2 컴포넌트 표시 상태
  const [selectmenu, setSelectMenu] = useState(null); // 선택된 메뉴 아이콘 상태

  // 메뉴 아이콘 클릭 핸들러
  const onMenuIconClick = (menuIcon) => {
    setSelectMenu(menuIcon); // 선택된 메뉴 아이콘 설정
    setShowRecommend2(true); // Recommend2 컴포넌트 표시
  };

  // Recommend2 컴포넌트 닫기 핸들러
  const handleCloseRecommend2 = () => {
    setShowRecommend2(false); // Recommend2 컴포넌트 숨김
    setSelectMenu(null); // 선택된 메뉴 아이콘 초기화
  };

  // 아이콘 이미지 경로 반환 함수
  const getIconImagePath = (menuIcon) => {
    return `${process.env.PUBLIC_URL}/food/${selectedMenu}/${menuIcon}.jpg`; // 이미지 경로 설정
  };

  // 메뉴 목록 객체
  const MenuList = {
    한식: [
      "과일안주",
      "해물탕",
      "마른안주",
      "보쌈",
      "삼겹살",
      "아구찜",
      "족발",
      "해물파전",
    ],
    일식: [
      "라멘",
      "밀푀유나베",
      "야끼니꾸",
      "야끼소바",
      "장어덮밥",
      "초밥",
      "텐동",
      "회",
    ],
    양식: [
      "감바스",
      "스테이크",
      "치즈플래터",
      "치킨",
      "카나페",
      "크림파스타",
      "피자",
      "해물크림스튜",
    ],
    중식: [
      "꿔바로우",
      "딤섬",
      "마라탕",
      "양꼬치",
      "짜장면",
      "짬뽕",
      "탕수육",
      "훠거",
    ],
  };

  return (
    <ThemeContainer>
      {showRecommend2 ? ( // Recommend2 컴포넌트 표시 여부에 따라 분기
        <>
          <ButtonItem onClick={handleCloseRecommend2}>Close</ButtonItem> {/* Recommend2 닫기 버튼 */}
          <Recommend2 selectmenu={selectmenu} selectedMenu={selectedMenu} /> {/* Recommend2 컴포넌트 */}
        </>
      ) : (
        <ThemeItem>
          <ButtonItem onClick={() => setShowMenu(false)}>Close</ButtonItem> {/* 전체 메뉴 닫기 버튼 */}

          <Wrapper>
            <ItemTitle>
              <IconBox>
                <MainIconImg
                  src={`${process.env.PUBLIC_URL}/recommendationicon/${selectedMenu}.png`}
                />
              </IconBox>
            </ItemTitle>
            <RecommendIconDiv>
              {MenuList[selectedMenu].map((menuIcon) => ( // 선택된 메뉴에 해당하는 아이콘들 맵핑
                <IconBox key={menuIcon}>
                  <IconImg
                    src={getIconImagePath(menuIcon)}
                    onClick={() => onMenuIconClick(menuIcon)} // 아이콘 클릭 시 처리
                  />
                </IconBox>
              ))}
            </RecommendIconDiv>
          </Wrapper>
        </ThemeItem>
      )}
    </ThemeContainer>
  );
};

export default Menu; // Menu 컴포넌트 export
