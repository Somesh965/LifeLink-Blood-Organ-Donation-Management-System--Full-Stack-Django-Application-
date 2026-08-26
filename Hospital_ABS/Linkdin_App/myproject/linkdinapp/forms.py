from django.forms import ModelForm

from linkedapp.models import StudentsModel


class StudentForm(ModelForm):
    class Meta:
        model = StudentsModel
        fields = ['name', 'age', 'marks', 'education', 'college']