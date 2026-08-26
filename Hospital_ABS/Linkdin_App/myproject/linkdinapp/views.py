from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView
from rest_framework import viewsets, serializers
from rest_framework.response import Response

from linkdinapp.forms import StudentForm
from linkdinapp.models import StudentsModel
from linkdinapp.serializers import StudentSerializers


class StudentViewSet(viewsets.ModelViewSet):
    queryset = StudentsModel.objects.all()
    serializer_class = StudentSerializers




# def home(request):
#     students=StudentsModel.objects.all()
#
#     return render(request,'linkedapp/home.html',{'stu':students, 'form':StudentForm()})
# class chinnaMixin(LoginRequiredMixin):
#     def dispatch(self, request, *args, **kwargs):
#         print("chinna mixin working")
#         return super(chinnaMixin, self).dispatch(request, *args, **kwargs)
#
#
# class HomePageView(chinnaMixin, ListView):
#     model = StudentsModel
#     template_name = 'linkedapp/home.html'
#     context_object_name = 'stu'
#
#
# # def student(request,id):
# #     stud=StudentsModel.objects.get(id=id)
# #     return render(request,'linkedapp/student.html',{'stu':stud})
#
# class StudentView(DetailView):
#     model = StudentsModel
#     template_name = 'linkedapp/student.html'
#     context_object_name = 'stu'
#
# # def editStudent(request,id):
# #     student=StudentsModel.objects.get(id=id)
# #     if request.method == "POST":
# #         form = StudentForm(request.POST, instance=student)
# #         if form.is_valid():
# #             form.save()
# #             return redirect("home")
# #     else:
# #         form = StudentForm(instance=student)
# #
# #     return render(request, "linkedapp/form.html", {"form": form, "student": student})
#
# class StudentUpdateView(UpdateView):
#     model = StudentsModel
#     form_class = StudentForm
#     template_name = 'linkedapp/form.html'
#     context_object_name = 'form'
#     success_url = reverse_lazy('home')
#
#
#
# # def addStudent(request):
# #     if request.method == "POST":
# #         print(request.POST)
# #         form = StudentForm(request.POST)
# #         if form.is_valid():
# #             form.save()
# #             return redirect(home)
# #     else:
# #         form = StudentForm()
# #     return render(request, "linkedapp/form.html", {"form": form})
# class AddStudentView(CreateView):
#     model = StudentsModel
#     form_class = StudentForm
#     template_name = 'linkedapp/form.html'
#     context_object_name = 'form'
#     success_url = reverse_lazy('home')
# class StudentDeleteView(DeleteView):
#     model = StudentsModel
#     template_name = 'linkedapp/delete.html'
#     context_object_name = 'student'
#     success_url = reverse_lazy('home')
#
# # def deleteStudent(request,id):
# #     student=StudentsModel.objects.get(id=id)
# #     if request.method == "POST":
# #         student.delete()
# #         return redirect(home)
# #     return render(request, "linkedapp/delete.html", {"student": student})
#
#
# # class Based Views