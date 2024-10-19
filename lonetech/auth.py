from flask import Blueprint, render_template, session, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from .models import Customer
from mysql.connector import connect, Error

auth = Blueprint('auth', __name__)

# Connect to the database (reused)
def get_db_connection():
    return connect(
        host='localhost',
        user='root',
        password='',
        database='lonetech'
    )

# Login Route
@auth.route('/my-account', methods=['GET', 'POST'])
def relog():
    if request.method == 'POST':
        form_id = request.form['form_id']

        # Login logic
        if form_id == "Login":
            email = request.form.get('email')
            password = request.form.get('password')

            # Fetch user data from the database
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM customer WHERE email = %s", (email,))
            user = cursor.fetchone()
            cursor.close()
            conn.close()

            if user:
                if check_password_hash(user['password_hash'], password):
                    session['username'] = user['username']
                    session['user_id'] = user['id']
                    return redirect(url_for('views.home'))
                else:
                    flash('Incorrect Email or Password', category='error')
            else:
                flash('User does not exist', category='error')  

        # Register logic
        elif form_id == "Register":
            username = request.form.get('username')
            email = request.form.get('email')
            password = request.form.get('password')

            # Validate email format
            if '@' not in email:
                flash('Error: Please provide a valid email address.', category='error')
            else:
                conn = get_db_connection()
                cursor = conn.cursor()

                # Check if the email is already registered
                cursor.execute("SELECT * FROM customer WHERE email = %s", (email,))
                existing_user = cursor.fetchone()

                # Check if the username is already taken
                cursor.execute("SELECT * FROM customer WHERE username = %s", (username,))
                existing_username = cursor.fetchone()

                if existing_user:
                    flash('Email already registered', category='error')
                elif existing_username:
                    flash('Username already taken', category='error')
                else:
                    # Register the user
                    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
                    cursor.execute("INSERT INTO customer (email, username, password_hash, date_joined) VALUES (%s, %s, %s, NOW())",
                                   (email, username, hashed_password))
                    conn.commit()
                    flash('Account created successfully', category='success')

                cursor.close()
                conn.close()

    return render_template('login.html')

@auth.route('/logout')
def logout():
    session.pop('username', None)  # Remove the username from session
    flash('You have been logged out.', category='success')
    return redirect(url_for('auth.relog'))