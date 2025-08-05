from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    """
    Manages the CustomUser class and allows for the creation of regular
    and superusers
    """

    def create_user(self, email, password = None, **extra_fields):
        """ Creates and saves a regular user using the given email
        and password

        :param email: The users email address
        :param password: The users password
        :param extra_fields: Extra fields for a regular user"""

        if not email:
            raise ValueError('The Email field has not been set')

        # Normalize and Set account details
        email = self.normalize_email(email).lower()
        user = self.model(email = email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password = None, **extra_fields):
        """ Creates and saves a super user using the given email and password

        :param email: The users email address
        :param password: The users password
        :param extra_fields: Extra fields for a regular user"""

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # Check that appropriate permissions are set
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        # Create the user
        user = self.create_user(email, password, **extra_fields)

        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """A custom user class for the platform. Will serve
    as the base class for admins, superadmins, estate developers
    and software engineers """

    # Define fields for the custom user table
    username = None
    email = models.EmailField(max_length=50, unique=True)
    f_name = models.CharField(max_length=100)
    l_name = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100)
    dob = models.DateTimeField(null=True, blank=True)
    nationalID = models.CharField(max_length=15, null=False, blank=False, unique=True)

    # Declare user type choices
    USER_TYPE_CHOICES = (('tenant','Tenant'), ('estate_developers','Estate Developer'),
                         ('gcb_admin','GCB Admin'),('gcb_superadmin','GCB SuperAdmin'),
                         ('software_engineer', 'Software Eng'))

    user_type = models.CharField(max_length=17, choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False, null=True, blank=True)
    is_superuser = models.BooleanField(default=False) #TODO clarify these
    is_active = models.BooleanField(default=True, blank=True) #TODO clarify these
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    session_token = models.CharField(max_length=10, default=0)

    # Set required fields
    REQUIRED_FIELDS = [email, f_name, l_name, dob, nationalID, user_type, is_staff,
                       is_superuser, created_at]

    objects = UserManager()

    class Meta(AbstractBaseUser.Meta):
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.email

