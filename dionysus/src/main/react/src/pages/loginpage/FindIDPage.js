import { useState } from "react";
import styled from "styled-components";
import findglass from "../../img/loginpageimg/findglass.png";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");

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
    margin: 20px;
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
      margin: 20px 0 20px 0;
      transition: 0.5s;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 10px 0 50px 0;
      transition: 0.5s;
    }
    input {
      width: 60%;
      height: 30px;
      font-size: 16px;
      margin-bottom: 22px;
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
      margin-top: 6px;
      transition: 0.5s;
    }
  }
`;

const FindIDPage = () => {
  const navigate = useNavigate();
  // 입력단
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  //유효성 검사단
  const [isUserName, setIsUserName] = useState(false);
  const [isJumin, setIsJumin] = useState(false);
  //오류 메시지
  const [userNameError, setUserNameError] = useState("");
  const [juminError, setJuminError] = useState("");
  // 찾기결과 출력단
  const [userId, setUserId] = useState("");
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

  // 아이디찾기 버튼 이벤트 및 결과 출력
  const findIdButton = async (e) => {
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value;
    try {
      const showUserId = await AxiosApi.findIdResult(userName, jumin);
      setUserId(showUserId);
      if (showUserId === "") {
        setFailModalOpen(true);
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setSuccessModalOpen(true);
      }
      // console.log(showUserId);
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
        switch (error.response.status) {
          case 400:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            break;
          case 401:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
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
  // 오류메시지 로직 단
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    const userNameRegex = /^[가-힣]{1,5}$/;
    if (!userNameRegex.test(e.target.value)) {
      setUserNameError("입력값이 올바르지 않습니다. (한글 5글자 이하)");
      setIsUserName(false);
    } else {
      setUserNameError("✔️");
      setIsUserName(true);
    }
  };
  const onChangeJumin = (e) => {
    setJumin(e.target.value);
    const juminRegex = /^\d{13}$/; // 주민등록번호 입력 정규식
    if (!juminRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setJuminError("입력값이 올바르지 않습니다.(- 없이 숫자 13자리)");
      setIsJumin(false);
    } else {
      setJuminError("✔️");
      setIsJumin(true);
    }
  };
  return (
    <Container>
      <Box>
        <BackButton />
        <p className="title">아이디 찾기</p>
        <img src={findglass}></img>
        <input
          type="text"
          id="user_name"
          placeholder="이름"
          onChange={onChangeUserName}
        />
        <span id="hint">
          {userName.length > 0 && (
            <span className={isUserName ? "success" : "error"}>
              {userNameError}
            </span>
          )}
        </span>
        <input
          type="text"
          id="jumin"
          placeholder="주민등록번호"
          onChange={onChangeJumin}
        />
        <span id="hint">
          {jumin.length > 0 && (
            <span className={isJumin ? "success" : "error"}>{juminError}</span>
          )}
        </span>
        <div id="caution" className="caution"></div>
        <div
          className="finalCheck"
          onClick={findIdButton}
          style={{
            disable: isUserName && isJumin ? "false" : "true",
            backgroundColor:
              isUserName && isJumin ? "rgba(0, 0, 0, 0.6)" : "grey",
          }}
        >
          찾기
        </div>
      </Box>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"아이디 찾기 결과"}
        modalText={`아이디는 ${userId} 입니다.`}
      />
      <ModalApi.FailModal
        isOpen={FailModalOpen}
        onClose={handleFailCloseModal}
        modalTitle={"아이디 찾기 실패"}
        modalText={modalContent}
      />
    </Container>
  );
};
export default FindIDPage;
