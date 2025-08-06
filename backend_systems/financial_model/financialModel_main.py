from .financialModel_builder import FinancialModelBuilder
import csv


class FinancialModel(FinancialModelBuilder):
    """ This class provides the key features functions necessary for interacting with the
     financial model"""

    computed_model = None

    def compute_model(self) :
        """This method fully computes the remaining model after it has been inatilized
        rows

       :returns: Returns a nested dictionary containing the projected values"""

        # Initialize the model
        model = super().initialize_model()

        # Calculate subsequent years for incomplete columns
        for i in range(2, self.years_to_pay_init_cost + 1):
            model['monthly_rent_pybl'][i] = round(model['eoy_gcb_ownership'][i - 1] * model['monthly_rent_amt'][i], 4)
            model['annual_rent_pybl'][i] = round(model['monthly_rent_pybl'][i] * 12, 4)
            model['monthly_eqty_pymt'][i] = round(model['total_monthly_pymt'][i] - model['monthly_rent_pybl'][i], 4)
            model['total_annual_eqty_pymt'][i] = round(model['monthly_eqty_pymt'][i] * 12, 4)
            model['cum_total_eqty_paid'][i] = round(
                model['onetime_eqty_pymt'][i] + model['total_annual_eqty_pymt'][i] + model['cum_total_eqty_paid'][
                    i - 1],
                4)
            model['eoy_tnt_eqty_before_aqty'][i] = round(
                (model['cum_total_eqty_paid'][i] + model['cum_tnt_amt_from_gain'][i - 1]) / model['eoy_home_value'][i],
                4)
            model['notional_eqty_assign'][i] = round(
                (model['eoy_home_value'][i] - model['eoy_home_value'][i - 1]) * model['eoy_tnt_eqty_before_aqty'][i], 4)
            model['cum_tnt_amt_from_gain'][i] = round(
                model['notional_eqty_assign'][i] + model['cum_tnt_amt_from_gain'][i - 1], 4)
            model['eoy_subscriber_ownership'][i] = round(
                (model['cum_total_eqty_paid'][i] + model['cum_tnt_amt_from_gain'][i]) / model['eoy_home_value'][i], 4)
            model['eoy_gcb_ownership'][i] = round(1 - model['eoy_subscriber_ownership'][i], 4)
            model['gcb_value_in_home'][i] = round(model['eoy_gcb_ownership'][i] * model['eoy_home_value'][i], 4)
            model['eoy_roi'][i] = round(((model['total_annual_amt_paid'][i] + model['onetime_eqty_pymt'][i]) +
                                         (model['gcb_value_in_home'][i] - model['gcb_value_in_home'][i - 1])) /
                                        model['gcb_value_in_home'][i - 1], 4)

        # Store computed model as an instance variable
        self.computed_model = model

        return model

    def export_as_csv(self):
        """Allows the user to export the model as a CSV"""
        # TODO fix this

        filename = "computed_model.csv"
        data = self.computed_model

        if self.computed_model is not None:
            # Open the file in write mode
            with open(filename, mode='w', newline='') as file:
                writer = csv.writer(file)

                # Write the header
                writer.writerow(data.keys())

                # Write the rows
                rows = zip(*data.values())
                writer.writerows(rows)

        print('Log saved as CSV')
