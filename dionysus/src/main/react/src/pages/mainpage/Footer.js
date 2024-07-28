import styled from "styled-components";
import { Link } from "react-router-dom";
import naverblog from "../../img/mainpageimg/details/naverblog-icon.png";
import instargram from "../../img/mainpageimg/details/instargram-icon.png";
import facebook from "../../img/mainpageimg/details/facebook-icon.png";
import youtube from "../../img/mainpageimg/details/youtube-icon.png";
import telicon from "../../img/mainpageimg/details/tel-icon.png";
//Footer StyledComponent
const FooterBody = styled.footer`
  width: 100vw;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  display: flex;
  bottom: 0;
  @media (max-width: 700px) {
    height: 35vh;
    flex-direction: column;
  }
  /* display: none; */
  .partition1 {
    width: calc(75vw-200px);
    height: 20vh;
    border: none;
    display: flex;
    flex-direction: column;
    @media (max-width: 494px) {
      height: 13vh;
    }
    & > .footeritem:nth-child(1) {
      width: 75vw;
      height: 6vh;
      border: none;
      display: flex;
      @media (max-width: 900px) {
        display: none;
      }
    }
    & > .footeritem:nth-child(2) {
      width: 74vw;
      height: 14vh;
      border: none;
      font-size: 13px;
      line-height: 11px;
      margin-left: 1vw;
      padding-top: 10px;
      @media (max-width: 494px) {
        width: 100vw;
      }
      & > .textdetail {
        height: 40px;
        @media (max-width: 981px) {
          height: 20px;
        }
      }
      & > .textdetail2 {
        height: 20px;
        @media (max-width: 981px) {
          height: 50px;
        }
        & > .textdetail3 {
          height: 50px;
          @media (max-width: 915px) {
            height: 20px;
          }
          @media (max-width: 981px) {
            height: 40px;
          }
        }
      }
      & > div {
        height: 14px;
        display: flex;
        font-size: 13px;
        line-height: 11px;
        @media (max-width: 981px) {
          height: 20px;
          display: flex;
          flex-direction: column;
        }
      }
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .partition2 {
    width: 360px;
    height: 20vh;
    border: none;
    margin-right: 10px;
    & > .icon {
      width: 23vw;
      height: 9vh;
      border: none;
      margin-left: 2vw;
      display: flex;
    }
    & > .tel {
      width: 360px;
      height: 11vh;
      border: none;
      display: flex;
      & > .telicon {
        width: 50px;
        height: 11vh;
        margin: 10px;
        margin-left: 20px;
        border: none;
      }
      & > .telimf {
        width: 245px;
        height: 11vh;
        border: none;
        & > .teltext {
          width: 245px;
          height: 4vh;
          font-size: 12px;
          margin-left: 2vw;
          color: white;
          border: none;
        }
        & > .telnumber {
          width: 245px;
          height: 1vh;
          font-size: 20px;
          display: flex;
          margin-left: 2vw;
          align-items: center;
          font-weight: bolder;
          color: white;
          border: none;
        }
      }
    }
  }
`;
//회사소개 등 값을 넣고 정렬하기 위한 StyledComponent
const FooterDiv = styled.div`
  width: 8vw;
  height: 6vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-right: 0.5px solid #ffffff;
  background-color: transparent;
  & > .footertext {
    font-size: 0.5;
  }
  @media (max-width: 1500px) {
    width: 135px;
  }
`;
const FooterLastDiv = styled.div`
  width: 10vw;
  height: 6vh;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: transparent;
  & > .footertext {
    font-size: 0.5;
  }
  @media (max-width: 1500px) {
    width: 145px;
  }
`;
//IconImg styledComponent
const IconImgDiv = styled.div`
  width: 58px;
  height: 9vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 46px;
    height: 73%;
    opacity: 0.85;
    border-radius: 20%;
  }
  .instargram {
    width: 65px;
    height: 100%;
    opacity: 0.85;
  }
  .youtube {
    width: 46px;
    height: 4.9vh;
    opacity: 0.85;
    margin-left: 9px;
  }
`;

const Footer = () => {
  return (
    <FooterBody>
      <div className="partition1">
        <div className="footeritem">
          <FooterDiv>
            <p className="footertext">회사소개</p>
          </FooterDiv>
          <FooterDiv>
            <p className="footertext">서비스안내</p>
          </FooterDiv>
          <FooterDiv>
            <p className="footertext">광고제휴안내</p>
          </FooterDiv>
          <FooterDiv>
            <p className="footertext">이용약관</p>
          </FooterDiv>
          <FooterLastDiv>
            <p className="footertext">개인정보처리방침</p>
          </FooterLastDiv>
        </div>
        <div className="footeritem">
          <div className="textdetail">
            <span>
              (주)디오니소스 대표이사: 이경섭 사업자등록번호:106-81-98868
            </span>
          </div>
          <div className="textdetail2">
            <div className="textdetail3">
              <span>주소: 서울시 용산구 한강대로 366, A동176호</span>
            </div>
            <div className="textdetail3">
              <span>개인정보관리 책임자: 박성진 청소년보호책임자: 김세호</span>
            </div>
            <div className="textdetail3">
              <span> 발행,편집인: 강인구</span>
            </div>
          </div>
          <div>
            <p>CopyrightⓒDIONYSUS.COM.All rights reserved since 2024</p>
          </div>
        </div>
      </div>
      <div className="partition2">
        <div className="icon">
          <IconImgDiv>
            <Link to="/">
              <img src={naverblog} alt="naverblog" />
            </Link>
          </IconImgDiv>
          <IconImgDiv>
            <Link to="/">
              <img src={instargram} alt="instargram" className="instargram" />
            </Link>
          </IconImgDiv>
          <IconImgDiv>
            <Link to="/">
              <img src={facebook} alt="facebook" />
            </Link>
          </IconImgDiv>
          <IconImgDiv>
            <Link to="/">
              <img src={youtube} alt="youtube" className="youtube" />
            </Link>
          </IconImgDiv>
        </div>
        <div className="tel">
          <div className="telicon">
            <img src={telicon} alt="telicon" />
          </div>
          <div className="telimf">
            <div className="teltext">
              <p>술 홍보/행사 문의</p>
            </div>
            <div className="telnumber">
              <p>02.8603.3487</p>
            </div>
          </div>
        </div>
      </div>
    </FooterBody>
  );
};

export default Footer;
