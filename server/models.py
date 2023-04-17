from sqlalchemy_serializer import SerializerMixin

from config import db

class Fan(db.Model, SerializerMixin):
    __tablename__ = 'fans'

    serialize_rules = ('-tickets',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    dob = db.Column(db.Date, nullable=False)

    tickets = db.relationship('Ticket', backref='fan')

class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'

    serialize_rules = ('-events',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String)

    events = db.relationship('Event', backref='venue')

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ('-tickets',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    age_restriction = db.Column(db.Boolean, nullable=False, default=False)

    tickets = db.relationship('Ticket', backref='event')

    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False, default=0)

    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)



# git push test