import { defineStore } from "pinia";
import { MyInfo } from "../types/aboutInterfaces";

export const aboutStore = defineStore("aboutStore", {
  state: () => ({
    myInfo :localStorage.getItem('myInfo') ? JSON.parse(localStorage.getItem('myInfo') || '{}') : ({} as MyInfo),
  }),
 
  actions: {
    setMyInfo(myInfo: MyInfo) {
      this.myInfo = myInfo;
      localStorage.setItem('myInfo', JSON.stringify(myInfo));
    }
  },
});
