import { useNavigate } from "react-router-dom";
import styles from "../../style/loginstyle/GlobalButton.module.css";

//전역 함수로 사용
const BackButton = () => {
  const navigate = useNavigate();
  return (
    // 뒤로 가기
    <p className={styles.backButton} onClick={() => navigate(-1)}>
      <span className={styles.underLine}></span>
    </p>
  );
};

export default BackButton;
