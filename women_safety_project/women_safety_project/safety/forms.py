from django import forms
from .models import TrustedContact

class ContactForm(forms.ModelForm):
    class Meta:
        model = TrustedContact
        fields = ['name', 'phone_number']


class TrustedContactForm(forms.Form):
    name = forms.CharField(label="Name")
    phone_number = forms.CharField(label="Phone Number")
