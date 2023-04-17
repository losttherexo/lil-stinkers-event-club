#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request, session
from flask_restful import Resource, Api
from flask_migrate import Migrate

# Local imports
from config import app, db, api
from models import Fan, Ticket, Venue

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
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            dob=data['dob'],
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
            db.session.query(Ticket).filter(Ticket.fan_id == id).delete()
            fan = Fan.query.filter(Fan.id==id).first()
            db.session.delete(fan)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The fan and their tickets have been deleted'}, 200)
api.add_resource(FanByID, '/fans/<int:id>')

class Tickets(Resource):
    def get(self):
        return make_response([t.to_dict() for t in Ticket.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_ticket = Ticket(
            name=data['name'],
            age=data['age'],
        )
        db.session.add(new_ticket)
        db.session.commit()
        return {'message': '201, a new ticket has been added!'}, 201

api.add_resource(Tickets, '/tickets')

class TicketByID(Resource):
    def get(self, id):
        if id not in [t.id for t in Ticket.query.all()]:
            return {'error': '404, Ticket not Found!'}, 404

        return make_response((t for t in Ticket.query.filter(Ticket.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [t.id for t in Ticket.query.all()]:
            return {'error': '404, Ticket not Found!'}, 404

        data = request.get_json()
        ticket = Ticket.query.filter(Ticket.id==id).first()
        for key in data.keys():
            setattr(ticket, key , data[key])
        db.session.add(ticket)
        db.session.commit()
        return make_response(ticket.to_dict(), 200)

    def delete(self, id):
        if id not in [t.id for t in Ticket.query.all()]:
            return {'error': '404, Ticket not Found!'}, 404
        try:
            ticket = Ticket.query.filter(Ticket.id==id).first()
            db.session.delete(ticket)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The ticket has been deleted'}, 200)
api.add_resource(TicketByID, '/tickets/<int:id>')

class Venues(Resource):
    def get(self):
        return make_response([v.to_dict() for v in Venue.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_venue = Venue(
            name=data['name'],
            age=data['age'],
        )
        db.session.add(new_venue)
        db.session.commit()
        return {'message': '201, a new venue has been added!'}, 201

api.add_resource(Venues, '/venues')

class VenueByID(Resource):
    def get(self, id):
        if id not in [v.id for v in Venue.query.all()]:
            return {'error': '404, Venue not Found!'}, 404

        return make_response((v for v in Venue.query.filter(Venue.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [v.id for v in Venue.query.all()]:
            return {'error': '404, Venue not Found!'}, 404

        data = request.get_json()
        venue = Venue.query.filter(Venue.id==id).first()
        for key in data.keys():
            setattr(venue, key , data[key])
        db.session.add(venue)
        db.session.commit()
        return make_response(venue.to_dict(), 200)

    def delete(self, id):
        if id not in [v.id for v in Venue.query.all()]:
            return {'error': '404, Venue not Found!'}, 404
        try:
            db.session.query(Ticket).filter(Ticket.fan_id == id).delete()
            venue = Venue.query.filter(Venue.id==id).first()
            db.session.delete(venue)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The venue has been deleted'}, 200)
api.add_resource(VenueByID, '/venues/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
