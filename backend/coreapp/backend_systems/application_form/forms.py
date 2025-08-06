from django import forms

from .form_helper import *
from ...models import Application
from django.core.exceptions import ValidationError
from datetime import datetime

class ApplicationForm(forms.ModelForm):
    
    class Meta:
        model = Application
        fields = '__all__'

    def check_age(self, dob):
        age = datetime.now().date() - dob
        if age.days // 365 < 18:
            return False
        return True

    def compare_dates(self, date1, date2):
        if date1 <= date2:
            return False
        return True

    def email_exists(self, email):
        email = self.cleaned_data.get('email')
        if Application.objects.filter(email=email).exists():
            return True
        return False

    # def valid_ghanaian_phone_number(self):
    #         ghana_code = "+233"
    #         if self.mobile_no1[:4] != ghana_code or not self.mobile_no1[4:].isdigit():
    #             return False
    #         return True
    
    def clean_dob(self):
        dob = self.cleaned_data.get('dob')
        # dob = datetime.strptime(dob, '%Y-%m-%d').date()
        if not self.check_age(dob):
            raise ValidationError("Applicant must be at least 18 years old.")
        return dob

    def clean_issue_date(self):
        issue_date = self.cleaned_data.get('issue_date')
        # issue_date = datetime.strptime(issue_date, '%Y-%m-%d').date()
        dob = self.cleaned_data.get('dob')
        if not self.compare_dates(issue_date, dob):
            raise ValidationError("Issue date is incorrect, date should be greater than Date of Birth.")
        return issue_date

    def clean_expiry_date(self):
        expiry_date = self.cleaned_data.get('expiry_date')
        # expiry_date = datetime.strptime(expiry_date, '%Y-%m-%d').date()
        issue_date = self.cleaned_data.get('issue_date')
        if not self.compare_dates(expiry_date, issue_date):
            raise ValidationError("Expiry date is incorrect, date must be after issue date.")
        return expiry_date

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if self.email_exists(email):
            raise ValidationError("This email is already used in another application.")
        return email

    def clean_mobile_no1(self):
        mobile_no1 = self.cleaned_data.get('mobile_no1')
        # if not self.valid_ghanaian_phone_number():
        #     raise ValidationError("Invalid Ghanaian phone mobile number. Provide a valid number from the following service providers: MTN, Vodafone, Airtel Tigo")
        return mobile_no1
    
    

