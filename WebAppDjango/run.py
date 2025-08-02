# run.py
import os
import sys
from django.core.management import execute_from_command_line

# Set environment variable for settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookstore.settings")

# Custom default arguments: host:port
sys.argv = ["manage.py", "runserver", "0.0.0.0:8059"]

# Run the server
execute_from_command_line(sys.argv)
