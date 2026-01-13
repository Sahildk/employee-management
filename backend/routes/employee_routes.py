from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.employee import Employee

employee_bp = Blueprint('employee', __name__)

# Get database reference (will be set from app.py)
db = None

def init_routes(database):
    """Initialize routes with database connection"""
    global db
    db = database

@employee_bp.route('/api/employees', methods=['GET'])
def get_all_employees():
    """Get all employees"""
    if db is None:
        return jsonify({"error": "Database not connected. Please check MongoDB configuration."}), 503
    try:
        employees = list(db.employees.find())
        # Serialize ObjectId to string
        for emp in employees:
            emp['_id'] = str(emp['_id'])
        return jsonify(employees), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@employee_bp.route('/api/employees/<id>', methods=['GET'])
def get_employee(id):
    """Get single employee by ID"""
    if db is None:
        return jsonify({"error": "Database not connected"}), 503
    try:
        employee = db.employees.find_one({"_id": ObjectId(id)})
        if employee:
            employee['_id'] = str(employee['_id'])
            return jsonify(employee), 200
        return jsonify({"error": "Employee not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@employee_bp.route('/api/employees', methods=['POST'])
def create_employee():
    """Create new employee"""
    if db is None:
        return jsonify({"error": "Database not connected"}), 503
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'position', 'department', 'salary']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create employee object and insert
        employee = Employee.from_dict(data)
        result = db.employees.insert_one(employee.to_dict())
        
        # Return created employee
        created_employee = db.employees.find_one({"_id": result.inserted_id})
        created_employee['_id'] = str(created_employee['_id'])
        
        return jsonify(created_employee), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@employee_bp.route('/api/employees/<id>', methods=['PUT'])
def update_employee(id):
    """Update employee by ID"""
    if db is None:
        return jsonify({"error": "Database not connected"}), 503
    try:
        data = request.get_json()
        
        # Remove _id from update data if present
        data.pop('_id', None)
        
        result = db.employees.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Employee not found"}), 404
        
        # Return updated employee
        updated_employee = db.employees.find_one({"_id": ObjectId(id)})
        updated_employee['_id'] = str(updated_employee['_id'])
        
        return jsonify(updated_employee), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@employee_bp.route('/api/employees/<id>', methods=['DELETE'])
def delete_employee(id):
    """Delete employee by ID"""
    if db is None:
        return jsonify({"error": "Database not connected"}), 503
    try:
        result = db.employees.delete_one({"_id": ObjectId(id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Employee not found"}), 404
        
        return jsonify({"message": "Employee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
