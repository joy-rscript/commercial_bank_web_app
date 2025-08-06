from dataTrends_main import DataTrends
from ...models import DeveloperProject, UserFinancialModel
from django.db.models import Count


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

    return location_percentages


@property
def calc_total_units(self):
    """Calculates the total number of units avavilable"""

    total_no_units = sum(DeveloperProject.objects.values_list('no_of_units', flat=True))

    return total_no_units


def calc_avg_unit_price(self):
    """Calculates the average unit price"""

    # Count num units and get total price
    project_count = DeveloperProject.objects.count()
    total_unit_price = sum(DeveloperProject.objects.values_list('bedroom_price', flat=True))

    # Calculate average
    avg_unit_price = total_unit_price/project_count

    return avg_unit_price


def calc_avg_rent(self):

    #TODO: Ask joy how to get current monthly rent paymets
    return


def calc_occupancy_rate(self):

    total_units = calc_total_units
    assigned_units = UserFinancialModel.objects.count()

    return assigned_units
