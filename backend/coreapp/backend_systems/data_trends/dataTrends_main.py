from ...models import DeveloperProject, UserFinancialModel, Application, Property
from django.db.models import Count
import traceback



class DataTrends():

    @property
    def calc_developments_per_location(self):
        """calculates the developments per location and expresses them as
        percentages"""

        # Get total number of projects
        total_projects = DeveloperProject.objects.count()

        # Aggregate the number of projects per location
        location_counts = DeveloperProject.objects.values('location').annotate(count=Count('id'))

        # Calculate the percentages
        location_percentages = {}
        for entry in location_counts:
            location = entry['location']
            count = entry['count']
            percentage = (count / total_projects) * 100
            location_percentages[location] = percentage
            print("location percentage is >>", percentage)
        return location_percentages

    @property
    def calc_total_units(self):
        """Calculates the total number of units avavilable"""

        total_no_units = sum(DeveloperProject.objects.values_list('project_no_of_units', flat=True))

        return total_no_units


    @property
    def calc_avg_unit_price(self):
        """Calculates the average unit price"""

        # Count num units and get total price
        project_count = DeveloperProject.objects.count()
        total_unit_price = sum(DeveloperProject.objects.values_list('bedroom_price', flat=True))

        # Calculate average
        avg_unit_price = total_unit_price / project_count

        return avg_unit_price


    @property
    def calc_avg_rent(self):
        # TODO: Ask joy how to get current monthly rent paymets
        return 0


    @property
    def calc_occupancy_rate(self):
        total_units = self.calc_total_units
        assigned_units = UserFinancialModel.objects.count()

        occupancy_rate = (assigned_units/total_units) * 100

        return occupancy_rate


    def calculate_portfolio(self):

        portfolio = dict()
        portfolio['developments_per_location'] = self.calc_developments_per_location
        portfolio['total_units'] = self.calc_total_units
        portfolio['avg_unit_price'] = self.calc_avg_unit_price
        portfolio['average_rent'] = self.calc_avg_rent
        portfolio['occupancy_rate'] = self.calc_occupancy_rate


        # print(portfolio['developments_per_location'],'<<<<')
        return portfolio

    def calculate_revenue_stats(self):
        return


    def calculate_total_properties(self):
        """calculates the total number of vacant and occupied properties for each
        developer"""

        property_data = {}
        developer_projects = DeveloperProject.objects.all()
        for developer_project in developer_projects:
            vacant_units = developer_project.project_no_of_units - developer_project.no_assigned_units
            property_data[developer_project.developer.developer_name] = {"total":developer_project.project_no_of_units,
                                                                        "occupied":developer_project.no_assigned_units,
                                                                        "vacant":vacant_units}
        return property_data


    def calculate_average_income(self):
        incomes = []

        applications = Application.objects.all()
        for application in applications:
            incomes.append(application.current_net_income)

        return sum(incomes) / len(incomes)



    def calculate_average_rent_payment(self):
        return




    def calculate_user_base(self):
        """Calculates user base statistics"""


        applications_recieved = Application.objects.count()
        applications_approved = Application.objects.filter(approved=True).count()
        number_of_tenants = Property.objects.count()
        average_income = self.calculate_average_income()

        user_base_stats = {'applications_recieved':applications_recieved,
                           'applications_approved':applications_approved,
                           'number_of_tenants':number_of_tenants,
                           'average_income':float(average_income,2)}

        print(user_base_stats)


        return user_base_stats