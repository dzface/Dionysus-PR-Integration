import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCheckComponent = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const session_id = sessionStorage.getItem("user_id");
    if (session_id == null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      console.log("로그인 중");
    }
  }, [navigate]);

  return null; // 컴포넌트는 아무것도 렌더링하지 않음
}

export default LoginCheckComponent;
