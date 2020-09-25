from django.db import models
from django.contrib.auth import get_user_model


class Stock(models.Model):
    id = models.UUIDField(primary_key=True)
    url = models.URLField()
    tickerName = models.CharField(max_length=50)


class Portfolio(models.Model):
    id = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    url = models.URLField()
    userId = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)
    holdings = models.ManyToManyField(to=Stock)
