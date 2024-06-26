"""Launches the application.
    """
# from ..app.app import create_app

# app = create_app()

from ..app.app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0')
