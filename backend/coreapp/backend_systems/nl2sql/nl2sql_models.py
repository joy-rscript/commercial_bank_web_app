from django.db import models
from django.contrib.auth.models import User
from django.forms import JSONField

class Tenant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Application(models.Model):
    status = models.CharField(max_length=15)
    formData = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def updateStatus(self, status):
        self.status = status
        self.save()

class Form(models.Model):
    # Section 1: Personal Information
    title_choices = [('dr', 'Dr.'), ('mr', 'Mr.'), ('mrs', 'Mrs.'), ('miss', 'Miss'), ('other', 'Other'),
                     ]
    title = models.CharField(max_length=10, choices=title_choices)
    surname = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField()
    marital_status = models.CharField(max_length=10, blank=True, null=True)
    num_children = models.PositiveIntegerField(default=0)
    id_type = models.CharField(max_length=100)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    email = models.EmailField()
    mobile_no1 = models.CharField(max_length=15)
    mobile_no2 = models.CharField(max_length=15, blank=True, null=True)

    # Section 2: Previous Address
    residential_address = models.CharField(max_length=255)
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
    employment_date = models.DateField()
    supervisor_contact = models.CharField(max_length=15)
    supervisor_name = models.CharField(max_length=100)
    current_net_income = models.DecimalField(max_digits=10, decimal_places=2)
    other_income_sources = models.DecimalField(max_digits=10, decimal_places=2)

    # Section 4: Bank Details
    bank_name = models.CharField(max_length=255)
    checking_account = models.CharField(max_length=100)
    checking_account_controller_details = models.CharField(max_length=255)
    branch = models.CharField(max_length=100)
    savings_account = models.CharField(max_length=100)

    # Section 5: Preferred Location
    preferred_locations = models.TextField()
    preferred_num_bedrooms = models.PositiveIntegerField()
    preferred_move_in_date = models.DateField()

    # Section 6: References
    professional_referee_name1 = models.CharField(max_length=255)
    professional_referee_address1 = models.CharField(max_length=255)
    professional_referee_phone1 = models.CharField(max_length=15)
    professional_referee_name2 = models.CharField(max_length=255)
    professional_referee_address2 = models.CharField(max_length=255)
    professional_referee_phone2 = models.CharField(max_length=15)
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_address = models.CharField(max_length=255)
    emergency_contact_phone = models.CharField(max_length=15)

    # Section 8: For Official Use Only
    date_received = models.DateField()
    time_received = models.TimeField()
    date_verification_completed = models.DateField()
    approved = models.BooleanField(default=False)
    approval_reason = models.TextField(blank=True, null=True)
    application_number = models.CharField(max_length=100)

    def __str__(self):
        return f'Form - {self.submission_date}'

class Property(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    squareFt = models.DecimalField(decimal_places=2)
    value = models.DecimalField(decimal_places=2)
    description = models.TextField()
    contact_person = JSONField()  # should have keys name, number, email
    num_bedrooms = models.PositiveIntegerField(default=1)
    currentTenant = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class Developer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    businessContact = JSONField()
    contactPerson = JSONField()
    location = models.CharField(max_length=255)
    properties = models.ManyToManyField(Property)  # ToDo: test the connection

    def addProperty(self, property):
        # does property exist?? need to create a property instance first before adding it to the collection
        self.properties.add(property)
        self.save()

class PaymentVerification(models.Model):
    property = models.ForeignKey(Property)  # excluded cascading delete to keep the record of payments made
    tenant = models.ForeignKey(User)
    paymentAmount = models.DecimalField(decimal_places=2)
    paymentMode = models.CharField(max_length=100)
    paymentDate = models.DateField()
    dateRecorded = models.DateTimeField(auto_now_add=True)