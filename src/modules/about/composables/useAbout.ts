import { storeToRefs } from "pinia";
import { aboutStore } from "../store/aboutStore";
import { MyInfo } from "../types/aboutInterfaces";

export const useAbout = () => {
  const useAboutStore = aboutStore();

  const { myInfo } = storeToRefs(useAboutStore);

  const setMyInfo = (myInfo: MyInfo) => {
    useAboutStore.setMyInfo(myInfo);
  };

  return {
    myInfo,
    setMyInfo,
  };
};
