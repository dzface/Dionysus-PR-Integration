import ReCAPTCHA from "react-google-recaptcha"; // 구글 recapcha 인증 AIP 임포트 스타일임포트보다 위에 작성해야함
import styled from "styled-components";

//스타일
const StyledreCaptcha = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0;

  & > div {
    transform: scale(1);
    transform-origin: 0 0;
    height: 60px;

    @media (max-width: 700px) {
      transform: scale(0.7);
      margin-left: 100px;
    }
  }
`;
  // recapcha 컴포넌트
const ReCaptchaComponenet = ({ onVerify }) => {

  function onChange(value) {
    console.log("Captcha value:", value); // 인증 완료 후 토큰 값 콘솔에 출력
    onVerify(value); // 인증 완료 후 부모 컴포넌트에 값 전달
  }
  return (
    <StyledreCaptcha>
      <div>
        <ReCAPTCHA
          sitekey="6LcK--gpAAAAACjHDaPDC1j6X8H4jbap0sYP7HVe"
          onChange={onChange}
        />
      </div>
    </StyledreCaptcha>
  );
};
export default ReCaptchaComponenet;