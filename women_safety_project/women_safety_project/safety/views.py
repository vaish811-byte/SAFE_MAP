

# Create your views here.
from django.shortcuts import render, redirect
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'index.html', {'form': ContactForm(), 'success': True})
    else:
        form = ContactForm()
    return render(request, 'index.html', {'form': form})


from .forms import TrustedContactForm

def home(request):
    success = False
    if request.method == 'POST':
        form = TrustedContactForm(request.POST)
        if form.is_valid():
            form.save()  # Save trusted contact
            success = True
            form = TrustedContactForm()  # Reset form
    else:
        form = TrustedContactForm()

    return render(request, 'index.html', {
        'form': form,
        'success': success
    })


# views.py
# safety/views.py




def chat_support(request):
    return render(request, 'chat_support.html')
