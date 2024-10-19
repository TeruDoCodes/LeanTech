from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from .models import Cart  # Import the Cart model


views = Blueprint('views', __name__)

@views.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    if 'user_id' not in session:
        flash('You must be logged in to add items to the cart.', category='error')
        return redirect(url_for('auth.relog'))

    user_id = session['user_id']
    Cart.add_to_cart(user_id, product_id)
    flash('Item added to cart!', category='success')
    return redirect(url_for('views.shop'))

@views.route('/')
def home():
    return render_template('home.html')

@views.route('/shop')
def shop():
    return render_template('shop.html')

@views.route('/about')
def about():
    return render_template('about.html')

@views.route('/contact')
def contact():
    return render_template('contact.html')
