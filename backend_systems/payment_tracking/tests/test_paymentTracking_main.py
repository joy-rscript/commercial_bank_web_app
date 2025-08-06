from coreapp.models import PropertyPaymentTracker, PropertyPenaltyTracker, UserFinancialModel
from coreapp.backend_systems.payment_tracking.paymentTracking_main import PaymentTracker
from coreapp.backend_systems.financial_model.financialModel_main import FinancialModel
from datetime import datetime, date
import os
import sys
import django

project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../'))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'althomeownership.settings'
# Setup Django
django.setup()

def setup_test_environment():
    # Initialize FinancialModel
    finModelObj = FinancialModel(
        cost_per_unit=304000.0,
        target_rental_yield=0.10,
        init_down_payment=0.10,
        annual_rent_increase=0.10,
        annual_home_value_increase=0.10,
        years_to_pay_init_cost=20,
        per_unit_markup_cost=0.0,
        annual_equity_pymt_increase=0.0
    )
    finModel = finModelObj.compute_model()

    # Set up date-related variables
    date_now = datetime.now()
    last_date_paid = date_now.replace(month=(12 if date_now.month - 1 < 1 else date_now.month - 1),
                                      year=(date_now.year - 1 if date_now.month - 1 < 1 else date_now.year))

    # Create dictionaries to store progress of payments for rent and equity
    equity_progress = {year: {month: {'amount_to_be_paid': 0, 'amount_paid': 0} for month in range(1, 13)} for year in range(date_now.year, date_now.year + 21)}
    rent_progress = {year: {month: {'amount_to_be_paid': 0, 'amount_paid': 0} for month in range(1, 13)} for year in range(date_now.year, date_now.year + 21)}

    for y_indx, rent in finModel['monthly_rent_pybl'].items():
        for i in range(1, 13):
            rent_progress[date_now.year + y_indx][i] = {'amount_to_be_paid': rent, 'amount_paid': 0}

    for y_indx, eqty in finModel['monthly_eqty_pymt'].items():
        for i in range(1, 13):
            equity_progress[date_now.year + y_indx - 1][i] = {'amount_to_be_paid': eqty, 'amount_paid': 0}

    # Initialize PaymentTracker and PenaltyTracker
    tracker = PropertyPaymentTracker(
        last_paid_date_rent=last_date_paid,
        last_paid_date_equity=last_date_paid,
        start_date=date_now,
        equity_progress=equity_progress,
        rent_progress=rent_progress,
        total_equity=finModel['onetime_eqty_pymt'][1],
    )

    penalty = PropertyPenaltyTracker(late_penalty_collection={})

    return PaymentTracker(payment_tracker=tracker, financial_model=finModel, penalty_tracker=penalty)

def test_tenant_behind_on_payment():
    payment_tracking = setup_test_environment()
    print("Test: Tenant behind on payment")
    result = payment_tracking.process_payment(500)  # Assuming tenant is behind and makes a partial payment
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_payment_ahead_of_time():
    payment_tracking = setup_test_environment()
    print("Test: Payment made for 1 month ahead of time")
    result = payment_tracking.process_payment(1000)  # Assuming 1000 is enough to cover next month's rent
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_partial_payment():
    payment_tracking = setup_test_environment()
    print("Test: Partial payment not covering the expected amount for the month")
    result = payment_tracking.process_payment(300)  # Partial payment
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_excess_payment_to_equity():
    payment_tracking = setup_test_environment()
    print("Test: Payment is a lot, some goes to equity acquisition")
    result = payment_tracking.process_payment(2000)  # Excess payment
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_arrears_and_equity():
    payment_tracking = setup_test_environment()
    print("Test: Payment covers past arrears and there's enough for an equity payment")
    result = payment_tracking.process_payment(1500)  # Covers arrears and equity
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_payment_for_dec_and_jan():
    payment_tracking = setup_test_environment()
    print("Test: Payment made for December and January of the next year")
    result = payment_tracking.process_payment(2500)  # Covering December and January
    print(result)
    print("---------------------------------------------------------------------------------------")

def test_insufficient_funds():
    payment_tracking = setup_test_environment()
    print("Test: Not enough money to cover expected expense of the day")
    result = payment_tracking.process_payment(100)  # Insufficient payment
    print(result)
    print("---------------------------------------------------------------------------------------")

# Run the tests
print("Running tests for payment arrear...")
test_tenant_behind_on_payment()
print("Running tests for payment ahead of time...")
test_payment_ahead_of_time()
print("Running tests for payment partial...")
test_partial_payment()
print("Running tests for payment excess...")
test_excess_payment_to_equity()
print("Running tests for payment arrears and equity...")
test_arrears_and_equity()
print("Running tests for payment for dec and jan...")
test_payment_for_dec_and_jan()
print("Running tests for payment insufficient funds...")
test_insufficient_funds()