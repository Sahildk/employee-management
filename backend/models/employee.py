from bson import ObjectId
from datetime import datetime

class Employee:
    """Employee model for MongoDB"""
    
    def __init__(self, name, email, position, department, salary, hire_date=None):
        self.name = name
        self.email = email
        self.position = position
        self.department = department
        self.salary = salary
        self.hire_date = hire_date or datetime.now().strftime("%Y-%m-%d")
    
    def to_dict(self):
        """Convert employee object to dictionary"""
        return {
            "name": self.name,
            "email": self.email,
            "position": self.position,
            "department": self.department,
            "salary": self.salary,
            "hire_date": self.hire_date
        }
    
    @staticmethod
    def from_dict(data):
        """Create employee object from dictionary"""
        return Employee(
            name=data.get("name"),
            email=data.get("email"),
            position=data.get("position"),
            department=data.get("department"),
            salary=data.get("salary"),
            hire_date=data.get("hire_date")
        )
    
    @staticmethod
    def serialize_doc(doc):
        """Serialize MongoDB document to JSON-friendly format"""
        if doc:
            doc["_id"] = str(doc["_id"])
            return doc
        return None
