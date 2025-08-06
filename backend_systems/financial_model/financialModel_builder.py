# TODO Might not need to use a whoe class instead just check if value is float and between 0 and 1
# TODO Figure out how to decouple monthlyRentPayable, annualRentPayable

class FinancialModelBuilder:
    """ A class that builds the basic implements for the
       model that powers the RTO scheme"""

    def __init__(self, cost_per_unit: float,
                 target_rental_yield: float,
                 init_down_payment: float,
                 annual_rent_increase: float,
                 annual_home_value_increase: float,
                 years_to_pay_init_cost: int,
                 annual_equity_pymt_increase: float,
                 per_unit_markup_cost: float = 0.00):

        self.cost_per_unit = cost_per_unit
        self.target_rental_yield = target_rental_yield
        self.per_unit_markup_cost = per_unit_markup_cost
        self.init_down_payment_rate = init_down_payment
        self.annual_rent_increase = annual_rent_increase
        self.annual_home_value_increase = annual_home_value_increase
        self.years_to_pay_init_cost = years_to_pay_init_cost
        self.annual_equity_pymt_increase = annual_equity_pymt_increase
        self.total_annual_amt_paid : dict[int, float] = {}
        self.projected_monthly_rent_pybl: dict[int, float] = {}
        self.projected_annual_rent_pybl: dict[int, float] = {}


    @property
    def rto_start_value(self) -> float:
        """The starting value of the property"""
        return (1 + self.per_unit_markup_cost) * self.cost_per_unit

    @property
    def init_monthly_equity_pymt(self) -> dict[int, float]:
        """The monthly payment for the initial home value over
        the period of the RTO agreement"""

        projections = {i: 0 for i in range(1,21)}
        projections[1] = round(self.rto_start_value / (self.years_to_pay_init_cost * 12), 4)

        return projections

    @property
    def onetime_eqty_pymt(self ) -> dict[int, float]:

        projections = {i: 0 for i in range(1, 21)}
        projections[1] = round(self.init_down_pymt, 4)

        return projections

    @property
    def init_down_pymt(self) -> float:
        "The initial down payment made on the property"
        return self.init_down_payment_rate * self.rto_start_value

    @property
    def annual_rental_amt(self) -> float:
        """The total amount of rent collected in a year"""
        return self.target_rental_yield * self.rto_start_value

    @property
    def start_monthly_rent(self) -> float:
        """ The amount a tenent pays each month at theh start
        of the RTO scheme"""
        return self.annual_rental_amt / 12

    @property
    def projected_monthly_rent(self) -> dict[int, float]:
        """ Calculaltes the projected monthly rent over
         the specified period of time

        :returns: A dictionary containing the monthly rental value
        for every year of the RTO agreement. Key is the year and value
        is the amount due
       """

        projections = {}

        #TODO investigate decoupling
        projections[1] = round(self.start_monthly_rent, 4)
        self.projected_monthly_rent_pybl[1] = projections[1] # Set initial monthly rent pybl
        self.projected_annual_rent_pybl[1] = projections[1] * 12 # Set initial annual rent pybl

        # Calculate subsequent years
        for i in range(2, self.years_to_pay_init_cost + 1):
            projections[i] = round(((1 + self.annual_rent_increase) * projections[i - 1]), 4)

        return projections

    @property
    def projected_eoy_home_value(self) -> dict[int, float]:
        """Calculates the proejcted home value of the property at the end
        of each year over the duration of the RTO agreement.

        :returns: A dictionary containing the projected values. Key is the year,
        value is the home value
        """

        projections = {}

        projections[1] = round((1 + self.annual_home_value_increase) * self.rto_start_value, 4)

        # Calculate subsequent years
        for i in range(2, self.years_to_pay_init_cost + 1):
            projections[i] = round((1 + self.annual_home_value_increase) * projections[i - 1], 4)

        return projections

    @property
    def projected_total_monthly_payments(self) -> dict[int, float]:
        """ Calculates the total payments made for each month, this
        includes Rent & Equity payments

        :returns: A dictionary containing the projected monthly payments, Key
        is the year, value is the monthly payment"""

        # Fetch the projected monthly rent payments
        monthly_rent_amt = self.projected_monthly_rent

        projections = {}
        projections[1] = round(self.start_monthly_rent + self.init_monthly_equity_pymt[1],4)
        self.total_annual_amt_paid[1] = round(projections[1]*12, 4)   # Set annual total payments

        # Calculate for subsequent years
        for i in range(2, self.years_to_pay_init_cost +1):
            projections[i] = round(monthly_rent_amt[i] + ((1 + self.annual_equity_pymt_increase)**(i-1)) * self.init_monthly_equity_pymt[1], 4)
            self.total_annual_amt_paid[i] = round(projections[i] * 12, 4)

        return projections


    @property
    def lifetime_total_pymt(self) -> float:
        """Calculates the total amount paid in Rent & Equity over the lifetime
        of the RTO agreement

        :returns: Returns the total lifetime amount"""
        total = 0

        for value in self.total_annual_amt_paid.values():
            total += value

        return round(total, 4)


    @property
    def projected_monthly_equity_pymt(self) -> dict[int, float]:
        """Calculates the projected monthly equity payments over the
        duration of the RTO agreement

        :returns: A dictionary containing the projected payments. Key is the year,
        value is the projection"""

        projections = {}
        projections[1] = round(self.projected_total_monthly_payments[1] - self.projected_monthly_rent_pybl[1] , 4)

        # for i in range(self.years_to_pay_init_cost):
        #     self.mo
        return projections


    @property
    def projected_total_annual_equity_pymt(self) -> dict[int, float]:
        """

        """

        projections = {}
        projections[1] = round(self.projected_monthly_equity_pymt[1] * 12, 4)

        return projections

    @property
    def projected_cum_equity_pymt(self) -> dict[int, float]:
        """

        """

        projections = {}

        projections[1] = round(self.projected_total_annual_equity_pymt[1] + self.init_down_pymt, 4)

        # # Set subsequent elements
        # for i in range(2, self.years_to_pay_init_cost+1):
        #     projections[i] = 0

        return projections

    @property
    def projected_eoy_equity_before_aquity(self) -> dict[int, float]:
        """

        """

        projections = {}

        projections[1] = round(self.projected_cum_equity_pymt[1] / self.projected_eoy_home_value[1], 4)

        return projections

    @property
    def projected_notional_eqty_from_gain(self) -> dict[int, float]:
        """
        Calculates tthe notional equity assigned to the tenant from the annual
        gain in home value

        :returns: A dictionary containing the projected equity assignments
        """

        projections = {}
        projections[1] = round((self.projected_eoy_home_value[1] - self.rto_start_value) * self.projected_eoy_equity_before_aquity[1], 4)

        return projections

    @property
    def projected_cum_amt_from_gain(self) -> dict[int, float]:
        """ Calculates the cumulative amount of EOY equity assigned to the
        tenant from the annnual gain in home value

        :returns: A dictionary containing the projected cumulative equity assignments
        """

        projections = {}
        projections[1] = self.projected_notional_eqty_from_gain[1]

        return projections

    @property
    def projected_eoy_subscriber_ownership(self) -> dict[int, float]:
        """
        Calculates the projected end of year subscriber ownership after notial
        equityy assignment

        returns: A dictionary containing the projected equity assignments
        """

        projections = {}
        projections[1] = round((self.projected_cum_equity_pymt[1] + self.projected_cum_amt_from_gain[1])/self.projected_eoy_home_value[1], 4)

        return projections

    @property
    def projected_gcb_ownenrship(self) -> dict[int, float]:
        """Calculates the projected end of year ownership percentages of GCB REIT in the property

        :returns: A dictionary containing the projected ownership percentages
        """

        projections = {}
        projections[1] =  1 - self.projected_eoy_subscriber_ownership[1]

        return projections

    @property
    def projected_gcb_value_in_home(self) -> dict[int, float]:
        """ Calculates the projected ownership values of GCB in the property

         :returns: A dictionary with the projected values. Key is the year, Value is
         the amount"""

        projections = {}
        projections[1] = round(self.projected_gcb_ownenrship[1] * self.projected_eoy_home_value[1], 4)

        return projections

    @property
    def projected_annual_roi(self) -> dict[int, float]:
        """Calculates the projected ROI % for each year of the agreement

        :returns: A dictionary with the projected ROI percentages. Key is
        the year, value is the percentage"""

        projections = {}
        projections[1] = round(((self.projected_annual_rent_pybl[1] + self.projected_cum_equity_pymt[1] +
                                (self.projected_gcb_value_in_home[1] - self.cost_per_unit))) / self.cost_per_unit, 4)

        return projections

    def initialize_model(self) -> dict[str , dict[int, float]] :
        """Initializes the necessary columns for the model"""

        proj = {}

        # Add fully calculated columns
        proj['monthly_rent_amt'] = self.projected_monthly_rent
        proj['total_monthly_pymt'] = self.projected_total_monthly_payments
        proj['total_annual_amt_paid'] = self.total_annual_amt_paid
        proj['eoy_home_value'] = self.projected_eoy_home_value
        proj['lifetime_amt_paid'] = self.lifetime_total_pymt
        proj['onetime_eqty_pymt'] = self.onetime_eqty_pymt

        # 3/12 2.2/12

        # Add partially initialized columns
        proj['monthly_rent_pybl'] = self.projected_monthly_rent_pybl
        proj['annual_rent_pybl'] = self.projected_annual_rent_pybl
        proj['monthly_eqty_pymt'] = self.projected_monthly_equity_pymt
        proj['total_annual_eqty_pymt'] = self.projected_total_annual_equity_pymt
        proj['cum_total_eqty_paid'] = self.projected_cum_equity_pymt
        proj['notional_eqty_assign'] = self.projected_notional_eqty_from_gain
        proj['gcb_value_in_home'] = self.projected_gcb_value_in_home
        proj['cum_tnt_amt_from_gain'] = self.projected_cum_amt_from_gain
        proj['eoy_subscriber_ownership'] = self.projected_eoy_subscriber_ownership
        proj['eoy_gcb_ownership'] = self.projected_gcb_ownenrship
        proj['eoy_roi'] = self.projected_annual_roi
        proj['eoy_tnt_eqty_before_aqty'] = self.projected_eoy_equity_before_aquity
         

        return proj




