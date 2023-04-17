#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request, session
from flask_restful import Resource, Api
from flask_migrate import Migrate

# Local imports
from config import app, db, api
from models import Fan

# Views go here!
class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200

api.add_resource(HomePage, '/')

class Fans(Resource):
    def get(self):
        return make_response([f.to_dict() for f in Fan.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_fan = Fan(
            name=data['name'],
            age=data['age'],
        )
        db.session.add(new_fan)
        db.session.commit()
        return {'message': '201, a new fan has been added!'}, 201

api.add_resource(Fans, '/fans')

class FanByID(Resource):
    def get(self, id):
        if id not in [f.id for f in Fan.query.all()]:
            return {'error': '404, Fan not Found!'}, 404

        return make_response((f for f in Fan.query.filter(Fan.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [f.id for f in Fan.query.all()]:
            return {'error': '404, Fan not Found!'}, 404

        data = request.get_json()
        fan = Fan.query.filter(Fan.id==id).first()
        for key in data.keys():
            setattr(fan, key , data[key])
        db.session.add(fan)
        db.session.commit()
        return make_response(fan.to_dict(), 200)

    def delete(self, id):
        if id not in [f.id for f in Fan.query.all()]:
            return {'error': '404, Fan not Found!'}, 404
        try:
            db.session.query(Concert).filter(Concert.fan_id == id).delete()
            fan = Fan.query.filter(Fan.id==id).first()
            db.session.delete(fan)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The fan and their intended concert have been deleted'}, 200)
api.add_resource(FanByID, '/fans/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
