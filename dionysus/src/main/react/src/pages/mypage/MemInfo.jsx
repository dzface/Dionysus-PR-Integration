import BackButton from "../loginpage/BackButton";
import styled from "styled-components";
import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import LoginCheckComponent from "../loginpage/LoginCheckComponent";
import ReactModal from "react-modal";
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");

const Container = styled.div`
  width: 100%;
  display: flex; /* 부모 요소를 flex container로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto;
`;
const Box = styled.div`
  width: 580px;
  height: 100%;
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
    font-size: 25px;
    color: white;
    margin: 50px 0 20px 0;
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
  & .juminInput::placeholder {
    color: gray;
  }
  & .idInput::placeholder {
    color: gray;
  }

  & .finalCheck {
    width: 200px;
    height: 50px;
    line-height: 50px; /*텍스트 상하정렬*/
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
  }

  & span {
    color: red;
    font-weight: bold;
    font-size: 12px;
    margin-top: -24px;
    margin-bottom: 7px;
  }

  @media (max-width: 768px) {
    width: 400px;
    height: 480px;
    transition: 0.5s;

    .title {
      font-size: 25px;
      transition: 0.5s;
    }
    input {
      width: 60%;
      height: 30px;
      font-size: 16px;
      margin-bottom: 12px;
      transition: 0.5s;
      padding-left: 12px;
    }
    input::placeholder {
      font-size: 16px;
      transition: 0.5s;
    }

    .finalCheck {
      width: 150px;
      height: 40px;
      line-height: 36px;
      font-size: 16px;
      margin-top: 5px;
      transition: 0.5s;
    }
    span {
      color: red;
      font-weight: bold;
      font-size: 8px;
      margin-top: -9px;
      padding: 0;
      position: relative;
      margin-bottom: -2px;
    }
  }
`;

const MemInfo = () => {
  const [member, setMember] = useState("");
  const [user_id, setUser_id] = useState("");
  const [user_pw, setUser_pw] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [user_name, setUser_name] = useState("");
  const [user_nick, setUser_nick] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [user_address, setUser_address] = useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  // 기본상태 입력(숨김)
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const handleSuccessCloseModal = () => {
    setSuccessModalOpen(false);
    navigate("/mypage"); // Navigate to the home page or any other page
  };

  const navigate = useNavigate();

  // 처음 랜더링 때 회원 정보 가져오기
  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberSelect(
          sessionStorage.getItem("user_id")
        );
        setMember(rsp.data);
        setUser_id(rsp.data.user_id);
        setUser_pw(rsp.data.user_pw);
        setUser_name(rsp.data.user_name);
        setUser_nick(rsp.data.user_nick);
        setUser_phone(rsp.data.user_phone);
        setUser_address(rsp.data.user_address);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
  }, []);

  // 회원 정보 업데이트
  const handleSubmit = async () => {
    try {
      await AxiosApi.memberUpdate(
        user_pw,
        user_name,
        user_nick,
        user_phone,
        user_address,
        user_id
      );
      sessionStorage.setItem("user_pw", user_pw);
      sessionStorage.setItem("user_name", user_name);
      sessionStorage.setItem("user_nick", user_nick);
      sessionStorage.setItem("user_phone", user_phone);
      sessionStorage.setItem("user_address", user_address);
      setSuccessModalOpen(true); // Modal 띄우기
    } catch (e) {
      console.log(e);
    }
  };

  // 이름 바꾸기
  const onChangeName = (e) => {
    const newName = e.target.value;
    setUser_name(newName);
  };

  // 패스워드 바꾸기
  const onChangePw = (e) => {
    const newPw = e.target.value;
    setUser_pw(newPw);

    if (!newPw) {
      // 값을 입력하지 않았을 때 유효성 검사 하지 않음
      setPasswordError("");
      setUser_pw(member.newPw);
      setIsPassword(true);
      return; // 입력이 없으면 이후 코드 실행 안 함
    }
    // 비밀번호 검증 함수
    if (validatePassword(newPw)) {
      setPasswordError("");
      setIsPassword(true);
    } else {
      setPasswordError("영어와 숫자를 포함한 8글자 이상이어야 합니다.");
      setIsPassword(false);
    }
  };
  // 비밀번호 유효성 검증 함수(영어, 숫자 포함 8글자 이상)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // 닉네임 변경
  const onChangeNick = (e) => {
    const newNick = e.target.value;
    setUser_nick(newNick);
  };

  // 핸드폰번호 변경
  const onChangePhone = (e) => {
    const newPhone = e.target.value;
    // 하이픈을 입력 했을 때 제거하고 숫자만 남김
    const formattedPhone = newPhone.replace(/-/g, "");
    setUser_phone(member.user_phone);
    // 값을 입력하지 않았을 때 유효성 검사 하지 않음
    if (!newPhone) {
      setPhoneError("");
      setUser_phone(member.user_phone);
      setIsPhone(true);
      return;
    }
    // 핸드폰 번호 유효성 검사
    if (validatePhone(formattedPhone)) {
      setPhoneError("");
      setIsPhone(true);
    } else {
      setPhoneError("올바른 전화번호를 입력하세요.");
      setIsPhone(false);
      if (validatePhone(member.user_phone) == null) {
        setIsPhone(true);
      }
    }

    setUser_phone(formattedPhone);
  };
  // 전화번호 유효성 검사 함수
  const validatePhone = (phone) => {
    const regex = /^01[016789]\d{8}$/;
    return regex.test(phone);
  };

  // 주소 변경
  const onChangeAddress = (e) => {
    const newAdress = e.target.value;
    setUser_address(newAdress);
  };

  // 유효성 검사 비밀번호와 전화번호 둘 다 true
  const isFormValid = isPassword && isPhone;

  return (
    <>
      <Container>
        <LoginCheckComponent></LoginCheckComponent>
        <BackButton />
        <Box>
          <p className="title">정보수정</p>
          <input
            type="text"
            name="user_id"
            placeholder={member.user_id}
            disabled
            className="idInput"
          />

          <input
            type="text"
            name="user_pw"
            onChange={onChangePw}
            placeholder={member.user_pw}
            defaultValue={member.user_pw}
          />

          {passwordError && <span>{passwordError}</span>}
          <input
            type="text"
            name="user_name"
            onChange={onChangeName}
            placeholder={member.user_name}
            defaultValue={member.user_name}
          />
          <input
            type="text"
            name="user_jumin"
            placeholder={member.user_jumin}
            disabled
            className="juminInput"
          />
          <input
            type="text"
            name="user_nick"
            onChange={onChangeNick}
            placeholder={member.user_nick}
            defaultValue={member.user_nick}
          />
          <input
            type="text"
            name="user_phone"
            onChange={onChangePhone}
            placeholder={member.user_phone}
            defaultValue={member.user_phone}
          />
          {phoneError && <span>{phoneError}</span>}

          <input
            type="text"
            name="user_address"
            onChange={onChangeAddress}
            placeholder={member.user_address}
            defaultValue={member.user_address}
          />
          <div
            className="finalCheck"
            style={{
              cursor: isFormValid ? "pointer" : "not-allowed",
              backgroundColor: isFormValid ? "rgba(0, 0, 0, 0.6)" : "grey",
            }}
            onClick={isFormValid ? handleSubmit : null}
          >
            수정
          </div>
        </Box>
        <ModalApi.SuccessModal
          isOpen={SuccessModalOpen}
          onClose={handleSuccessCloseModal}
          modalTitle={"회원 정보 수정"}
          modalText={"수정되었습니다."}
        />
      </Container>
    </>
  );
};
export default MemInfo;
