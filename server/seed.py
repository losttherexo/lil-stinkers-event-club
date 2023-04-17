#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, Fan, Venue, Ticket

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        Fan.query.delete()
        Venue.query.delete()
        Ticket.query.delete()

        f1 = Fan(username='losttherexo', first_name='Andre', last_name='Vargas Roo', dob=date(1996, 3, 25))
        f2 = Fan(username='123toast', first_name='Marcus', last_name='Hidalgo', dob=date(1996, 6, 8))
        fans = [f1, f2]

        v1 = Venue(name='Stardust', location='Orlando, FL', capacity=200)

        venues=[v1]

        t1 = Ticket(event_name='A Very Toasty Tour', date=date(2023, 6, 9), description='Best night of ur freaking life', fan=f1, venue=v1)
        t2 = Ticket(event_name='A Very Toasty Tour', date=date(2023, 6, 9), description='Best night of ur freaking life', fan=f2, venue=v1)
        tickets = [t1, t2]

        db.session.add_all(fans)
        db.session.add_all(venues)
        db.session.add_all(tickets)
        db.session.commit() 