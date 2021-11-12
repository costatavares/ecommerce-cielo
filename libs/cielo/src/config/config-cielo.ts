const headersRequest = {
  'Content-Type': 'application/json',
  'MerchantId': `741d7df7-5ebb-43ed-9b44-e63708c0a0b4`,
  'MerchantKey': `CYFEVXBUYSYCIWEJGLVVNYVBYIGTBGGXTPRMUBMI`,
};

export const headersCielo =  { headers: headersRequest }
export const UrlSalesCielo = 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/';
export const ReturnUrlToCielo = "http://api.webhookinbox.com/i/HFOvhbPS/in/"