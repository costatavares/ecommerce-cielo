require('dotenv').config();
const headersRequest = {
  'Content-Type': 'application/json',
  'MerchantId': process.env.MERCHAN_ID,
  'MerchantKey': process.env.MERCHAN_KEY,
};

export const headersCielo =  { headers: headersRequest }
export const UrlSalesCielo = process.env.URL_SALES_CIELO;
export const ReturnUrlToCielo = process.env.RETURN_URL_TOCIELO;
export const UrlApiQuery = process.env.URL_API_QUERY;