from flask import request, jsonify
import sqlite3

def init_routes(app):
    @app.route('/donate', methods=['POST'])
    def donate():
        data = request.form
        name = data.get('name', 'Anonymous').strip()
        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({'status': 'error', 'message': 'Amount must be positive.'}), 400
        except ValueError:
            return jsonify({'status': 'error', 'message': 'Invalid amount.'}), 400

        # Store donation
        with sqlite3.connect('donations.db') as conn:
            conn.execute('INSERT INTO donations (name, amount) VALUES (?, ?)', (name, amount))
            conn.commit()

        return jsonify({'status': 'success', 'message': 'Thank you for your donation!'})

    @app.route('/total_donations', methods=['GET'])
    def total_donations():
        with sqlite3.connect('donations.db') as conn:
            total = conn.execute('SELECT SUM(amount) FROM donations').fetchone()[0] or 0
        return jsonify({'total': total})

    @app.route('/recent_donations', methods=['GET'])
    def recent_donations():
        with sqlite3.connect('donations.db') as conn:
            donations = conn.execute('SELECT name, amount FROM donations ORDER BY id DESC LIMIT 5').fetchall()
        return jsonify([{'name': name, 'amount': amount} for name, amount in donations])