const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const decimal = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;

export const RegExHelper = {
  password,
  decimal,
};