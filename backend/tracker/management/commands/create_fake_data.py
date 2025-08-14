from django.core.management import BaseCommand
from faker import Faker
from tracker.models import Subject, Notes
from users.models import User

fake = Faker()

class Command(BaseCommand):
  help ='Genrate Subject and Notes. Command should be python manage.py create_fake_data --users 10 --subjects 10 --notes 10'

  def add_arguments(self, parser):
        parser.add_argument(
            '--users',
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
      user_count = options['users']
      subject_count = options['subjects']
      notes_count = options['notes']

      users = []

      for _ in range(user_count):
          user = User.objects.create_user(
              username=fake.unique.user_name(),
              email=fake.unique.email(),
              password='password'
          )      
          users.append(user)

      self.stdout.write(self.style.NOTICE('Successfully added fake users!'))
      
      for i in range(user_count):
        self.stdout.write(self.style.NOTICE(f'users: {users[i].username}'))

      for user in users:
          self.stdout.write(self.style.NOTICE(f'user:{user.username}')) 
          for _ in range(subject_count):
            subject = Subject.objects.create(
                name=fake.sentence(nb_words=4),
                description=fake.sentence(nb_words=30),
                user=user
            )
          
            self.stdout.write(self.style.NOTICE(f'subject:{subject.name}'))


            for _ in range(notes_count):
                note = Notes.objects.create(
                    subject=subject,
                    title=fake.sentence(nb_words=5),
                    content=fake.paragraph(nb_sentences=10)
                )
                self.stdout.write(self.style.NOTICE(f'note:{note.title}'))

      self.stdout.write(self.style.SUCCESS(f'Successfully created {user_count} users with {subject_count} subjects and {notes_count} notes'))
      