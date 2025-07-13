from django import  forms


class ApplicationForm(forms.Form):
    firstname = forms.CharField(max_length=100)
    lastname = forms.CharField(max_length=100)
    email = forms.EmailField()
    date = forms.DateField()
    occupation = forms.CharField(max_length=100)