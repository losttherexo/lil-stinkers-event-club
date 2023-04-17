#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, Fan, Venue, Ticket, Event

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
        v2 = Venue(name='The Bar', location='Online', capacity=45)
        v3 = Venue(name='Elsewhere (The Hall)', location='Brooklyn, NY', capacity=675)
        venues=[v1, v2, v3]

        e1 = Event(name='A Very Toasty Tour', date=date(2023, 6, 9), description='Best night of ur freaking life', venue=v1)
        e2 = Event(name='Happy Hour', date=date(2023, 4, 21), description="There's always an afterparty...", venue=v2, age_restriction=True)
        e3 = Event(name='TimeCop 1983', date=date(2023, 9, 15), description='Synthwave to travel space and time', venue=v3)
        events = [e1, e2]

        t1 = Ticket(price=10, fan=f1, event=e1)
        t2 = Ticket(price=10, fan=f2, event=e1)
        t3 = Ticket(fan=f1, event=e2)
        t4 = Ticket(price=25, fan=f1, event=e3)
        tickets = [t1, t2, t3, t4]

        db.session.add_all(fans)
        db.session.add_all(venues)
        db.session.add_all(events)
        db.session.add_all(tickets)
        db.session.commit() 