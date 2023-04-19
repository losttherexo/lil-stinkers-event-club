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
        Event.query.delete()
        f1 = Fan(username='losttherexo', _password_hash='123456', password_confirmation = '123456', first_name='Andre', last_name='Vargas Roo', dob='03/25/1996')
        f2 = Fan(username='123toast', _password_hash='123456', password_confirmation = '123456', first_name='Marcus', last_name='Hidalgo', dob='06/08/1996')
        fans = [f1, f2]

        v1 = Venue(name='Stardust', location='Orlando, FL', capacity=200, image='https://bungalower.com/wp-content/uploads/2017/06/BEK_3494-1024x683.jpg')
        v2 = Venue(name='The Bar', location='Online', capacity=45, image='https://images.squarespace-cdn.com/content/v1/5cbf562816b6400ee5dc5f7e/1588008787320-HCZWQUF5UW5V6SURPYRB/DSC_9058-Edit.jpg')
        v3 = Venue(name='Elsewhere (The Hall)', location='Brooklyn, NY', capacity=675, image='https://www.datocms-assets.com/46309/1631108277-the-hallcarousel3.jpg')
        venues=[v1, v2, v3]

        e1 = Event(name='A Very Toasty Tour', price=10, date='06/09/2023', description='Best night of ur freaking life', image='https://pbs.twimg.com/media/FqTmBYIWYAEG_cf?format=jpg&name=large', venue=v1)
        e2 = Event(name='Happy Hour', date='04/21/2023', description="There's always an afterparty...", image='https://assets.entrepreneur.com/content/3x2/2000/20160129160823-happy-hour-coworkers-boss-pub-bar.jpeg', venue=v2, age_restriction=True)
        e3 = Event(name='TimeCop1983', price=25, date='09/15/2023', description='Synthwave to travel space and time', image='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Timecop1983_%28photo_by_Lionne_van_der_Hagen%29.jpg/1200px-Timecop1983_%28photo_by_Lionne_van_der_Hagen%29.jpg',  venue=v3)
        events = [e1, e2]

        t1 = Ticket(fan=f1, event=e1)
        t2 = Ticket(fan=f2, event=e1)
        t3 = Ticket(fan=f1, event=e2)
        t4 = Ticket(fan=f1, event=e3)
        tickets = [t1, t2, t3, t4]

        db.session.add_all(fans)
        db.session.add_all(venues)
        db.session.add_all(events)
        db.session.add_all(tickets)
        db.session.commit()