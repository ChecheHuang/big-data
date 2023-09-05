import axios from 'axios'

type Data = {
  responseCode: string
  responseMessage: string
  totalPage: string
  totalDataSize: string
  page: string
  pageDataSize: string
  responseData: ResponseData[]
}

type ResponseData = {
  //統計年
  statistic_yyy: string
  //區域別代碼
  district_code: string
  //區域別
  site_id: string
  //村里名稱
  village: string
  //共同生活戶_戶數
  household_ordinary_total: string
  //共同事業戶_戶數
  household_business_total: string
  //單獨生活戶_戶數
  household_single_total: string
  //共同生活戶_男
  household_ordinary_m: string
  //共同事業戶_男
  household_business_m: string
  //單獨生活戶_男
  household_single_m: string
  //共同生活戶_女
  household_ordinary_f: string
  //共同事業戶_女
  household_business_f: string
  //單獨生活戶_女
  household_single_f: string
}
export const getData = async (url: string) => {
  const res = await axios.get<Data>(url)
  return res.data.responseData
}
