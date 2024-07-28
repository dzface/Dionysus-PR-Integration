import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../global/UserStore";
import AxiosApi from "../../../api/AxiosApi";

const UseAlcoholList = () => {
  // context에서 category 불러오기
  const { category } = useContext(UserContext);

  // 알콜 리스트, 정렬 조건, 검색어 상태 변수 선언
  const [alcohols, setAlcohols] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 알콜 리스트를 비동기로 불러오는 함수
  const fetchAlcoholList = async () => {
    try {
      const sanitizedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, "");
      const response =
        sanitizedSearchTerm.trim() !== ""
          ? await AxiosApi.searchAlcohols(category, sanitizedSearchTerm)
          : await AxiosApi.alcoholSelect(category, sortBy);
      setAlcohols(response.data);
    } catch (error) {
      console.error("Failed to fetch alcohols:", error);
    }
  };

  // useEffect로 카테고리, 정렬 조건, 검색어가 변경될 때마다 fetchAlcoholList 실행
  useEffect(() => {
    fetchAlcoholList();
  }, [category, sortBy, searchTerm]);

  return { alcohols, sortBy, setSortBy, setSearchTerm, fetchAlcoholList };
};

export default UseAlcoholList;
