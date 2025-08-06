

from datetime import datetime
import numpy as np
from ...models import Application, Property
from ...serializer import ApplicationSerializer


class AppForm:

    def __init__(self, data_dict):
        self.title = data_dict.get('title')
        self.surname = data_dict.get('surname')
        self.first_name = data_dict.get('first_name')
        self.other_names = data_dict.get('other_names')
        self.dob = data_dict.get('dob')
        self.marital_status = data_dict.get('marital_status')
        self.num_children = data_dict.get('num_children')
        self.id_type = data_dict.get('id_type')
        self.id_card_number = data_dict.get('id_card_number')
        self.issue_date = data_dict.get('issue_date')
        self.expiry_date = data_dict.get('expiry_date')
        self.email = data_dict.get('email')
        self.mobile_no1 = data_dict.get('mobile_no1')
        self.mobile_no2 = data_dict.get('mobile_no2')
        self.residential_address = data_dict.get('residential_address')
        self.ghanapost_gps_code = data_dict.get('ghanapost_gps_code')
        self.num_bedrooms = data_dict.get('num_bedrooms')
        self.duration_at_address_years = data_dict.get('duration_at_address_years')
        self.duration_at_address_months = data_dict.get('duration_at_address_months')
        self.rent_monthly = data_dict.get('rent_monthly')
        self.reason_for_moving = data_dict.get('reason_for_moving')
        self.landlord_name = data_dict.get('landlord_name')
        self.landlord_mobile_no = data_dict.get('landlord_mobile_no')
        self.any_pets = data_dict.get('any_pets')
        self.pet_description = data_dict.get('pet_description')
        self.smoke = data_dict.get('smoke')
        self.evicted = data_dict.get('evicted')
        self.eviction_reason = data_dict.get('eviction_reason')
        self.current_employer_name = data_dict.get('current_employer_name')
        self.employer_email = data_dict.get('employer_email')
        self.employer_contact_no = data_dict.get('employer_contact_no')
        self.staff_id = data_dict.get('staff_id')
        self.employment_date = data_dict.get('employment_date')
        self.supervisor_contact = data_dict.get('supervisor_contact')
        self.supervisor_name = data_dict.get('supervisor_name')
        self.current_net_income = data_dict.get('current_net_income')
        self.other_income_sources = data_dict.get('other_income_sources')
        self.bank_name = data_dict.get('bank_name')
        self.checking_account = data_dict.get('checking_account')
        self.checking_account_controller_details = data_dict.get('checking_account_controller_details')
        self.branch = data_dict.get('branch')
        self.savings_account = data_dict.get('savings_account')
        # self.preferred_locations = data_dict.get('preferred_locations')
        self.preferred_location1 = data_dict.get('preferred_location1')
        self.preferred_location2 = data_dict.get('preferred_location2')
        self.preferred_location3 = data_dict.get('preferred_location3')
        self.min_num_bedrooms = data_dict.get('min_num_bedrooms')
        self.max_num_bedrooms = data_dict.get('max_num_bedrooms')
        self.preferred_num_bedrooms = data_dict.get('preferred_num_bedrooms')
        self.preferred_move_in_date = data_dict.get('preferred_move_in_date')
        self.professional_referee_name1 = data_dict.get('professional_referee_name1')
        self.professional_referee_address1 = data_dict.get('professional_referee_address1')
        self.professional_referee_phone1 = data_dict.get('professional_referee_phone1')
        self.professional_referee_name2 = data_dict.get('professional_referee_name2')
        self.professional_referee_address2 = data_dict.get('professional_referee_address2')
        self.professional_referee_phone2 = data_dict.get('professional_referee_phone2')
        self.emergency_contact_name = data_dict.get('emergency_contact_name')
        self.emergency_contact_address = data_dict.get('emergency_contact_address')
        self.emergency_contact_phone = data_dict.get('emergency_contact_phone')
        self.declaration_text = data_dict.get('declaration_text')
        self.declaration_name = data_dict.get('declaration_name')
        self.declaration_date = data_dict.get('declaration_date')
        self.declaration_signature = data_dict.get('declaration_signature')
        self.date_received = data_dict.get('date_received')
        self.time_received = data_dict.get('time_received')
        self.date_verification_completed = data_dict.get('date_verification_completed')
        self.approved = data_dict.get('approved')
        self.approval_reason = data_dict.get('approval_reason')
        self.application_number = data_dict.get('application_number')

    """
    Returns a dictionary containing section 1 of the application form
    """   
    # section 1
    def get_personal_info(self):
        return {
            "title": self.title,
            "surname": self.surname,
            "first_name": self.first_name,
            "other_names": self.other_names,
            "dob": self.dob,
            "marital_status": self.marital_status,
            "num_children": self.num_children,
            "id_type": self.id_type,
            "id_card_number": self.id_card_number,
            "issue_date": self.issue_date,
            "expiry_date": self.expiry_date,
            "email": self.email,
            "mobile_no1": self.mobile_no1,
            "mobile_no2": self.mobile_no2,
        }
    # section 2
    def get_previous_address_info(self):
        return {
            "residential_address": self.residential_address,
            "ghanapost_gps_code": self.ghanapost_gps_code,
            "num_bedrooms": self.num_bedrooms,
            "duration_at_address_years": self.duration_at_address_years,
            "duration_at_address_months": self.duration_at_address_months,
            "rent_monthly": self.rent_monthly,
            "reason_for_moving": self.reason_for_moving,
            "landlord_name": self.landlord_name,
            "landlord_mobile_no": self.landlord_mobile_no,
            "any_pets": self.any_pets,
            "pet_description": self.pet_description,
            "smoke": self.smoke,
            "evicted": self.evicted,
            "eviction_reason": self.eviction_reason,
        }

    # section 5
    def get_preferred_address_info(self):

        return {
            "preferred_location1": self.preferred_location1,
            "preferred_location2": self.preferred_location2,
            "preferred_location3": self.preferred_location3,
            "min_num_bedrooms": self.min_num_bedrooms,
            "max_num_bedrooms": self.max_num_bedrooms,
            "preferred_move_in_date": self.preferred_move_in_date,      
              }
    
# section 3
    def get_employment_details(self):
        """
        Returns a dictionary containing the employment details of the applicant.
        """
        return {
            "current_employer_name": self.current_employer_name,
            "employer_email": self.employer_email,
            "employer_contact_no": self.employer_contact_no,
            "staff_id": self.staff_id,
            "employment_date": self.employment_date,
            "supervisor_contact": self.supervisor_contact,
            "supervisor_name": self.supervisor_name,
            "current_net_income": self.current_net_income,
            "other_income_sources": self.other_income_sources,
        }

    # Section 4: Bank Details
    def get_bank_details(self):
        """
        Returns a dictionary containing the bank details of the applicant.
        """
        return {
            "bank_name": self.bank_name,
            "checking_account": self.checking_account,
            "checking_account_controller_details": self.checking_account_controller_details,
            "branch": self.branch,
            "savings_account": self.savings_account,
        }

    # Section 6: References
    def get_references(self):
        """
        Returns a dictionary containing the reference details provided by the applicant.
        """
        return {
            "professional_referee_name1": self.professional_referee_name1,
            "professional_referee_address1": self.professional_referee_address1,
            "professional_referee_phone1": self.professional_referee_phone1,
            "professional_referee_name2": self.professional_referee_name2,
            "professional_referee_address2": self.professional_referee_address2,
            "professional_referee_phone2": self.professional_referee_phone2,
            "emergency_contact_name": self.emergency_contact_name,
            "emergency_contact_address": self.emergency_contact_address,
            "emergency_contact_phone": self.emergency_contact_phone,
        }

    # Section 7: Declaration
    def get_declaration_info(self):
        """
        Returns a dictionary containing the declaration details provided by the applicant.
        """
        return {
            "declaration_text": self.declaration_text,
            "declaration_name": self.declaration_name,
            "declaration_date": self.declaration_date,
            "declaration_signature": self.declaration_signature,
        }

    # Section 8: For Official Use Only
    def get_official_use(self):
        """
        Returns a dictionary containing the official use details for the application.
        """
        return {
            "date_received": self.date_received,
            "time_received": self.time_received,
            "date_verification_completed": self.date_verification_completed,
            "approved": self.approved,
            "approval_reason": self.approval_reason,
            "application_number": self.application_number,
        }


    # fetch all application sections
    def get_all_sections(self):
        return {
            "personal_info": self.get_personal_info(),
            "previous_address_info": self.get_previous_address_info(),
            "preferred_address_info": self.get_preferred_address_info(),
            "employment_details": self.get_employment_details(),
            "bank_details": self.get_bank_details(),
            "references": self.get_references(),
            "declaration_info": self.get_declaration_info(),
            "official_use": self.get_official_use(),
        }
    def check_age(self):
        age = datetime.now().date() - self.dob
        if age.days // 365 < 18:
            return False
        return True

    def compare_dates(self, date1, date2):
        if date1 <= date2:
            return False
        return True

    def email_exists(self):
        if Application.objects.filter(email=self.email).exists():
            return True
        return False
    
    def check_bedroom_number(self, property: Property):
        if self.min_num_bedrooms > property.num_bedrooms:
            return False
        return True

    def check_rentals_vs_salary(self, current_salary: int, other_income: int, property: Property) -> bool:
        if current_salary + other_income < (property.bedroom_price*property.num_bedrooms):
            return False
        return True
    

# -----------------------GENERAL APPLICATION FUNCTIONS -----------------------------------------#

def compute_applicant_stats():
    applications = Application.objects.all()
    serialized_applications = ApplicationSerializer(applications, many=True).data  # Convert to serialized data
    num_applications = len(serialized_applications)  # Use len() on the serialized data list

    if num_applications > 0:
        # Calculate total income for each applicant
        print("got here")
        salaries = [(float(app['current_net_income']) + float(app['other_income_sources'])) for app in serialized_applications]
        print(type(salaries[0]))
        # Compute mean income
        mean_income = np.mean(salaries)
        
        # Define percentage thresholds
        higher_threshold = mean_income * 1.25
        lower_threshold = mean_income * 0.75
        
        # Categorize applicants
        higher_earners = [salary for salary in salaries if salary > higher_threshold]
        lower_earners = [salary for salary in salaries if salary < lower_threshold]
        average_earners = [salary for salary in salaries if lower_threshold <= salary <= higher_threshold]
    else:
        mean_income = higher_threshold = lower_threshold = 0
        higher_earners = lower_earners = average_earners = []

    result = {
        "num_applications": num_applications,
        "mean_income": mean_income,
        "higher_threshold": higher_threshold,
        "lower_threshold": lower_threshold,
        "average_earners": average_earners,
        "higher_earners": higher_earners,
        "lower_earners": lower_earners,
    }

    print(result)
    return result