from django.db import models

# Create your models here.
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    class Meta:
        db_table = "task"

    def __str__(self):
        return self.description