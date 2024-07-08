import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'mysql://user:password@db/dbname')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    apellido = db.Column(db.String(80), nullable=False)
    dni = db.Column(db.String(20), nullable=False)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'nombre': user.nombre, 'apellido': user.apellido, 'dni': user.dni} for user in users])

@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        new_user = User(nombre=data['nombre'], apellido=data['apellido'], dni=data['dni'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User added successfully'}), 201
    except Exception as e:
        db.session.rollback()  # Revertir cualquier cambio en caso de error
        print(f"Error: {e}")  # Imprimir el error en los logs
        return jsonify({'message': 'Failed to add user', 'error': str(e)}), 500

@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'})
        return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        db.session.rollback()  # Revertir cualquier cambio en caso de error
        print(f"Error: {e}")  # Imprimir el error en los logs
        return jsonify({'message': 'Failed to delete user', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
