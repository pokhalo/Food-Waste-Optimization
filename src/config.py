import os
from os.path import dirname
from dotenv import load_dotenv

dirname = os.path.dirname(__file__)

try:
    load_dotenv(dotenv_path=os.path.join(dirname, '..', '.env'))
except FileNotFoundError:
    pass

SECRET_KEY = "default"

class DefaultConfiguration:
    DEBUG = False
    TESTING = False
    global SECRET_KEY
    SECRET_KEY = "default"
    print("Default Configuration Loaded", flush=True)

class DevelopmentConfiguration(DefaultConfiguration):
    DEBUG = True
    global SECRET_KEY
    SECRET_KEY = os.getenv('DEVELOPMENT_KEY')
    print("Development Configuration Loaded", flush=True)

class TestingConfiguration(DefaultConfiguration):
    TESTING = True
    print("Testing Configuration Loaded", flush=True)

class ProductionConfiguration(DefaultConfiguration):
    DEBUG = False
    TESTING = False
    global SECRET_KEY
    SECRET_KEY = os.getenv('PRODUCTION_KEY')
    print("Production Configuration Loaded", flush=True)

config = {
    'development': DevelopmentConfiguration,
    'testing': TestingConfiguration,
    'production': ProductionConfiguration,
    'default': DefaultConfiguration
}
