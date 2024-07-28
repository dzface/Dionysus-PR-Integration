import styled from "styled-components";
import ListItem from "./ListItem";
import SortOptions from "./SortOptions";
import UseAlcoholList from "../../categorypage/Common/UseAlcoholList";
// Container 스타일 컴포넌트를 생성합니다.
const Container = styled.div`
  width: 100%; // 너비를 100%로 설정합니다.
  display: flex; // 플렉스 박스로 설정합니다.
  flex-direction: column; // 세로 방향으로 아이템을 배치합니다.
  justify-content: center; // 수직 가운데 정렬합니다.
  align-items: center; // 수평 가운데 정렬합니다.
  margin: 0 auto; // 좌우 여백을 자동으로 설정합니다.
  padding: 20px; // 안쪽 여백을 설정합니다.
  position: relative; // 상대적인 위치를 설정합니다.
`;

// Input 스타일 컴포넌트를 생성합니다.
const Input = styled.input`
  width: 550px; // 너비를 600px로 설정합니다.
  height: 40px;
  padding: 8px; // 안쪽 여백을 설정합니다.
  text-align: center; // 텍스트를 가운데 정렬합니다.
  margin-bottom: 20px; // 하단 여백을 설정합니다.
  border: 1px solid #ccc; // 테두리 스타일을 설정합니다.
  border-radius: 4px; // 테두리의 둥근 정도를 설정합니다.
  font-size: 16px; // 글꼴 크기를 설정합니다.
  @media (max-width: 700px) {
    width: 300px;
    height: 30px;
  }
`;

// List 스타일 컴포넌트를 생성합니다.
const List = styled.div`
  width: 54vw;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
  @media (max-width: 1070px) {
    width: 600px;
  }
`;

const SelectListDiv = styled.div`
  width: 100vw;
  height: 25px;
  display: flex;
  justify-content: end;
  margin-right: 38vw;
  margin-bottom: 20px;
`;

const Hrtag = styled.hr`
  border: none;
  width: 80vw;
  height: 1.2px;
  background-color: #000;
  margin-bottom: 20px;
`;
//카테고리별 페이지에 들어가는 공통 컴포넌트
const Common = ({ toplist }) => {
  //CustomHook에서 값과 함수들 불러오기.(불러온 알콜 데이터, 정렬방법, 정렬방법입력, 검색값을 입력, 알콜 데이터를 불러오는 비동기함수)
  const { alcohols, sortBy, setSortBy, setSearchTerm, fetchAlcoholList } =
    UseAlcoholList();
  //context전역변수 불러오기
  return (
    <Container>
      <Hrtag />
      {/* 이름으로 검색 */}
      <Input
        type="text"
        placeholder="무엇을 찾고 계신가요?"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* 기준에 따른 리스트 정렬 */}
      <SelectListDiv>
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} toplist={toplist} />
      </SelectListDiv>
      <List>
        {/* 주류 리스트 하나에 대한 컴포넌트 컴포넌트 props에 대한 설명은 해당 컴포넌트에서.*/}
        <ListItem
          alcohols={alcohols}
          alcoholList={fetchAlcoholList}
          isOne={false}
          isReview={true}
          reviewinput={true}
        />
      </List>
      {/* <HorizontalLine /> */}
    </Container>
  );
};

export default Common;
