from flask import Flask
from mysql.connector import connect, Error

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hashdhwdj whahsdhwa wea'

    # Connect to the database (you can put this in a separate function)
    try:
        conn = connect(
            host='localhost',
            user='root',
            password='',
            database='lonetech'
        )
        print('Database connection successful')
    except Error as e:
        print(f"Error: {e}")

    from .views import views
    from .auth import auth
    from .admin import admin

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/')

    return app
