#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request, session
from flask_restful import Resource, Api
from flask_migrate import Migrate

# Local imports
from config import app, db, api
from models import User, Recipe

# Views go here!
class HomePage(Resource):
    def get(self):
        return ''

if __name__ == '__main__':
    app.run(port=5555, debug=True)
