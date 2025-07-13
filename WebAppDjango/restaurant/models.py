from django.contrib.auth.models import User
from django.db import models

# Create your models here.
MEAL_TYPE = (
    ("starters","Starters"),
    ("salads","Salads"),
    ("main_dishes","Main Dishes"),
    ("desserts","Desserts"),
)

STATUS= (
    (0,"Unavailable"),
    (1,"Available")
)

class items(models.Model):
    meal = models.CharField(max_length=100,unique=True)
    description = models.CharField(max_length=2000)
    price = models.DecimalField(decimal_places=2,max_digits=10)
    meal_type = models.CharField(max_length=100,choices=MEAL_TYPE)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS,default=1)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.meal
