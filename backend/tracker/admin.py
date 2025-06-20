from django.contrib import admin
from .models import Subject, Notes

# Register your models here.

# Inlines

class NotesTabularInlines(admin.TabularInline):
  model = Notes
  raw_id_fields = ['subject']
  autocomplete_fields = ['subject']



# Admin Models

class SubjectAdmin(admin.ModelAdmin):
  list_display = ['name', 'description', 'user', 'created_at']
  search_fields = ['name', 'description']

  inlines = [NotesTabularInlines]

  def has_delete_permission(self, request, obj=None):
    return True
  
class NotesAdmin(admin.ModelAdmin):
  list_display = ['subject', 'title', 'content', 'created_at', 'updated_at']

  def has_delete_permission(self, request, obj = None):
    return True
  

admin.site.register(Subject, SubjectAdmin)
admin.site.register(Notes, NotesAdmin)