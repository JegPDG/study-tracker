from django.core.management import BaseCommand
from faker import Faker
from tracker.models import Subject, Notes
from users.models import User

fake = Faker()

class Command(BaseCommand):
  help ='Genrate Subject and Notes. Command should be python manage.py create_fake_data --user 10 --subject 10 --notes 10'

  def add_arguments(self, parser):
        parser.add_argument(
            '--user',
            type=int,
            default=5,
            help='Number of users to generate is (default is 10)',
        )
        parser.add_argument(
            '--subjects',
            type=int,
            default=10,
            help='Number of users to generate is (default is 10)',
        )
        parser.add_argument(
            '--notes',
            type=int,
            default=10,
            help='Number of users to generate is (default is 10)',
        )
  
  def handle(self, *args, **options):
      user_count = options['user']
      subject_count = options['subjects']
      notes_count = options['notes']

      users = []

      # for _ in range(users):
          
           




      return super().handle(*args, **options)