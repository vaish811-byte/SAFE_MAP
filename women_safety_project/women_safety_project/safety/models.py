
from django.db import models

class TrustedContact(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name} - {self.phone_number}"


# Create your models here.
