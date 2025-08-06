from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Application, Receipt, Property, Developer, Notification, \
    TenantInfo, DeveloperProject, CustomUser, AdminNotifications, TenantNotifications, UserFinancialModel, PropertyPaymentTracker, PropertyPenaltyTracker




User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def validate_id(developer_id):
        if type(developer_id) == int:
            return True

        return False


class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = '__all__'

    def validate_id(developer_id):
        if type(developer_id) == int:
            return True

        return False


class DeveloperProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeveloperProject
        fields = '__all__'

    def validate_id(id):
        if type(id) == int:
            return True

        return False


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

    def validate_id(id):
        if type(id) == int:
            return True

        return False




    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['expected_rent_info'] = {
            'expected_rent': instance.expected_rent,
            'annual_rent': instance.annual_rent,
            'current_monthly': instance.current_monthly,
            'interest_rate': instance.interest_rate,
            'rent_description': instance.rent_description
        }
        return rep

    def update(self, instance, validated_data):
        instance.expected_rent = validated_data.get('expected_rent', instance.expected_rent)
        instance.annual_rent = validated_data.get('annual_rent', instance.annual_rent)
        instance.current_monthly = validated_data.get('current_monthly', instance.current_monthly)
        instance.interest_rate = validated_data.get('interest_rate', instance.interest_rate)
        instance.rent_description = validated_data.get('rent_description', instance.rent_description)
        instance.save()
        return instance


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'


    def create(self, validated_data):
        receipt_number = validated_data.get('receipt_number')
        if Receipt.objects.filter(receipt_number=receipt_number).exists():
            raise serializers.ValidationError("Receipt with this number already exists.")
        return super().create(validated_data)


# ---------------------------------- APPLICATION -----------------------------------------------------------------

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.date_verification_completed = validated_data.get('date_verification_completed',
                                                                  instance.date_verification_completed)
        instance.approved = validated_data.get('approved', instance.approved)
        instance.approval_reason = validated_data.get('approval_reason', instance.approval_reason)
        instance.save()
        return instance

    def to_representation(self, instance):
        return super().to_representation(instance)


# ---------------------------------- TENANT INFO  -----------------------------------------------------------------
class TenantInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantInfo
        fields = '__all__'


# ---------------------------------- NOTIFICATIONS  -----------------------------------------------------------------
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class AdminNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotifications
        fields = '__all__'

class TenantNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantNotifications
        fields = '__all__'

# ---------------------------------- FINANCIAL MODEL  -----------------------------------------------------------------
class UserFinancialModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFinancialModel
        fields = '__all__'




# Todo: check out how smpt works wth microsoft specific mail client,
# how to do a serialser specifc to a model checking for the validation of all fields and returning a curated error message
#  e.g if it is an email notification but email is misisng dont cretae mnotifcation, rathe return an eror 
# implement finding client's email address to make it smoother for sending mail to cleint without stress on the fornt end
#

class PenaltyTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyPenaltyTracker
        fields = '__all__'

class PropertyPaymentTrackerSerializer (serializers.ModelSerializer):
    class Meta:
        model = PropertyPaymentTracker
        fields = '__all__'
