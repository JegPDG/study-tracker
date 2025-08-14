from django.contrib import admin
from .models import User
from tracker.models import Subject

class SubjectTabularInlines(admin.TabularInline):
  model = Subject
  raw_id_fields = ['user']
  autocomplete_fields = ['user']

# Register your models here.
class UserAdmin(admin.ModelAdmin):
  list_display = ['username', 'email']
  search_fields= ['username']

  inlines=[SubjectTabularInlines]

  def has_delete_permission(self, request, obj = ...):
    return True

admin.site.register(User, UserAdmin)