from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.contrib import messages
from django.views.generic import CreateView, UpdateView, DeleteView
from .models import Appointment
from .forms import AppointmentForm



# # Create your views here.
# # def homepage(request):
# #     appointments=Appointment.objects.all()
# #     return render(request, 'Hospital_App/home.html',context=appointments)
# #
# # def  appointment_listpage(request):
# #     appointments = Appointment.objects.all()
# #     return render(request, 'Hospital_App/appointment_list',context=appointments)
# #
# # def appointment_detailpage(request):
# #     appointments=Appointment.objects.all()
# #     return render(request, 'Hospital_App/appointment_detail',contax=appointments)
# #
# # class Appointmentcreateview(CreateView):
# #     queryset =


def home(request):
    total_appointments = Appointment.objects.count()
    booked_count = Appointment.objects.filter(status='Booked').count()
    completed_count = Appointment.objects.filter(status='Completed').count()
    cancelled_count = Appointment.objects.filter(status='Cancelled').count()
    recent_appointments = Appointment.objects.all()[:5]

    context = {
        'total_appointments': total_appointments,
        'booked_count': booked_count,
        'completed_count': completed_count,
        'cancelled_count': cancelled_count,
        'recent_appointments': recent_appointments,
    }
    return render(request, 'home.html', context)


def appointment_list(request):
    appointments = Appointment.objects.all()

    status_filter = request.GET.get('status')
    department_filter = request.GET.get('department')

    if status_filter:
        appointments = appointments.filter(status=status_filter)
    if department_filter:
        appointments = appointments.filter(department=department_filter)

    context = {
        'appointments': appointments,
        'status_choices': Appointment.Status_Choice,
        'department_choices': Appointment.Department_choice,
        'selected_status': status_filter or '',
        'selected_department': department_filter or '',
    }
    return render(request, 'appointment_list.html', context)


def appointment_detail(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    context = {
        'appointment': appointment,
    }
    return render(request, 'appointment_detail.html', context)
class AppointmentCreateView(CreateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'appointment_form.html'
    success_url = reverse_lazy('appointment-list')

    def form_valid(self, form):
        messages.success(self.request, "Appointment booked successfully!")
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form_title'] = 'Book an Appointment'
        context['button_label'] = 'Book Appointment'
        return context


class AppointmentUpdateView(UpdateView):
    model = Appointment
    form_class = AppointmentForm
    template_name = 'appointment_form.html'
    success_url = reverse_lazy('appointment-list')

    def form_valid(self, form):
        messages.success(self.request, "Appointment updated successfully!")
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form_title'] = 'Update Appointment'
        context['button_label'] = 'Save Changes'
        return context


class AppointmentDeleteView(DeleteView):
    model = Appointment
    template_name = 'appointment_confirm_delete.html'
    success_url = reverse_lazy('appointment-list')
    context_object_name = 'appointment'

    def form_valid(self, form):
        messagfres.success(self.request, "Appointment deleted successfully!")
        return super().form_valid(form)