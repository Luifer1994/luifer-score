import{ac as r,ad as o,ae as n}from"./index-COcRXUGD.js";const c=r("countryStore",{state:()=>({countries:localStorage.getItem("countries")?JSON.parse(localStorage.getItem("countries")||"[]"):[]}),getters:{},actions:{setCountries(e){this.countries=e,localStorage.setItem("countries",JSON.stringify(e))}}}),u=async()=>await o.request({url:"/countries",method:"GET"}),a=async()=>{try{return await u()}catch(e){return e}},l=()=>{const e=c(),{countries:t}=n(e);return{countries:t,getCountries:async()=>{if(t.value.length)return;const s=await a();s.errors.length?e.setCountries([]):e.setCountries(s.response)}}};export{l as u};