from django.urls import path
from . import views

urlpatterns = [
    path('task-create/', views.task_create, name="task create"),
    path('task-list/', views.task_list, name="task list"),
    path('task/<int:id>', views.task_byid, name="task by id"),
    path('task-update/', views.task_update, name="task update"),
    path('task-delete/<int:id>', views.task_delete, name="task delete")
]
