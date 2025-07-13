from django.contrib import messages
from django.shortcuts import render
from .forms import ApplicationForm
from .models import form


# Create your views here.

def index(request):
    if request.method == 'POST':
        appform = ApplicationForm(request.POST)
        if appform.is_valid():
            firstname = appform.cleaned_data['firstname']
            lastname = appform.cleaned_data['lastname']
            email = appform.cleaned_data['email']
            date = appform.cleaned_data['date']
            occupation = appform.cleaned_data['occupation']
            form.objects.create(firstname=firstname,lastname=lastname,email=email,date=date,occupation=occupation)
            messages.success(request, 'Form Submitted Successfully')
        else:
            messages.error(request, 'Form Submitted Failed')
    return render(request,"index.html")
