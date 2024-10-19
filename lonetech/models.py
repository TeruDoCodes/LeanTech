import mysql.connector
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='lonetech'
    )

class Customer(UserMixin):
    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password_hash = generate_password_hash(password)
        self.date_joined = datetime.utcnow()

    @staticmethod
    def create_customer(email, username, password):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO customer (email, username, password_hash, date_joined) VALUES (%s, %s, %s, %s)",
                       (email, username, generate_password_hash(password), datetime.utcnow()))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def verify_password(stored_password_hash, password):
        return check_password_hash(stored_password_hash, password)

class Product:
    def __init__(self, product_name, current_price, previous_price, in_stock, product_picture, flash_sale=False):
        self.product_name = product_name
        self.current_price = current_price
        self.previous_price = previous_price
        self.in_stock = in_stock
        self.product_picture = product_picture
        self.flash_sale = flash_sale
        self.date_added = datetime.utcnow()

    @staticmethod
    def add_product(product_name, current_price, previous_price, in_stock, product_picture, flash_sale=False):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO product (product_name, current_price, previous_price, in_stock, product_picture, flash_sale, date_added) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (product_name, current_price, previous_price, in_stock, product_picture, flash_sale, datetime.utcnow()))
        conn.commit()
        cursor.close()
        conn.close()

        # models.py

class Cart:
    @staticmethod
    def add_to_cart(user_id, product_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO cart (user_id, product_id) VALUES (%s, %s)", (user_id, product_id))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_cart_items(user_id):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return items


# Similar changes would be required for Cart and Order classes
