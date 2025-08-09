from django.db import models

# Create your models here.
class Product(models.Model):
    img = models.FileField(upload_to='product/')
    name = models.CharField(max_length=30)

    @property
    def imageURL(self):
        image = self.img
        if image:
            return image.url
        return None
    
    def __str__(self):
        return f"{self.name}"
    