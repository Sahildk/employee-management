from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from routes.employee_routes import employee_bp, init_routes
from prometheus_flask_exporter import PrometheusMetrics

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# Initialize Prometheus Metrics
metrics = PrometheusMetrics(app, path='/metrics')
metrics.info('app_info', 'Application info', version='1.0.0')

CORS(app)  # Enable CORS for frontend communication

# MongoDB Atlas connection
MONGODB_URI = os.getenv('MONGODB_URI')
PORT = int(os.getenv('PORT', 5000))

try:
    client = MongoClient(MONGODB_URI)
    db = client['employee_management']  # Database name
    
    # Test connection
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB Atlas!")
    
    # Initialize routes with database
    init_routes(db)
    
except Exception as e:
    print(f"❌ Error connecting to MongoDB: {e}")
    db = None

# Register blueprints
app.register_blueprint(employee_bp)

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Employee Management API is running",
        "database": "connected" if db is not None else "disconnected"
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "message": "Employee Management System API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "employees": "/api/employees",
            "employee_by_id": "/api/employees/<id>"
        }
    }), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=PORT, debug=False)