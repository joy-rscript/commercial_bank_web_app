# from financialModel_main import FinancialModel
import os
import sys


project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../'))
sys.path.append(project_path)
from coreapp.backend_systems.financial_model.financialModel_main import FinancialModel
from althomeownership.coreapp.backend_systems.financial_model.financialModel_main import FinancialModel
import time
from dev_tools import dev_tools as dev

#
# # Create 10 instances of FinancialModel with varying values
# models = [
#     FinancialModel(300000.0, 0.08, 0.20, 0.03, 0.04, 15, 0.01, 0.02),
#     FinancialModel(350000.0, 0.07, 0.15, 0.04, 0.05, 20, 0.02, 0.03),
#     FinancialModel(400000.0, 0.06, 0.25, 0.05, 0.06, 15, 0.03, 0.01),
#     FinancialModel(450000.0, 0.05, 0.10, 0.06, 0.07, 12, 0.04, 0.02),
#     FinancialModel(500000.0, 0.09, 0.20, 0.07, 0.08, 10, 0.00, 0.02),
#     FinancialModel(550000.0, 0.10, 0.15, 0.08, 0.09, 14, 0.01, 0.03),
#     FinancialModel(600000.0, 0.11, 0.10, 0.09, 0.10, 20, 0.02, 0.01),
#     FinancialModel(650000.0, 0.12, 0.25, 0.10, 0.11, 12, 0.03, 0.04),
#     FinancialModel(700000.0, 0.13, 0.20, 0.11, 0.12, 20, 0.04, 0.02),
#     FinancialModel(750000.0, 0.14, 0.15, 0.12, 0.13, 10, 0.00, 0.03)
# ]
#
# # Time each model's compute_model function across 1000 repetitions
# outputs = {}
# for i, model in enumerate(models):
#     # print(f"Model {i+1} ->", end=' ')
#     # output = dev.time_function(model.compute_model, True, 1000)
#


model = FinancialModel(
    cost_per_unit=304000.0,
    target_rental_yield=0.10,
    init_down_payment=0.10,
    annual_rent_increase=0.10,
    annual_home_value_increase=0.10,
    years_to_pay_init_cost=20,
    per_unit_markup_cost=0.0,
    annual_equity_pymt_increase = 0.0
)


output = dev.time_function(model.compute_model, True, 200)
print()

for k,v in output.items():
    print(k,v)
