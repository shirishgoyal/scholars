web: newrelic-admin run-program gunicorn --pythonpath="$PWD/scholars" wsgi:application
worker: python scholars/manage.py rqworker default