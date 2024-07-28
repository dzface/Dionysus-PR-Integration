import styles from "../../style/mypagestyle/SignOut.module.css";
import BackButton from "../loginpage/BackButton";
import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");

const SignOut = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [user_jumin, setUser_jumin] = useState("");
  const [member, setMember] = useState([]);
  const [isMatching, setIsMatching] = useState(false);

  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [NullFailModalOpen, setNullFailModalOpen] = useState(false);
  const [MatchFailModalOpen, setMatchFailModalOpen] = useState(false);

  // 모달 핸들러
  const handleSuccessCloseModal = () => {
    setSuccessModalOpen(false);
    navigate("/");
    sessionStorage.clear();
  };
  const handleNullFailCloseModal = () => {
    setNullFailModalOpen(false);
  };
  const handleMatchFailCloseModal = () => {
    setMatchFailModalOpen(false);
  };

  useEffect(() => {
    const membersInfo = async () => {
      // 로컬스토리지에서 로그인한 사용자 정보 가져오기
      const loginUserEmail = sessionStorage.getItem("user_id");
      try {
        const rsp = await AxiosApi.memberSelect(loginUserEmail); // 회원 정보 가져오기
        setMember(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    membersInfo();
  }, []);

  useEffect(() => {
    const sessionUserName = sessionStorage.getItem("user_name");
    const sessionUserJumin = sessionStorage.getItem("user_jumin");

    if (user_name === sessionUserName && user_jumin === sessionUserJumin) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
  }, [user_name, user_jumin]);

  const memberDelete = async () => {
    try {
      const sessionUserName = sessionStorage.getItem("user_name");
      const sessionUserJumin = sessionStorage.getItem("user_jumin");
      if (!user_name || !user_jumin) {
        setNullFailModalOpen(true);
        return; // 입력 값이 없으면 함수 종료
      }

      if (isMatching) {
        const isMemberValid = await AxiosApi.memberCheck(user_name, user_jumin);
        if (isMemberValid) {
          await AxiosApi.memberDelete(user_name, user_jumin);
          setSuccessModalOpen(true); // Show success modal
        } else {
          alert("회원 정보를 확인하는 데 실패했습니다.");
        }
      } else {
        setMatchFailModalOpen(true);
        setIsMatching(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <BackButton />
          <p className={styles.title}>회원탈퇴</p>
          <div className={styles.imageItem}></div>
          <input
            type="text"
            placeholder="이름"
            onChange={(e) => setUser_name(e.target.value)}
          />
          <input
            type="text"
            placeholder="주민등록번호"
            onChange={(e) => setUser_jumin(e.target.value)}
          />
          <div className={styles.finalCheck} onClick={memberDelete}>
            탈퇴
          </div>
        </div>
      </div>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"회원 탈퇴 되었습니다."}
      />
      <ModalApi.FailModal
        isOpen={NullFailModalOpen}
        onClose={handleNullFailCloseModal}
        modalTitle={"회원 탈퇴 실패"}
        modalText={"이름과 주민번호를 입력해주세요."}
      />
      <ModalApi.FailModal
        isOpen={MatchFailModalOpen}
        onClose={handleMatchFailCloseModal}
        modalTitle={"회원 탈퇴 실패"}
        modalText={"이름과 주민번호가 일치하지 않습니다."}
      />
    </>
  );
};

export default SignOut;
