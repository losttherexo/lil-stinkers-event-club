#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request, session
from flask_restful import Resource, Api
from flask_migrate import Migrate

# Local imports
from config import app, db, api
from models import Fan, Ticket, Venue, Event

# Views go here!
class HomePage(Resource):
    def get(self):
        return {'message': '200: Welcome to our Home Page'}, 200

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        user = Fan.query.filter(Fan.username == username).first()

        if user:

            session['fan_id'] = user.id
            return user.to_dict(), 200

        return {}, 401

class Logout(Resource):

    def delete(self):

        session['fan_id'] = None

        return {}, 204

class CheckSession(Resource):

    def get(self):

        user_id = session['fan_id']
        if user_id:
            user = Fan.query.filter(Fan.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401

class ClearSession(Resource):

    def delete(self):

        session['page_views'] = None
        session['user_id'] = None

        return {}, 204


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

class Tickets(Resource):
    def get(self):
        return make_response([t.to_dict() for t in Ticket.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_ticket = Ticket(
            event_name=data['event_name'],
            date=data['date'],
            description=data['description'],
            age_restriction=data['age_restriction'],
            fan_id=data['fan_id'],
            venue_id=data['venue_id']
        )
        db.session.add(new_ticket)
        db.session.commit()
        return {'message': '201, a new ticket has been added!'}, 201

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

class Venues(Resource):
    def get(self):
        return make_response([v.to_dict() for v in Venue.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_venue = Venue(
            name=data['name'],
            location=data['location'],
            capacity=data['capacity']
        )
        db.session.add(new_venue)
        db.session.commit()
        return {'message': '201, a new venue has been added!'}, 201

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

# class Carts(Resource):
#     def get(self):
#         return make_response([cart.to_dict() for cart in Cart.query.all()], 200)

#     def post(self):
#         data = request.get_json()
#         new_item = Cart(
#             name=data['name'],
#             location=data['location'],
#             capacity=data['capacity']
#         )
#         db.session.add(new_item)
#         db.session.commit()
#         return {'message': '201, a new item has been added to the cart!'}, 201

# class CartByID(Resource):
#     def get(self, id):
#         if id not in [cart.id for cart in Cart.query.all()]:
#             return {'error': '404, Cart Item not Found!'}, 404

#         return make_response((cart for cart in Cart.query.filter(Cart.id==id).first()).to_dict(), 200)

#     def patch(self, id):
#         if id not in [cart.id for cart in Cart.query.all()]:
#             return {'error': '404, Cart Item not Found!'}, 404

#         data = request.get_json()
#         cart = Cart.query.filter(Cart.id==id).first()
#         for key in data.keys():
#             setattr(cart, key , data[key])
#         db.session.add(cart)
#         db.session.commit()
#         return make_response(cart.to_dict(), 200)

#     def delete(self, id):
#         if id not in [cart.id for cart in Cart.query.all()]:
#             return {'error': '404, Cart Item not Found!'}, 404
#         try:
#             db.session.query(Ticket).filter(Ticket.fan_id == id).delete()
#             cart = Cart.query.filter(Cart.id==id).first()
#             db.session.delete(cart)
#             db.session.commit()
#         except:
#             db.session.rollback()

#         return make_response({'message': 'The item/cart has been deleted'}, 200)

class Events(Resource):
    def get(self):
        return make_response([event.to_dict() for event in Event.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_event = Event(
            name=data['name'],
            date=data['date'],
            description=data['description'],
            age_restriction=data['age_restriction'],
            venue_id=data['venue_id']
        )
        db.session.add(new_event)
        db.session.commit()
        return {'message': '201, a new event has been created!'}, 201

class EventByID(Resource):
    def get(self, id):
        if id not in [event.id for event in Event.query.all()]:
            return {'error': '404, Event not Found!'}, 404

        return make_response((event for event in Event.query.filter(Event.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [event.id for event in Event.query.all()]:
            return {'error': '404, Event not Found!'}, 404

        data = request.get_json()
        event = Event.query.filter(Event.id==id).first()
        for key in data.keys():
            setattr(event, key , data[key])
        db.session.add(event)
        db.session.commit()
        return make_response(event.to_dict(), 200)

    def delete(self, id):
        if id not in [event.id for event in Event.query.all()]:
            return {'error': '404, Event not Found!'}, 404
        try:
            db.session.query(Ticket).filter(Ticket.fan_id == id).delete()
            event = Event.query.filter(Event.id==id).first()
            db.session.delete(event)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'This event has been terminated!'}, 200)


api.add_resource(HomePage, '/')
api.add_resource(Fans, '/fans')
api.add_resource(FanByID, '/fans/<int:id>')
api.add_resource(Tickets, '/tickets')
api.add_resource(TicketByID, '/tickets/<int:id>')
api.add_resource(Venues, '/venues')
api.add_resource(VenueByID, '/venues/<int:id>')
# api.add_resource(Carts, '/carts')
# api.add_resource(CartByID, '/carts/<int:id>')
api.add_resource(Events, '/events')
api.add_resource(EventByID, '/events/<int:id>')
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
