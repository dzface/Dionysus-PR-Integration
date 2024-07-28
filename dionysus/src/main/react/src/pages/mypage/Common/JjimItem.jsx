import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";
import ListItem from "../../categorypage/Common/ListItem";

const JjimItem = ({ isOne = false, isReview = true }) => {
  const [alcohol1, setAlcohol1] = useState([]);

  const jjimAlcoholInfo = async () => {
    try {
      const userid = sessionStorage.getItem("user_id");
      const rsp = await AxiosApi.jjimAlcohol(userid); // 찜한 술 정보 가져오기
      setAlcohol1(rsp.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    jjimAlcoholInfo();
  }, []);

  return (
    <>
      <ListItem
        alcohols={alcohol1}
        alcoholList={jjimAlcoholInfo}
        isOne={isOne}
        reviewinput={false}
        isReview={isReview}
        firstreview={true}
        reviewmore={true}
      />
    </>
  );
};

export default JjimItem;
