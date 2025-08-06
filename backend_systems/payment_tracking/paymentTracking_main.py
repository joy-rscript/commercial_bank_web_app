from collections import defaultdict
from datetime import datetime

from coreapp.backend_systems.financial_model.financialModel_main import FinancialModel
from ...models import PropertyPenaltyTracker, PropertyPaymentTracker, UserFinancialModel


class PaymentTracker:
    def __init__(self, payment_tracker: PropertyPaymentTracker, financial_model: FinancialModel, penalty_tracker: PropertyPenaltyTracker):
        self.penalty_tracker = penalty_tracker
        self.payment_tracker = payment_tracker
        self.last_paid_date_equity = payment_tracker.last_paid_date_equity
        self.last_paid_date_rent = payment_tracker.last_paid_date_rent
        self.financial_model = financial_model
        self.current_date = datetime.now()

    def process_payment(self, amount):
        current_month = self.current_date.month
        current_year = self.current_date.year
        last_paid_date = self.payment_tracker.last_paid_date_rent

        amount_left, amount_towards_penalty = self.resolve_pending_penalties(amount)
        amount_towards_equity = 0
        amount_towards_rent = 0
        if amount_left > 0:
            amount_left, amount_towards_rent, amount_towards_equity = self.process_pending_payments(amount_left)
            print("changee", amount_left)

        if amount_left > 0:
            self.process_onetime_payment(amount_left)
            amount_towards_equity += amount_left
            pass
        return {
            "penalty_amount": round(amount_towards_penalty, 2),            
            "equity_amount": round(amount_towards_equity,2),
            "rent_amount": round(amount_towards_rent,2)
        }

    def resolve_pending_penalties(self, amount):
        total_paid = 0 

        if self.penalty_tracker:
            for penalty in [p for p in self.penalty_tracker.late_penalty_collection if p.status < 1]:
                print(penalty)
                remaining = penalty.amount - (penalty.status * penalty.amount)
                payment = min(remaining, amount)
                penalty.status += payment / penalty.amount
                if penalty.status >= 1:
                    penalty.status = 1
                    penalty.date_resolved = datetime.now()
                total_paid += payment 
                amount -= payment  
                penalty.save()

                if amount <= 0:
                    break 
    
        return amount, total_paid  

    def getNumMonthsInArrears(self):
        months_arrears = 12 * (self.current_date.year - self.last_paid_date_rent.year) + (self.current_date.month - self.last_paid_date_rent.month)
        return months_arrears

    def process_pending_payments(self, amount):
        amt_towards_eqt = 0
        amt_towards_rent = 0

        while amount > 0 and self.getNumMonthsInArrears() >= 0:
            next_month_to_be_paid_rent = (self.last_paid_date_rent.month % 12) + 1
            next_month_to_be_paid_eqt = (self.last_paid_date_equity.month % 12) + 1
            next_year_to_be_paid_rent = self.last_paid_date_rent.year + 1 if next_month_to_be_paid_rent == 1 else self.last_paid_date_rent.year
            next_year_to_be_paid_eqt = self.last_paid_date_equity.year + 1 if next_month_to_be_paid_eqt == 1 else self.last_paid_date_equity.year
            current_rent_month = self.payment_tracker.rent_progress.get(str(next_year_to_be_paid_rent), {}).get(str(next_month_to_be_paid_rent), {})
            rent_pymt_left = current_rent_month["amount_to_be_paid"] - current_rent_month['amount_paid']
            current_rent_month['amount_paid'] += min(amount, rent_pymt_left)
            amt_towards_rent += min(amount, rent_pymt_left)
            if amount >= rent_pymt_left:
                self.last_paid_date_rent = self.last_paid_date_rent.replace(month=next_month_to_be_paid_rent)
                if next_month_to_be_paid_rent == 1:
                    self.last_paid_date_rent = self.last_paid_date_rent.replace(year=next_year_to_be_paid_rent)

            amount = max(amount - rent_pymt_left, 0)
            current_eqt_month = self.payment_tracker.equity_progress.get(str(next_year_to_be_paid_eqt), {}).get(str(next_month_to_be_paid_eqt), {})
            eqt_pymt_left = current_eqt_month['amount_to_be_paid'] - current_eqt_month['amount_paid']
            current_eqt_month['amount_paid'] += min(amount, eqt_pymt_left)
            amt_towards_eqt += min(amount, eqt_pymt_left)
            if amount >= eqt_pymt_left:
                self.last_paid_date_equity = self.last_paid_date_equity.replace(month=next_month_to_be_paid_eqt)
                if next_month_to_be_paid_eqt == 1:
                    self.last_paid_date_equity = self.last_paid_date_equity.replace(year=next_year_to_be_paid_eqt)
            self.payment_tracker.total_equity += amt_towards_eqt
            amount = max(0, amount - eqt_pymt_left)
           
        self.payment_tracker.last_paid_date_equity = self.last_paid_date_equity
        self.payment_tracker.last_paid_date_rent = self.last_paid_date_rent
        self.payment_tracker.save()
        return amount, amt_towards_rent, amt_towards_eqt

    def process_onetime_payment(self, amount):
        # change financial model
        # 
        # financial_model.save()
        # updatee the tracker onlyupdat months after the last payment, to hav thee nw finacialModel valuees

#         for key,value in self.financial_model["projected_total_annual_equity_pymt"].items():
#             yr = int(key) + 1
#             for month in self.payment_tracker.equity_progress[yr]:
#                 self.payment_tracker.equity_progress[yr][month]['amount_to_be_paid'] = value    
        # for key,value in self.financial_model["projected_total_annual_equity_pymt"].items():
        #     yr = int(key) + 1
        #     for month in self.payment_tracker.equity_progress[yr]:
        #         self.payment_tracker.equity_progress[yr][month]['amount_to_be_paid'] = value    

#         self.payment_tracker.total_equity += amount
        self.payment_tracker.total_equity += amount
        self.payment_tracker.save()

        return True
    # def compute_revenue(self, start_date, end_date):
    #     start_date = datetime.strptime(start_date, "%Y-%m-%d")
    #     end_date = datetime.strptime(end_date, "%Y-%m-%d")

    #     total_revenue = 0
    #     outstanding_payments = []

    #     for year in range(start_date.year, end_date.year + 1):
    #         start_month = 1 if year > start_date.year else start_date.month
    #         end_month = 12 if year < end_date.year else end_date.month

    #         for month in range(start_month, end_month + 1):
    #             if year == self.payment_tracker.start_date.year and month < self.payment_tracker.start_date.month:
    #                 continue
    #             if year > self.current_date.year or (year == self.current_date.year and month > self.current_date.month):
    #                 continue

    #             equity_payment = self.payment_tracker.equity_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})
    #             rent_payment = self.payment_tracker.rent_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})

    #             total_revenue += equity_payment["amount_paid"] + rent_payment["amount_paid"]

    #             if equity_payment["amount_paid"] < equity_payment["amount_to_be_paid"]:
    #                 outstanding_payments.append({"year": year, "month": month, "type": "equity", "outstanding": equity_payment["amount_to_be_paid"] - equity_payment["amount_paid"]})
    #             if rent_payment["amount_paid"] < rent_payment["amount_to_be_paid"]:
    #                 outstanding_payments.append({"year": year, "month": month, "type": "rent", "outstanding": rent_payment["amount_to_be_paid"] - rent_payment["amount_paid"]})

    #     return {
    #         "total_revenue": total_revenue,
    #         "outstanding_payments": outstanding_payments
    #     }


    def compute_revenue(self, start_date, end_date):
        start_date = datetime.strptime(start_date, "%Y-%m-%d")
        end_date = datetime.strptime(end_date, "%Y-%m-%d")
        total_revenue = 0
        outstanding_payments = []
        for year in range(start_date.year, end_date.year + 1):
            print(year, self.payment_tracker.start_date.year, self.current_date.year)
            start_month = 1 if year > start_date.year else start_date.month
            end_month = 12 if year < end_date.year else end_date.month

            for month in range(start_month, end_month + 1):
                if year == self.payment_tracker.start_date.year and month < self.payment_tracker.start_date.month:
                    continue
               
                equity_payment = self.payment_tracker.equity_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})
                rent_payment = self.payment_tracker.rent_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})
                total_revenue += equity_payment["amount_paid"] + rent_payment["amount_paid"]

                if equity_payment["amount_paid"] < equity_payment["amount_to_be_paid"]:
                    outstanding_payments.append({"year": year, "month": month, "type": "equity", "outstanding": equity_payment["amount_to_be_paid"] - equity_payment["amount_paid"]})
                if rent_payment["amount_paid"] < rent_payment["amount_to_be_paid"]:
                    outstanding_payments.append({"year": year, "month": month, "type": "rent", "outstanding": rent_payment["amount_to_be_paid"] - rent_payment["amount_paid"]})
                
        return {
            "total_revenue": total_revenue,
            "outstanding_payments": outstanding_payments
        }
    
    def monthly_payments_info(self):
        total_arrears = 0
        next_month_payment_rent = 0
        next_month_payment_equity = 0
        end_of_year_rentals = 0
        end_of_year_equity = 0

        # Calculate total arrears up to current date
        for year in range(self.payment_tracker.start_date.year, self.current_date.year + 1):
            start_month = 1 if year > self.payment_tracker.start_date.year else self.payment_tracker.start_date.month
            end_month = 12 if year < self.current_date.year else self.current_date.month

            for month in range(start_month, end_month + 1):
                equity_payment = self.payment_tracker.equity_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})
                rent_payment = self.payment_tracker.rent_progress.get(str(year), {}).get(str(month), {"amount_paid": 0, "amount_to_be_paid": 0})

                total_arrears += (equity_payment["amount_to_be_paid"] - equity_payment["amount_paid"])
                total_arrears += (rent_payment["amount_to_be_paid"] - rent_payment["amount_paid"])

        # Determine the next month's payment
        next_month_to_be_paid_rent = (self.last_paid_date_rent.month % 12) + 1
        next_month_to_be_paid_eqt = (self.last_paid_date_equity.month % 12) + 1
        next_year_to_be_paid_rent = self.last_paid_date_rent.year + 1 if next_month_to_be_paid_rent == 1 else self.last_paid_date_rent.year
        next_year_to_be_paid_eqt = self.last_paid_date_equity.year + 1 if next_month_to_be_paid_eqt == 1 else self.last_paid_date_equity.year

        next_month_payment_rent = self.payment_tracker.rent_progress.get(str(next_year_to_be_paid_rent), {}).get(str(next_month_to_be_paid_rent), {}).get("amount_to_be_paid", 0)
        next_month_payment_equity = self.payment_tracker.equity_progress.get(str(next_year_to_be_paid_eqt), {}).get(str(next_month_to_be_paid_eqt), {}).get("amount_to_be_paid", 0)

        # fin model expected end of year equity and rentals
        start_year_index = self.payment_tracker.start_date.year
        current_year_index = self.current_date.year - start_year_index + 1
        end_of_year_rentals = self.financial_model['annual_rent_pybl'].get(current_year_index, 0)
        end_of_year_equity = self.financial_model['total_annual_eqty_pymt'].get(current_year_index, 0)
        
        return {
            "total_arrears": total_arrears,
            "next_month_payment_rent": next_month_payment_rent,
            "next_month_payment_equity": next_month_payment_equity,
            "end_of_year_rentals": end_of_year_rentals,
            "end_of_year_equity": end_of_year_equity
        }


    def equity_cumm_detail(self):
        year_index = (self.current_date.year - self.payment_tracker.start_date.year) + 1
        base_equity = self.payment_tracker.total_equity
        monthly_eqty_pymt = int(self.financial_model['monthly_eqty_pymt'][year_index])
        ratio = round(base_equity/self.financial_model['eoy_home_value'][year_index],2)
        cumulative_equity = {}
        current_total_equity = 0

        for month in range(1, 13):
            if self.payment_tracker.start_date.year == self.current_date.year and month < self.payment_tracker.start_date.month :
                cumulative_equity[month] = 0
            elif month == self.last_paid_date_equity.month:
                current_total_equity += (base_equity - current_total_equity) 
                cumulative_equity[month] = current_total_equity
            elif month < self.last_paid_date_equity.month:
                current_total_equity +=monthly_eqty_pymt
                cumulative_equity[month] = current_total_equity
            else:
                # Calculate future equity payments
                current_total_equity += monthly_eqty_pymt
                cumulative_equity[month] = current_total_equity
        equity_info = {
            "cumulative_equity" : cumulative_equity,
            "total_equity" : base_equity,
            "equity_ratio": ratio
        }
        
        return equity_info
