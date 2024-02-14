from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


# Create your views here.

@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = Task.objects.get(description=request.data['description'])
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def task_byid(request, id):
    task = Task.objects.filter(category_id=id).first()
    if task is not None:
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response("Not found", status=status.HTTP_200_OK)


@api_view(['PUT'])
def task_update(request):
    task = get_object_or_404(Task, task_id=request.data["task_id"])
    serializer = TaskSerializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def task_delete(request, id):
    task = get_object_or_404(Task, task_id=id)
    task.delete()
    return Response("Record has been deleted successfully.", status=status.HTTP_200_OK)
