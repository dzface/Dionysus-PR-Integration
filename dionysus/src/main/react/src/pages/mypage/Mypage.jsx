import "../../style/mypagestyle/MypageStyle.scss";
import { Link, useNavigate } from "react-router-dom";
import ReviewItem from "./Common/ReviewItem";
import JjimItem from "./Common/JjimItem";
import ImageUploader from "../../firebase/profileupload/ImageUploader";
import styled from "styled-components";
import { useState } from "react";
import ReactModal from "react-modal";
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");

const ProfileDiv = styled.div`
  width: 130px;
  height: 130px;
  position: relative;

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .uploaded-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const JjimMore = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 14px;

  button {
    background: none;
    width: auto;
    height: auto;
  }
`;
const JjimMoreItem = styled.div`
  @keyframes gradientBackground {
    0% {
      background: rgba(82, 1, 32, 0.9);
    }
    20% {
      background: rgba(150, 43, 9, 0.9);
    }
    40% {
      background: rgba(181, 113, 20, 0.9);
    }
    60% {
      background: rgba(112, 101, 19, 0.9);
    }
    80% {
      background: rgba(8, 64, 62, 0.9);
    }
    100% {
      background: rgba(82, 1, 32, 0.9);
    }
  }
  position: absolute;
  border-radius: 10px;
  /* background-color: rgba(95, 95, 95); */
  width: 54%;
  height: 520px; /* 원하는 높이로 설정하세요 */
  overflow-y: scroll;
  margin-left: -24px;
  margin-top: -8px;
  padding: 0;
  z-index: 51;
  display: ${(props) => (props.jjimVisible ? "block" : "none")};
  animation: gradientBackground 15s infinite; /* 5초마다 색상이 자연스럽게 변경되도록 총 25초의 애니메이션 */
  transition: background 3s ease-in-out;
  @media screen and (max-width: 768px) {
    width: 400px;
    transition: 0.5s;
  }
`;
const ReviewMoreItem = styled.div`
  @keyframes gradientBackground {
    0% {
      background: rgba(82, 1, 32, 0.9);
    }
    20% {
      background: rgba(150, 43, 9, 0.9);
    }
    40% {
      background: rgba(181, 113, 20, 0.9);
    }
    60% {
      background: rgba(112, 101, 19, 0.9);
    }
    80% {
      background: rgba(8, 64, 62, 0.9);
    }
    100% {
      background: rgba(82, 1, 32, 0.9);
    }
  }
  position: absolute;
  border-radius: 10px;
  background-color: rgba(95, 95, 95);
  width: 54%;
  height: 520px; /* 원하는 높이로 설정하세요 */
  overflow-y: scroll;
  margin-left: -24px;
  margin-top: -8px;
  padding: 0;
  z-index: 51;
  display: ${(props) => (props.reviewVisible ? "block" : "none")};
  animation: gradientBackground 15s infinite; /* 5초마다 색상이 자연스럽게 변경되도록 총 25초의 애니메이션 */
  transition: background 3s ease-in-out;
  @media screen and (max-width: 768px) {
    width: 400px;
    transition: 0.5s;
  }
`;
const ReviewMore = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 14px;

  button {
    background: none;
    width: auto;
    height: auto;
  }
`;
const ExitBtn = styled.div`
  display: flex;
  justify-content: right;
  font-weight: 1000;
  :hover {
    color: black;
  }
`;
const Mypage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const profileurl = sessionStorage.getItem("profile_url");
  const [jjimVisible, setJjimVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  // 모달 기본상태 입력(숨김)
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const logout = () => {
    // 로그아웃 모달
    setSuccessModalOpen(true); // Show success modal
  };

  const handleSuccessCloseModal = () => {
    setSuccessModalOpen(false);
    sessionStorage.clear();
    navigate("/"); // Navigate to the home page or any other page
  };
  //전화번호 하이픈 넣는 컴포넌트
  const PhoneNumberWithHyphen = ({ phoneNumber }) => {
    const formatPhoneNumber = (phoneNumber) => {
      phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-numeric characters
      if (phoneNumber.length === 11) {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (phoneNumber.length === 10) {
        if (phoneNumber.startsWith("02")) {
          return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
          return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      }
      return phoneNumber;
    };

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    return <p>전화번호: {formattedPhoneNumber}</p>;
  };

  // 찜, 리뷰 더보기 창 보여지게 하는 함수
  const toggleJjimVisibility = () => {
    setJjimVisible(!jjimVisible);
  };
  const toggleReviewVisibility = () => {
    setReviewVisible(!reviewVisible);
  };
  const toggleReviewExit = () => {
    setReviewVisible(!reviewVisible);
  };
  const toggleJjimExit = () => {
    setJjimVisible(!jjimVisible);
  };

  const userid = sessionStorage.getItem("user_id");
  const username = sessionStorage.getItem("user_name");
  return (
    <>
      <div>
        {/* <LoginCheckComponent> */}
        <div className="container">
          <div className="contents">
            <div className="mem">
              <div className="meminfo1">
                <div className="profile">
                  <div className="person">
                    <ProfileDiv>
                      <div className="img"></div>
                      {profileurl && (
                        <img
                          src={profileurl}
                          alt="uploaded"
                          className="uploaded-img"
                        />
                      )}
                      <ImageUploader setImageUrl={setImageUrl} />
                    </ProfileDiv>
                  </div>
                  <div className="nameAndBtn">
                    <p>
                      <span>{username}</span>님 반갑습니다!
                    </p>
                    <div className="btn">
                      <Link to="/MemInfo">
                        <button>정보수정</button>
                      </Link>
                      <Link to="/SignOut">
                        <button>회원탈퇴</button>
                      </Link>
                      <button onClick={logout}>로그아웃</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="meminfo2">
                <p>아이디 : {sessionStorage.getItem("user_id")}</p>
                <p>주소 : {sessionStorage.getItem("user_address")}</p>
                <PhoneNumberWithHyphen
                  phoneNumber={sessionStorage.getItem("user_phone")}
                />
              </div>
            </div>
            <hr />
            <JjimMore>
              <JjimMoreItem jjimVisible={jjimVisible}>
                <JjimItem />
                <ExitBtn>
                  <button onClick={toggleJjimExit}>X 닫기</button>
                </ExitBtn>
              </JjimMoreItem>
              <ReviewMoreItem reviewVisible={reviewVisible}>
                <ReviewItem />
                <ExitBtn>
                  <button onClick={toggleReviewExit}>X 닫기</button>
                </ExitBtn>
              </ReviewMoreItem>
              <h2>찜 목록</h2>
              <button onClick={toggleJjimVisibility}>나의 찜 더보기 ▶</button>
            </JjimMore>
            <JjimItem isOne={true} />
            <hr />
            <ReviewMore>
              <h2>후기</h2>
              <button onClick={toggleReviewVisibility}>
                나의 리뷰 더보기 ▶
              </button>
            </ReviewMore>

            <ReviewItem isOne={true} />
          </div>
        </div>
        {/* </LoginCheckComponent> */}
      </div>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"로그아웃 되었습니다."}
      />
    </>
  );
};
// const JjimItem = () => <div>Jjim Item</div>;

export default Mypage;
