from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), default='Anonymous')
    amount = db.Column(db.Float, nullable=False)