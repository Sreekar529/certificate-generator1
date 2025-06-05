import os

class Config:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    TEMPLATE_PATH = os.path.join(BASE_DIR, 'static', 'templates')
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    BACKGROUND_PATH = os.path.join(BASE_DIR, 'static', 'backgrounds')
    
    # Certificate generation settings
    FONT_SIZE = 1.5  # Reduced from 3.0 to a more reasonable size
    FONT_COLOR = (0, 0, 0)  # Black in BGR
    X_OFFSET = 400  # Adjusted for better centering
    Y_OFFSET = 300  # Adjusted for better vertical positioning
    
    # Available fonts
    AVAILABLE_FONTS = [
        'Arial',
        'Times New Roman',
        'Calibri',
        'Verdana',
        'Helvetica'
    ]
    
    # Available colors
    AVAILABLE_COLORS = [
        {'name': 'Black', 'value': '#000000'},
        {'name': 'Blue', 'value': '#0000FF'},
        {'name': 'Red', 'value': '#FF0000'},
        {'name': 'Green', 'value': '#008000'},
        {'name': 'Purple', 'value': '#800080'}
    ]
    
    # File upload settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {
        'png', 'jpg', 'jpeg', 'gif',  # Images
        'pdf',  # PDF files
        'doc', 'docx',  # Word documents
        'xls', 'xlsx',  # Excel files
        'csv'  # CSV files
    }
    
    # Security settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # Background images
    BACKGROUND_IMAGES = {
        'welcome': 'space1.jpg',
        'single': 'space2.jpg',
        'bulk': 'space3.jpg',
        'custom': 'space4.jpg',
        'tools': 'space5.jpg'
    }