const headersRequest = {
  'Content-Type': 'application/json',
  'MerchantId': `741d7df7-5ebb-43ed-9b44-e63708c0a0b4`,
  'MerchantKey': `CYFEVXBUYSYCIWEJGLVVNYVBYIGTBGGXTPRMUBMI`,
};

export const headersCielo =  { headers: headersRequest }
export const UrlSalesCielo = process.env.URL_SALES_CIELO;
export const ReturnUrlToCielo = process.env.RETURN_URL_TOCIELO;
export const UrlApiQuery = process.env.URL_API_QUERY;