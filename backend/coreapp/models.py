# import datetime
from datetime import timedelta, datetime, date

from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.forms import JSONField
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
import uuid

class CustomUserManager(BaseUserManager):
    """
    Manages the CustomUser class and allows for the creation of regular
    and superusers
    """

    def create_user(self, email, password=None, **extra_fields):
        """ Creates and saves a regular user using the given email
        and password

        :param email: The users email address
        :param password: The users password
        :param extra_fields: Extra fields for a regular user"""

        if not email:
            raise ValueError('The Email field has not been set')

        # Normalize and Set account details
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        """ Creates and saves a super user using the given email and password

        :param email: The users email address
        :param password: The users password
        :param extra_fields: Extra fields for a regular user"""


        if password is None:
            raise TypeError('Superusers must have a password.')

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        # Check that appropriate permissions are set
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        if extra_fields.get('is_active') is not True:
            raise ValueError('Superuser must have is_active=True')
        # Create the user
        user = self.create_user(email, password, **extra_fields)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """A custom user class for the platform. Will serve
    as the base class for admins, superadmins, estate developers
    and software engineers """

    # Define fields for the custom user table

    email = models.EmailField(max_length=50, unique=True)
    f_name = models.CharField(max_length=100)
    l_name = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    
    nationalID = models.CharField(max_length=15, null=True, blank=False, unique=True)
    # , primary_key=True
    USERNAME_FIELD = "email"

    # Declare user type choices
    USER_TYPE_CHOICES = (('tenant', 'Tenant'), ('estate_developers', 'Estate Developer'),
                         ('gcb_admin', 'GCB Admin'), ('gcb_superadmin', 'GCB SuperAdmin'),
                         ('software_engineer', 'Software Eng'))

    user_type = models.CharField(max_length=17, choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False, null=True, blank=True)
    is_superuser = models.BooleanField(default=False)  # TODO clarify these
    is_active = models.BooleanField(default=False, blank=True)  # TODO clarify these
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    session_token = models.CharField(max_length=10, default=0)

    # Set required fields
    REQUIRED_FIELDS = ["f_name", "l_name", "user_type", "is_staff",
                       "is_superuser", "nationalID"]

    objects = CustomUserManager()

    class Meta(AbstractBaseUser.Meta):
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.email

    @property
    def is_tenant(self):
        return self.user_type == "tenant"

    @property
    def is_estate_developer(self):
        return self.user_type == "estate_developer"

    @property
    def is_gcb_admin(self):
        return self.user_type == "gcb_admin"

    @property
    def is_gcb_superadmin(self):
        return self.user_type == "gcb_superadmin"

    @property
    def is_software_engineer(self):
        return self.user_type == "software_engineer"


class SystemLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=22)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.user} - {self.action_type}"

    def deleteLog(self):
        self.delete()


# class ChatLog(SystemLog):
#     logFile = JSONField() # Will carry records of query and result pairs
#
#     def addQuery(self, query, result):
#         self.logFile.append({"query": query, "result": result})
#         self.save()
#
#     def clearChatLog(self):
#         self.logFile = []
#         self.save()
#         # super().deletelog()

class Application(models.Model):
    class TitleChoices(models.TextChoices):
        MR = 'Mr', 'Mr'
        MRS = 'Mrs', 'Mrs'
        MISS = 'Miss', 'Miss'
        DR = 'Dr', 'Dr'

    # Section 1: Personal Information
    title = models.CharField(max_length=10)
    surname = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField()
    marital_status = models.CharField(max_length=10, choices=[('Single', 'Single'), ('Married', 'Married'), ('Divorced', 'Divorced'), ('Widowed', 'Widowed')], blank=True, null=True)
    num_children = models.PositiveIntegerField(default=0)
    id_type = models.CharField(max_length=100, choices=[('Ghana Card', 'Ghana Card'), ('SSNIT/Biometric Card', 'SSNIT/Biometric Card')])
    
    id_card_number = models.CharField(max_length=100)
    issue_date = models.DateField()
    expiry_date = models.DateField(blank=True, null=True)
    email = models.EmailField()
    mobile_no1 = models.CharField(max_length=15)
    mobile_no2 = models.CharField(max_length=15, blank=True, null=True)

    # Section 2: Previous Address
    residential_address = models.CharField(max_length=255) 
    # residential_city = models.CharField(max_length=255, null=True, blank=True)
    # street_address = models.CharField(max_length=255, blank=True, null=True)
    ghanapost_gps_code = models.CharField(max_length=100)
    num_bedrooms = models.PositiveIntegerField(default=1)
    duration_at_address_years = models.PositiveIntegerField()
    duration_at_address_months = models.PositiveIntegerField()
    rent_monthly = models.DecimalField(max_digits=10, decimal_places=2)
    reason_for_moving = models.TextField()
    landlord_name = models.CharField(max_length=100)
    landlord_mobile_no = models.CharField(max_length=15)
    any_pets = models.BooleanField(default=False)
    pet_description = models.TextField(blank=True, null=True)
    smoke = models.BooleanField(default=False)
    evicted = models.BooleanField(default=False)
    eviction_reason = models.TextField(blank=True, null=True)

    # Section 3: Employment Details
    current_employer_name = models.CharField(max_length=255)
    employer_email = models.EmailField()
    employer_contact_no = models.CharField(max_length=15)
    staff_id = models.CharField(max_length=100)
    employment_date = models.DateField()
    supervisor_contact = models.CharField(max_length=15)
    supervisor_name = models.CharField(max_length=100)
    current_net_income = models.DecimalField(max_digits=10, decimal_places=2)
    other_income_sources = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Section 4: Bank Details
    bank_name = models.CharField(max_length=255)
    checking_account = models.CharField(max_length=100)
    checking_account_controller_details = models.CharField(max_length=255)
    branch = models.CharField(max_length=100)
    savings_account = models.CharField(max_length=100)

    # Section 5: Preferred Location
    preferred_location1 = models.CharField(max_length=255)
    preferred_location2 = models.CharField(max_length=255, blank=True, null=True)
    preferred_location3 = models.CharField(max_length=255, blank=True, null=True)
    min_num_bedrooms = models.PositiveIntegerField()
    max_num_bedrooms = models.PositiveIntegerField()
    preferred_move_in_date = models.DateField()

    # Section 6: References
    professional_referee_name1 = models.CharField(max_length=255)
    professional_referee_address1 = models.CharField(max_length=255)
    professional_referee_phone1 = models.CharField(max_length=15)
    professional_referee_name2 = models.CharField(max_length=255, blank=True, null=True)
    professional_referee_address2 = models.CharField(max_length=255, blank=True, null=True)
    professional_referee_phone2 = models.CharField(max_length=15, blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_address = models.CharField(max_length=255)
    emergency_contact_phone = models.CharField(max_length=15)

    # Section 7: Declaration
    declaration_text = models.TextField()
    declaration_name = models.CharField(max_length=255)
    declaration_date = models.DateField()
    declaration_signature = models.TextField()

    # Section 8: For Official Use Only
    date_received = models.DateField(auto_now_add=True)
    time_received = models.TimeField(auto_now_add=True)
    date_verification_completed = models.DateField(default=None, null=True, blank=True)
    approved = models.BooleanField(default=False, blank=True, null=True)
    approval_reason = models.TextField( default=None,blank=True, null=True)
    # application_number = models.CharField(max_length=100, null=True, blank=True)    

    def __str__(self):
        return f'Form - {self.mobile_no1}'



class TenantInfo(models.Model):
    class TitleChoices(models.TextChoices):
        MR = 'Mr', 'Mr'
        MRS = 'Mrs', 'Mrs'
        MISS = 'Ms', 'Miss'
        DR = 'Dr', 'Dr'

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=10,  blank=True, null=True)
    other_names = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField()
    marital_status = models.CharField(max_length=10, blank=True, null=True)
    num_children = models.PositiveIntegerField(default=0)
    id_type = models.CharField(max_length=100)
    ssnit_biometric_card = models.CharField(max_length=100)
    id_number = models.CharField(max_length=100)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    email = models.EmailField()
    mobile_no1 = models.CharField(max_length=15)
    mobile_no2 = models.CharField(max_length=15, blank=True, null=True)

    current_employer_name = models.CharField(max_length=100)
    employer_email = models.EmailField()
    employer_contact_no = models.CharField(max_length=15)
    supervisor_contact = models.CharField(max_length=15)
    supervisor_name = models.CharField(max_length=100)
    current_net_income = models.DecimalField(max_digits=10, decimal_places=2)
    bank_name = models.CharField(max_length=100)
    checking_account = models.CharField(max_length=20)
    checking_account_controller_details = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    savings_account = models.CharField(max_length=20, blank=True, null=True)
    professional_referee_name1 = models.CharField(max_length=100)
    professional_referee_address1 = models.CharField(max_length=200)
    professional_referee_phone1 = models.CharField(max_length=15)
    professional_referee_name2 = models.CharField(max_length=100)
    professional_referee_address2 = models.CharField(max_length=200)
    professional_referee_phone2 = models.CharField(max_length=15)
    emergency_contact_name = models.CharField(max_length=100)
    emergency_contact_address = models.CharField(max_length=200)
    emergency_contact_phone = models.CharField(max_length=15)

# class EquityRatioInfo(models.Model):
#     GCB_equity_value = models.DecimalField(max_digits=10, decimal_places=2)
#     tenant_equity_value = models.DecimalField(max_digits=10, decimal_places=2)
#     value_appreication_rate = models.DecimalField(max_digits=5, decimal_places=2)
#     current_value = models.DecimalField(max_digits=10, decimal_places=2)
#     initial_value = models.DecimalField(max_digits=10, decimal_places=2)
#     equity_description = models.TextField()



class Developer(models.Model):
    ''' Models the basic information of developers'''
    developer_name = models.CharField(max_length=255, null=False)
    location = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=13, null=False)
    email_address = models.EmailField(max_length=150, null=False)
    website = models.CharField(max_length=150, null=True)
    year_of_incorporation = models.DecimalField(max_digits = 4, decimal_places=0,null=False)
    year_of_first_project = models.DecimalField(max_digits = 4, decimal_places=0,null=False)
    location_of_first_project = models.CharField(max_length=255, null=True)
    key_contact_person = models.CharField(max_length=255, null=True)
    contact_person_position = models.CharField(max_length=255, null=True)
    contact_person_number = models.CharField(max_length=13, null=True)
    contact_person_email = models.EmailField(max_length=150, null=True)

    class Meta:
        unique_together = ('developer_name','location','email_address','year_of_incorporation')

    def __str__(self):
        return self.developer_name

class DeveloperProject(models.Model):
    # TODO Confirm if this is for the first project

    OPTIONS = [
        ('ROAD', 'Road'),
        ('WATER', 'Water'),
        ('SCHOOL', 'School'),
        ('HOSPITAL', 'Hospital'),
        ('ELECTRICITY', 'Electricity'),
        ('INTERNET_CABLE', 'Internet and Cable'),
        ('GAS_SUPPLY', 'Gas Supply'),
        ('SECURITY', 'Security'),
        ('PARKS_RECREATIONAL', 'Parks and Recreational Areas'),
        ('SWIMMING_POOL', 'Swimming Pool'),
        ('GYM_FITNESS', 'Gym and Fitness Centers'),
        ('PUBLIC_TRANSPORTATION', 'Public Transportation'),
        ('SHOPPING_CENTERS', 'Shopping Centers'),
        ('PARKING', 'Parking'),
        ('AIR_CONDITIONING_HEATING', 'Air Conditioning and Heating'),
        ('WASTE_DISPOSAL', 'Waste Disposal'),
        ('LAUNDRY_FACILITIES', 'Laundry Facilities'),
        ('GARDENS_LAWNS', 'Gardens and Lawns'),
        ('BALCONY_TERRACE', 'Balcony or Terrace'),
        ('PET_FRIENDLY', 'Pet-Friendly Areas'),
        ('ENTERTAINMENT_FACILITIES', 'Entertainment Facilities'),
        ('DINING_OPTIONS', 'Dining Options'),
        ('COMMUNITY_CENTERS', 'Community Centers'),
        ('LIBRARIES', 'Libraries'),
        ('SPORTS_FACILITIES', 'Sports Facilities'),
        ('PLAYGROUNDS', 'Playgrounds'),
        ('HEALTHCARE_FACILITIES', 'Healthcare Facilities'),
        ('CHILDCARE_SERVICES', 'Childcare Services'),
        ('EDUCATIONAL_INSTITUTIONS', 'Educational Institutions'),
    ]

    class unit_type(models.TextChoices):
        APARTMENT = 'Apartment'
        HOUSE = 'House'

    developer = models.ForeignKey(Developer, on_delete=models.CASCADE, default=2)
    prospective_project = models.BooleanField()

    project_name = models.CharField(max_length=255, null=True, default='No Name Assigned')
    project_start_date = models.DateField()
    project_completion_date = models.DateField
    project_description = models.TextField(max_length=255)
    project_no_of_units = models.DecimalField(max_digits = 5, decimal_places=0,null=False)
    project_size = models.FloatField(max_length=20) # in acres
    location = models.CharField(max_length=255, null=False)
    unit_type = models.CharField(max_length=9, choices=unit_type.choices)
    no_of_bedrooms = models.DecimalField(max_digits = 4, decimal_places=0,null=False)
    bedroom_size = models.DecimalField(max_digits=8,decimal_places=2,null=False)
    bedroom_price = models.DecimalField( max_digits=8, decimal_places=2,null=False)
    amenities = ArrayField(models.CharField(max_length=25, choices=OPTIONS), default=list, null=True)
    no_assigned_units = models.IntegerField(null=False, default=0)

class Property(models.Model):
    class RentType(models.TextChoices):
        SHORT_TERM = 'SHRT', 'Short Term'
        RENT_TO_OWN = 'RTO', 'Rent to Own'


    name = models.CharField(max_length=100)
    developer_project = models.ForeignKey(DeveloperProject, null=False, default=2, on_delete=models.CASCADE) #todo make sure you enforce this in the API
    current_tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    description = models.TextField(null=True, default="Property Description")
    documents = models.FileField(upload_to='property_documents/', null=True,
                                 blank=True)  # create folder to keep all our documents for property in use

    display_photo = models.ImageField(upload_to='property_photos/', null=True, blank=True)
    date_created = models.DateField(auto_now_add=True)
    is_assigned = models.BooleanField(null= False, default=False)
    handing_over_date = models.DateField(null=True, blank=True)
    notified_via_email = models.BooleanField(null=False, default=False)

    def __str__(self):
        return self.name

    def assignTenant(self, tenant):
        self.tenant = tenant  # toDo : use the User model
        self.save()

class Receipt(models.Model):
    tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    receipt_number = models.CharField(max_length=100, unique=True)
    paid_amount = models.DecimalField(decimal_places=2, max_digits=255,null=False, blank=False)
    equity_amount = models.DecimalField(decimal_places=2, max_digits=255,default=0)
    rent_amount = models.DecimalField(decimal_places=2, max_digits=255, default=0)
    penalty_amount = models.DecimalField(decimal_places=2, max_digits=255,default=0)
    payment_mode = models.CharField(max_length=100, default="Bank Transfer")  #define some types here
    payment_date = models.DateField(null=False,blank=False) 
    date_recorded = models.DateTimeField(auto_now_add=True)



# ToDo: later separate the notification functionality to its own app
class Notification(models.Model):
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    class notification_types(models.TextChoices):
        APPLICATION_PROGRESS = 'Application Progress'
        APPLICATION_APPROVED = 'Application Approved'
        APPLICATION_DENIED = 'Application Denied'
        NEW_APPLICATION = 'New Application'
        GENERAL = 'General'
        Payment = 'Payment Alert'
        Warning = 'Property Warning'

    title = models.CharField(max_length=100)
    message = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    type = models.CharField(max_length=21, choices= notification_types.choices, default='General') #app. progress, general notification,  property payment alerts,  property warning
    target_group = models.CharField(null=False, choices= CustomUser.USER_TYPE_CHOICES, default='software_engineer')


    # def markAsRead(self):
    #     self.is_read = True
    #     self.save()

    def __str__(self):
        return f"Notification:({self.user.f_name} {self.user.l_name}) - {self.title}"

class AdminNotifications(models.Model):
    """A model to store read status for notifications targeted at admins"""

    notification_id =  models.ForeignKey(Notification, on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    is_read = models.BooleanField(default=False, null=False)


class TenantNotifications(models.Model):
    """A model to store read status for notifications targeted at tenants"""

    notification_id = models.ForeignKey(Notification, on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False, null=False)


# # Custom model for issue reporting, inheriting from Notification
class IssueReport(Notification):
    status = models.CharField(max_length=15)  # open, resolved, pending

    def __str__(self):
        return f"Issue reported for {self.property_name}"


class PropertyPaymentTracker(models.Model):
    """ 
    Model that stores the status of the users payments for a property each year as the tenant works their way RTO terminal year (full acquisition)
    paid_annual_rent & earned_annual_equity: resemble stacks that store yeearly paid amount as a percntage of annual payment expected. Value at the top of the stack is for the most recent year, such that all items below it are for previous years and of value 100% or 1.
    Oncee the current year is paid, a new year item is pushed to the stack to begin the next year's payment tracking.
    """
    property_id = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
    start_date = models.DateField(null=False)
    '''
    progress payment format

            {    
            "2024": {
                1: {
                    "amount_paid": 600,
                    "amount_to_be_paid": 1000000,
                }
                ....
                ....
                ....
            }
            ....
            ....
            ....
        }

    '''
    equity_progress = models.JSONField(default=dict)
    rent_progress = models.JSONField(default=dict)    
    last_paid_date_rent = models.DateField(null=True, ) # most recent paid month 01-02-2024
    last_paid_date_equity = models.DateField(null=True, ) # most recent paid month 01-02-2024
    total_equity = models.FloatField(default=0)

# # TODO: "verify the effect of the one time payment on the equity values, will the monthly 100% be inflated to 100*12 ? is it an issue to be handled by the model's computation or should i store a flag for whether each month is the standard payment ??" 

class PropertyPenaltyTracker(models.Model):
    """
    Model that stores the status of the users penalty resolutions for a property
    All latee penalities tracked have a default computation of 10% of the expected monthly rent the penalty was recorded for
    """
    property_id = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
    late_penalty_collection = models.JSONField(default=dict) #Penalty:{date : 00-00-00, amount: $$, status: 0, reason: lerem ipsum }





class UserFinancialModel(models.Model):
    """ Model for a users financial model parameters"""
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null = True)

    cost_per_unit = models.FloatField()
    target_rental_yield = models.FloatField()
    init_down_payment = models.FloatField()
    annual_rent_increase = models.FloatField()
    annual_home_value_increase = models.FloatField()
    years_to_pay_init_cost =models.FloatField()
    per_unit_markup_cost = models.FloatField()
    annual_equity_pymt_increase = models.FloatField()
    start_date = models.DateField(null=False, default= date.today )


# TODO: "verify the effect of the one time payment on the equity values, will the monthly 100% be inflated to 100*12 ? is it an issue to be handled by the model's computation or should i store a flag for whether each month is the standard payment ??"

class RegistrationToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    min_time_window = models.IntegerField(null=False, default=10)

    def is_valid(self):
        return self.created_at >= datetime.now() - timedelta(minutes=self.min_time_window)