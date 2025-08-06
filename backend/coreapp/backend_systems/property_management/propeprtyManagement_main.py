from datetime import timedelta, datetime
from ...models import Developer, DeveloperProject, Property, CustomUser, UserFinancialModel
from ...serializer import DeveloperSerializer, DeveloperProjectSerializer, PropertySerializer, UserSerializer, \
    NotificationSerializer, UserFinancialModelSerializer
from django.db import transaction


class PropertyManager():
    #
    def check_unit_availability(self, developerProject: DeveloperProject) -> bool:
        """Checks whether a developer project has units available.
        :param developerProject: The developer project being checked
        :returns: True if unit available, False if otherwise"""

        try:
            num_units = developerProject.project_no_of_units
            assigned_units = developerProject.no_assigned_units

            if assigned_units >= num_units:
                return False
        except:
            raise

        return True

    def set_financial_model(self, user_property: Property, request) -> bool | UserFinancialModel:
        """Takes financial model params from a request object then generates
         and saves a users financial model

         :param tenant: A CustomsUser object of type tenant
         :param request: The HTTP request data
         :param user_property: The property to which a financial model is attatched
         :returns: The UserFinancialModel that was created, or False if there was an error while
         creating the model
         """

        try:
            # Replace the request property with an object
            data = request.data.copy()
            data['property'] = user_property.id

            # Create the users financial model
            model_serializer = UserFinancialModelSerializer(data=data)

            if model_serializer.is_valid():
                new_usermodel = model_serializer.save()
                return new_usermodel    
        except:
            raise

        return False

    def assign_unit(self, developerProject: DeveloperProject, tenant: CustomUser, request) -> bool:
        """Assigns a unit to a tenant"""

        try:
        # Create property unit
            property_data = {
                'name': str(int(developerProject.no_assigned_units) + 1),
                'developer_project': developerProject.id,
                'current_tenant': tenant.id,
                'rent_type': request.data.get('rent_type'),
                'date_created': datetime.now(),
                'is_assigned': True,
                'handing_over_date': None,
                'notified_via_email': False
            }

            # Assign unit
            with transaction.atomic():
                # Save property
                new_property = PropertySerializer(data=property_data, partial=True)
                if new_property.is_valid():
                    property = new_property.save()

                    # Set financial model
                    self.set_financial_model(user_property=property, request=request)

                    # Update project units
                    developerProject.no_assigned_units += 1
                    developerProject.save()
                    return property
                else:
                    print('Not valid \n', new_property.errors)
                    raise ValueError
        except:
            raise

        return False


    def unassign_unit(self, propertyid) -> bool:
        """Unassigns a unit from a tenant"""

        try:
            with transaction.atomic():
                # Get reference to property
                property = Property.objects.get(id=propertyid)
                # Check developer project assigned is not 0
                if property.developer_project.no_assigned_units <=0:
                    raise Exception
                    return False

                # Reduce developer project assigned count
                property.developer_project.no_assigned_units -=1
                property.developer_project.save()
                print("property")
                property.current_tenant = None
                property.is_assigned = False
                property.save()
                
                property.delete()

                # Delete financial model
                print(property)
                user_financial_model = UserFinancialModel.objects.get(property = property.id)
                user_financial_model.delete()


                # Delete property
                property.delete()
                
        except Exception as e:
            print("Error in unassign_unit: ", e)
            return False