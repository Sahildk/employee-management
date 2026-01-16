import sys
import pytest

# Explicitly tell Python where the backend code lives inside Docker
sys.path.append("/app")

from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'
    assert response.json['message'] == 'Employee Management API is running'


def test_root_endpoint(client):
    """Test the root endpoint"""
    response = client.get('/')
    assert response.status_code == 200
    assert response.json['version'] == '1.0.0'
