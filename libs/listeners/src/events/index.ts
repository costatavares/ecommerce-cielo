import { CieloSalesListener } from "../cielo/cielo-sales.listener";
import { CustomerPortfolioListener } from "../cielo/customer-portfolio.listener";
import { TransactionListener } from "../cielo/transaction.listener";


export const events = [
  CieloSalesListener,
  CustomerPortfolioListener,
  TransactionListener,

]