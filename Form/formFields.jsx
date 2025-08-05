
const rtoApplication = [
    {
        sectionTitle: "Personal Information",
        fields:{
            title:
                {
                labelText: "Title",
                labelFor: "title",
                id: "title",
                name: "title",
                type: "select",
                options: ["Mr", "Mrs", "Miss", "Dr"],
                isRequired: true,
                placeholder: "Select Title"
            },
            surname:
            {
                labelText: "Surname",
                labelFor: "surname",
                id: "surname",
                name: "surname",
                type: "text",
                isRequired: true,
                placeholder: "Surname",
                group: "name"
            },
            
            firstName:
            {
                labelText: "First Name",
                labelFor: "first_name",
                id: "first_name",
                name: "first_name",
                type: "text",
                isRequired: true,
                placeholder: "First Name",
                group: "name"
            },
            otherNames:
            {
                labelText: "Other Names",
                labelFor: "other_names",
                id: "other_names",
                name: "other_names",
                type: "text",
                isRequired: false,
                placeholder: "Other Names",
                group: "name"
            },
            dob:
            {
                labelText: "Date of Birth",
                labelFor: "dob",
                id: "dob",
                name: "dob",
                type: "date",
                isRequired: true,
                placeholder: ""
            },
            maritalStatus:
            {
                labelText: "Marital Status",
                labelFor: "marital_status",
                id: "marital_status",
                name: "marital_status",
                type: "select",
                options: ["Single", "Married", "Divorced", "Widowed"],
                isRequired: false,
                placeholder: "Marital Status"
            },
            numChildren:
            {
                labelText: "Children",
                labelFor: "num_children",
                id: "num_children",
                name: "num_children",
                type: "number",
                isRequired: true,
                placeholder: "2"
            },
            idType:
            {
                labelText: "ID Type",
                labelFor: "id_type",
                id: "id_type",
                name: "id_type",
                type: "select",
                options: ["Ghana Card", "SSNIT/Biometric Card"],
                isRequired: true,
                placeholder: "ID Type"
            },
            
            idNumber:
            {
                labelText: "ID Number",
                labelFor: "id_card_number",
                id: "id_card_number",
                name: "id_card_number",
                type: "text",
                isRequired: true,
                placeholder: "ID Number"
            },
            issueDate:
            {
                labelText: "Issue Date",
                labelFor: "issue_date",
                id: "issue_date",
                name: "issue_date",
                type: "date",
                isRequired: true,
                placeholder: ""
            },
            expiryDate:
            {
                labelText: "Expiry Date",
                labelFor: "expiry_date",
                id: "expiry_date",
                name: "expiry_date",
                type: "date",
                isRequired: false,
                placeholder: ""
            },
            email:
            {
                labelText: "Email",
                labelFor: "email",
                id: "email",
                name: "email",
                type: "email",
                isRequired: true,
                placeholder: "Email",
                group: "email"
            },
            mobileNumber1:
            {
                labelText: "Mobile Number 1",
                labelFor: "mobile_no1",
                id: "mobile_no1",
                name: "mobile_no1",
                type: "phone",
                isRequired: true,
                placeholder: "Mobile Number 1",
                group: "ten_digit"

            },
            mobileNumber2:
            {
                labelText: "Mobile Number 2",
                labelFor: "mobile_no2",
                id: "mobile_no2",
                name: "mobile_no2",
                type: "phone",
                isRequired: false,
                placeholder: "Mobile Number 2",
                group: "ten_digit"
            }
        }
    },
    {
        sectionTitle:"Previous Address",
        fields:{
            residentialAddress:
            {
                labelText: "Current Residential Address",
                labelFor: "current_residential_address",
                id: "residential_address",
                name: "residential_address",
                type: "text",
                isRequired: true,
                placeholder: "Current Residential Address"
            },
            ghanaPostGPSCode:
            {
                labelText: "GhanaPost GPS Code",
                labelFor: "ghanapost_gps_code",
                id: "ghanapost_gps_code",
                name: "ghanapost_gps_code",
                type: "text",
                isRequired: true,
                placeholder: "GhanaPost GPS Code"
            },
            
            durationYears:
            {
                labelText: "Years",
                labelFor: "duration_at_address_years",
                id: "duration_at_address_years",
                name: "duration_at_address_years",
                type: "number",
                isRequired: true,
                placeholder: "0"
            },
            durationMonths:
            {
                labelText: "Months",
                labelFor: "duration_at_address_months",
                id: "duration_at_address_months",
                name: "duration_at_address_months",
                type: "number",
                isRequired: true,
                placeholder: "3"
            }
            ,
            
            numberBedrooms:
            {
                labelText: "Total Bedrooms",
                labelFor: "num_bedrooms",
                id: "num_bedrooms",
                name: "num_bedrooms",
                type: "number",
                isRequired: true,
                placeholder: "0"
            },
            rentAmount:
            {
                labelText: "Rent (Monthly) GHC",
                labelFor: "rent_monthly",
                id: "rent_monthly",
                name: "rent_monthly",
                type: "number",
                isRequired: true,
                placeholder: "0 GHC"
            },
            
            reasonMoving:
            {
                labelText: "Reason for Moving",
                labelFor: "reason_for_moving",
                id: "reason_for_moving",
                name: "reason_for_moving",
                type: "textarea",
                isRequired: true,
                placeholder: "Reason for Moving"
            },
            landlordMobile:
            {
                labelText: "Landlord Mobile Number",
                labelFor: "landlord_mobile_no",
                id: "landlord_mobile_no",
                name: "landlord_mobile_no",
                type: "phone",
                isRequired: true,
                placeholder: "Landlord Mobile Number",
                group:"ten_digit"
            },
            landlordName:
            {
                labelText: "Landlord Name",
                labelFor: "landlord_name",
                id: "landlord_name",
                name: "landlord_name",
                type: "text",
                isRequired: true,
                placeholder: "Landlord Name",
                group:"name"
            },
            
            anyPets:
            {
                labelText: "Any Pets?",
                labelFor: "any_pets",
                id: "any_pets",
                name: "any_pets",
                type: "checkbox",
                isRequired: false,
                placeholder: ""
            },
            petDescription:
            {
                labelText: "Pet Description",
                labelFor: "pet_description",
                id: "pet_description",
                name: "pet_description",
                type: "textarea",
                isRequired: false,
                placeholder: "Pet Description"
            },
            smokes:
            {
                labelText: "Do you Smoke?",
                labelFor: "smoke",
                id: "smoke",
                name: "smoke",
                type: "checkbox",
                isRequired: false,
                placeholder: ""
            },
            evited:
            {
                labelText: "Have you ever been Evicted?",
                labelFor: "evicted",
                id: "evicted",
                name: "evicted",
                type: "checkbox",
                isRequired: false,
                placeholder: ""
            },
            evictionReason:
            {
                labelText: "Eviction Reason",
                labelFor: "eviction_reason",
                id: "eviction_reason",
                name: "eviction_reason",
                type: "textarea",
                isRequired: false,
                placeholder: "Eviction Reason"
            }
        }
    },
    {
        sectionTitle:"Employment Details",
        fields:{
            currEmployer:
            {
                labelText: "Current Employer Name",
                labelFor: "current_employer_name",
                id: "current_employer_name",
                name: "current_employer_name",
                type: "text",
                isRequired: true,
                placeholder: "Current Employer Name",
                group:"name"
            },
            currEmployerEmail:
            {
                labelText: "Employer Email",
                labelFor: "employer_email",
                id: "employer_email",
                name: "employer_email",
                type: "email",
                isRequired: true,
                placeholder: "Employer Email",
                group:"email"
            },
            currEmployerContactNo:
            {
                labelText: "Employer Contact Number",
                labelFor: "employer_contact_no",
                id: "employer_contact_no",
                name: "employer_contact_no",
                type: "phone",
                isRequired: true,
                placeholder: "Employer Contact Number",
                group:"ten_digit"
            },
            staffId:
            {
                labelText: "Staff ID",
                labelFor: "staff_id",
                id: "staff_id",
                name: "staff_id",
                type: "text",
                isRequired: true,
                placeholder: "Staff ID"
            },
            employmentDate:
            {
                labelText: "Employment Date",
                labelFor: "employment_date",
                id: "employment_date",
                name: "employment_date",
                type: "date",
                isRequired: true,
                placeholder: ""
            },
            supervisorContact:
            {
                labelText: "Supervisor Contact",
                labelFor: "supervisor_contact",
                id: "supervisor_contact",
                name: "supervisor_contact",
                type: "text",
                isRequired: true,
                placeholder: "Supervisor Contact"
            },
            supervisorName:
            {
                labelText: "Supervisor Name",
                labelFor: "supervisor_name",
                id: "supervisor_name",
                name: "supervisor_name",
                type: "text",
                isRequired: true,
                placeholder: "Supervisor Name",
                group:"name"
            },            
            yearsRemaining:
            {
                labelText: "Your Years to Retirement",
                labelFor: "years_remaining",
                id: "years_remaining",
                name: "years_remaining",
                type: "number",
                isRequired: true,
                placeholder: ""
            },
            currNetIncome:
            {
                labelText: "Current Net Income (Month)",
                labelFor: "current_net_income",
                id: "current_net_income",
                name: "current_net_income",
                type: "number",
                isRequired: true,
                placeholder: "0 GHC"
            },
            otherSources:
            {
                labelText: "Other Income Sources",
                labelFor: "other_income_sources",
                id: "other_income_sources",
                name: "other_income_sources",
                type: "text",
                isRequired: false,
                placeholder: ""
            },
            otherIncomeAmount:
            {
                labelText:"Amount per Month",
                labelFor: "other_income_amount",
                id: "other_income_amount",
                name: "other_income_amount",
                type: "number",
                isRequired: false,
                placeholder: "0 GHC"
            }


        },
    },
    {
        sectionTitle:"Bank Details",
        fields:{
            bankName: {
                labelText: "Bank Name",
                labelFor: "bank_name",
                id: "bank_name",
                name: "bank_name",
                type: "text",
                isRequired: true,
                placeholder: "Bank Name"
            },
            branch:
            {
                labelText: "Branch",
                labelFor: "branch",
                id: "branch",
                name: "branch",
                type: "text",
                isRequired: true,
                placeholder: "Branch"
            },
            savingsAccount:
            {
                labelText: "Savings Account",
                labelFor: "savings_account",
                id: "savings_account",
                name: "savings_account",
                type: "text",
                isRequired: true,
                placeholder: "Savings Account"
            }
            ,
            checkingAccount: {
                labelText: "Checking Account",
                labelFor: "checking_account",
                id: "checking_account",
                name: "checking_account",
                type: "text",
                isRequired: true,
                placeholder: "Checking Account"
            },
            controllerStaffId: {
                labelText: "Controller Staff ID",
                labelFor: "checking_account_controller_details",
                id: "checking_account_controller_details",
                name: "checking_account_controller_details",
                type: "text",
                isRequired: true,
                placeholder: "Controller Staff ID"
            }
        }
    },
    {
        sectionTitle: "Preferred Location",
        fields:{
            preferredLocation1:
            {
                "labelText": "1. ",
                "labelFor": "preferred_location1",
                "id": "preferred_location1",
                "name": "preferred_location1",
                "type": "textarea",
                "isRequired": true,
                "placeholder": "Preferred Location 1"
            },
            preferredLocation2:
            {
                "labelText": "2. ",
                "labelFor": "preferred_location2",
                "id": "preferred_location2",
                "name": "preferred_location2",
                "type": "textarea",
                "isRequired": true,
                "placeholder": "Preferred Location 2"
            }
            ,
            preferredLocation3:
            {
                "labelText": "3. ",
                "labelFor": "preferred_location3",
                "id": "preferred_location3",
                "name": "preferred_location3",
                "type": "textarea",
                "isRequired": true,
                "placeholder": "Preferred Location 3"
            }
            ,
            minBedroomNumber:
            {
                "labelText": "Minimum",
                "labelFor": "min_num_bedrooms",
                "id": "min_num_bedrooms",
                "name": "min_num_bedrooms",
                "type": "number",
                "isRequired": true,
                "placeholder": "1"
            },
            maxBedroomNumber:
            {
                "labelText": "Maximum",
                "labelFor": "max_num_bedrooms",
                "id": "max_num_bedrooms",
                "name": "max_num_bedrooms",
                "type": "number",
                "isRequired": true,
                "placeholder": "1"
            }
            ,
            preferredDate:
            {
                "labelText": "How Soon Do You Need a Poperty",
                "labelFor": "preferred_move_in_date",
                "id": "preferred_move_in_date",
                "name": "preferred_move_in_date",
                "type": "date",
                "isRequired": true,
                "placeholder": ""
            }
        }
    },
    {
        sectionTitle:"References",
        fields:{
            refereeName1:{
                labelText: "Name",
                labelFor: "professional_referee_name1",
                id: "professional_referee_name1",
                name: "professional_referee_name1",
                type: "text",
                isRequired: true,
                placeholder: "Referee Name 1",
                group:"name"
            },
            refereeAddress1:{
                labelText: "Address",
                labelFor: "professional_referee_address1",
                id: "professional_referee_address1",
                name: "professional_referee_address1",
                type: "phone",
                isRequired: true,
                placeholder: "Referee Address 1"
            },
            refereePhone1:{
                labelText: "Phone",
                labelFor: "professional_referee_phone1",
                id: "professional_referee_phone1",
                name: "professional_referee_phone1",
                type: "phone",
                isRequired: true,
                placeholder: "Referee Phone 1",
                group:"referee_phone"
            },
            refereeName2:{
                labelText: "Name",
                labelFor: "professional_referee_name2",
                id: "professional_referee_name2",
                name: "professional_referee_name2",
                type: "text",
                isRequired: true,
                placeholder: "Referee Name 2"
            },
            refereeAddress2:{
                labelText: "Address",
                labelFor: "professional_referee_address2",
                id: "professional_referee_address2",
                name: "professional_referee_address2",
                type: "text",
                isRequired: true,
                placeholder: "Referee Address 2"
            },
            refereePhone2:{
                labelText: "Phone",
                labelFor: "professional_referee_phone2",
                id: "professional_referee_phone2",
                name: "professional_referee_phone2",
                type: "phone",
                isRequired: true,
                placeholder: "Referee Phone 2",
                group:"referee_phone"
            },
            emergencyContact:{
                labelText: "Name",
                labelFor: "emergency_contact_name",
                id: "emergency_contact_name",
                name: "emergency_contact_name",
                type: "text",
                isRequired: true,
                placeholder: "Emergency Contact"

            },
            emergencyContactAddress:{
                labelText: "Address",
                labelFor: "emergency_contact_address",
                id: "emergency_contact_address",
                name: "emergency_contact_address",
                type: "text",
                isRequired: true,
                placeholder: "Emergency Contact Address"
            }

            ,
            emergencyContactPhone:{
                labelText: "Phone",
                labelFor: "emergency_contact_phone",
                id: "emergency_contact_phone",
                name: "emergency_contact_phone",
                type: "text",
                isRequired: true,
                placeholder: "Emergency Contact Phone",
                group:"ten_digits"
            }
        }
    },
    {
        sectionTitle: "Declaration",
        fields:{
            
            declarationName:
            {
                labelText: "Name",
                labelFor: "declaration_name",
                id: "declaration_name",
                name: "declaration_name",
                type: "text",
                isRequired: true,
                placeholder: "Name",
                group:"name"
            },
            declarationDate:
            {
                labelText: "Date",
                labelFor: "declaration_date",
                id: "declaration_date",
                name: "declaration_date",
                type: "date",
                isRequired: true,
                placeholder: ""
            },
            declarationSignature:
            {
                labelText: "Signature",
                labelFor: "declaration_signature",
                id: "declaration_signature",
                name: "declaration_signature",
                type: "textarea",
                isRequired: true,
                placeholder: "Signature"
            },
        }
    },
    {
        sectionTitle:"Official Use",
        fields:{
            dateReceived:{
                labelText: "Date Received",
                labelFor: "date_received",
                id: "date_received",
                name: "date_received",
                type: "date",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            timeReceived:{
                labelText: "Time Received",
                labelFor: "time_received",
                id: "time_received",
                name: "time_received",
                type: "time",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            dateCompleted:{
                labelText: "Date Verification Completed",
                labelFor: "date_completed",
                id: "date_completed",
                name: "date_completed",
                type: "date",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            approved:{
                labelText: "Yes",
                labelFor: "approved",
                id: "approved",
                name: "approved",
                type: "checkbox",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            notApproved:{
                labelText: "No",
                labelFor: "not_approved",
                id: "not_approved",
                name: "not_approved",
                type: "checkbox",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            reason:{
                labelText: "Reason",
                labelFor: "reason",
                id: "reason",
                name: "reason",
                type: "textarea",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            },
            applicationNumber:{
                labelText: "Application Number",
                labelFor: "application_number",
                id: "application_number",
                name: "application_number",
                type: "text",
                isRequired: false,
                placeholder: "",
                group: "no edit"
            } 
    }
        },
]

export default rtoApplication;