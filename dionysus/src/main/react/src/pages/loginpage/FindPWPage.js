import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import findkey from "../../img/loginpageimg/findkey.png";
import BackButton from "./BackButton";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");
//스타일 부분
//스타일 부분
const Container = styled.div`
  width: 100%;
  display: flex; /* 부모 요소를 flex container로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto;
`;
const Box = styled.div`
  width: 580px;
  height: 691px;
  padding: 20px;
  display: flex; /* 자식 요소들을 flex container로 설정 */
  flex-direction: column; /* 자식 요소들을 세로 방향으로 배열 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  text-align: center;
  background: conic-gradient(
    rgba(82, 1, 32, 0.6) 0%,
    rgba(150, 43, 9, 0.6) 20%,
    rgba(181, 113, 20, 0.6) 40%,
    rgba(8, 64, 62, 0.6) 60%,
    rgba(112, 101, 19, 0.6) 80%,
    rgba(82, 1, 32, 0.6) 100%
  );
  border-radius: 10px;

  & .title {
    font-size: 30px;
    color: white;
    margin-bottom: 20px;
  }
  & img {
    width: 150px;
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 20px 0;
  }

  & input {
    width: 60%;
    height: 40px;
    font-size: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 20px;
    padding-left: 30px;
    margin-bottom: 30px; /* 원하는 마진 값으로 설정 */
  }
  & input::placeholder {
    font-size: 20px;
    color: rgb(250, 250, 250);
    padding-left: 0;
  }
  & #hint {
    position: relative;
    width: 1000px;
    color: #999;
    bottom: 3vh;
    display: flex;
    justify-content: center;
  }
  & .success {
    position: absolute;
    left: 660px;
    bottom: 5px;
    font-size: 30px;
  }
  & .error {
    position: absolute;
    width: auto;
    font-size: 12px;
    font-weight: bold;
    color: rgb(255, 255, 255);
  }
  & .caution {
    font-size: 15px;
    position: relative;
  }
  & .finalCheck {
    width: 200px;
    height: 50px;
    line-height: 50px; /*텍스트 상하정렬*/
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 400px;
    height: 480px;
    transition: 0.5s;
    .title {
      font-size: 25px;
      transition: 0.5s;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 0 0 30px 0;
      transition: 0.5s;
    }
    input {
      width: 60%;
      height: 30px;
      font-size: 16px;
      margin-bottom: 15px;
      transition: 0.5s;
    }

    input::placeholder {
      font-size: 16px;
      transition: 0.5s;
    }
    .error {
      margin-top: 15px;
      font-size: 8px;
    }
    .success {
      left: 608px;
      bottom: -10px;
      font-size: 22px;
    }

    .finalCheck {
      width: 150px;
      height: 40px;
      line-height: 36px;
      font-size: 16px;
      margin-top: 5px;
      transition: 0.5s;
    }
  }
`;

const FindPWPage = () => {
  const navigate = useNavigate();
  // 입력단
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  // 모달 내용
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [FailModalOpen, setFailModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleSuccessCloseModal = () => {
    //모달 닫은 이후 핸들링
    setSuccessModalOpen(false);
    navigate("/login");
  };
  const handleFailCloseModal = () => {
    setFailModalOpen(false);
  };

  // 오류메시지 로직 단
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };
  const onChangeJumin = (e) => {
    setJumin(e.target.value);
    console.log(jumin);
  };

  // 찾기 결과 출력단
  const [userPw, setUserPw] = useState("");

  // 비번찾기버튼 이벤트 처리 및 결과 출력
  const findPwButton = async (e) => {
    const input_email = document.getElementById("email").value;
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value;

    try {
      const showUserPw = await AxiosApi.findPwResult(email, userName, jumin);
      setUserPw(showUserPw);
      if (showUserPw === "") {
        setFailModalOpen(true);
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setSuccessModalOpen(true);
      }
      console.log(showUserPw);
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
        switch (error.response.status) {
          case 400:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            break;
          case 401:
            setModalContent(
              <>
                인증에 실패했습니다.
                <br />
                자격인증 없음
              </>
            );
            console.log();
            break;
          case 403:
            setModalContent("접근 권한이 없습니다.");
            break;
          case 404:
            setModalContent("서버를 찾을 수 없습니다.");
            break;
          case 500:
            setModalContent(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            break;
          default:
            setModalContent(
              `오류가 발생했습니다: ${error.response.statusText}`
            );
        }
      } else if (error.request) {
        // 요청이 서버에 도달하지 못한 경우 (네트워크 오류 등)
        setModalContent("서버가 응답하지 않습니다.");
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        setModalContent(`오류가 발생했습니다: ${error.message}`);
      }
      setFailModalOpen(true);
    }
  };

  return (
    <Container>
      <Box>
        <BackButton />
        <p className="title">비밀번호 찾기</p>
        <img src={findkey} />
        <input
          id="email"
          type="text"
          placeholder="이메일"
          onChange={onChangeEmail}
        />
        <input
          id="user_name"
          type="text"
          placeholder="이름"
          onChange={onChangeUserName}
        />
        <input
          id="jumin"
          type="text"
          placeholder="주민등록번호"
          onChange={onChangeJumin}
        />
        <div className="finalCheck" onClick={findPwButton}>
          찾기
        </div>
      </Box>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"비밀번호 찾기 결과"}
        modalText={`비밀번호는 ${userPw} 입니다.`}
      />
      <ModalApi.FailModal
        isOpen={FailModalOpen}
        onClose={handleFailCloseModal}
        modalTitle={"비밀번호 찾기 실패"}
        modalText={modalContent}
      />
    </Container>
  );
};
export default FindPWPage;
