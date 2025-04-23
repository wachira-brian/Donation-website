from flask import Flask, render_template
from flask_wtf.csrf import CSRFProtect
from donations import init_routes

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with a secure key
csrf = CSRFProtect(app)

# Initialize donation routes
init_routes(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')
    

if __name__ == '__main__':
    app.run(debug=True)