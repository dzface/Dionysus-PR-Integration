import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";
import ListItem from "../../categorypage/Common/ListItem";

const ReviewItem = ({ isOne = false, isReview = true }) => {
  const [alcohol1, setAlcohol1] = useState([]);

  const reviewAlcoholInfo = async () => {
    try {
      const userid = sessionStorage.getItem("user_id");
      const rsp = await AxiosApi.alcoholreviewlist(userid); // 리뷰 술 정보 가져오기
      setAlcohol1(rsp.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    reviewAlcoholInfo();
  }, []);

  return (
    <>
      <ListItem
        alcohols={alcohol1}
        alcoholList={reviewAlcoholInfo}
        reviewinput={false}
        isOne={isOne}
        isReview={isReview}
        firstreview={true}
        reviewmore={true}
      />
    </>
  );
};

export default ReviewItem;
