import Common from "../Common/Common";
import styled from "styled-components";
const Title = styled.h1`
  width: 280px; // 너비를 300px로 설정합니다.
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray; // 배경색을 회색으로 설정합니다.
  font-size: 21px; // 글꼴 크기를 설정합니다.
  margin: auto; // 가운데 정렬합니다.
  margin-bottom: 20px; // 하단 여백을 설정합니다.
  border-radius: 20px; // 테두리의 둥근 정도를 설정합니다.
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
`;
//전통주 페이지 컴포넌트
const Traditional = () => {
  return (
    <>
      <Title>테마별 전통주 추천</Title>
      {/* 와인 목록 내용 */}
      <Common toplist={false} />
    </>
  );
};

export default Traditional;
