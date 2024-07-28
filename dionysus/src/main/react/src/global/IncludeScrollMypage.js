import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const WrapBackground = styled.div`
  width: auto;
  height: auto;
  //x축 스크롤 히든
  overflow-x: hidden;
`;
const IncludeScrollMypage = () => {
  return (
    <WrapBackground>
      <Background backbtn={true} scroll={true} opacityisTrue={false}>
        <Header scrollexist={true} />
        {/* 중첩라우터의 하위 라우터가 위치하는 부분 */}
        <Outlet />
      </Background>
    </WrapBackground>
  );
};

export default IncludeScrollMypage;
