from django.shortcuts import render
from django.views import generic

from restaurant.models import items,MEAL_TYPE


# Create your views here.
class MenuList(generic.ListView):
    queryset = items.objects.order_by("-date_created")
    template_name = "index.html"
    def get_context_data(self,**kwargs):
        context=super().get_context_data(**kwargs)
        context["meals"] =MEAL_TYPE
        return context



class MenuDetail(generic.DetailView):
    model = items
    template_name = "detail.html"
