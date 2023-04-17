from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class Fan(db.Model, SerializerMixin):
    __tablename__ = 'fans'

    serialize_rules = ('-tickets',)

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    dob = db.Column(db.Date, nullable=False)

    tickets = db.relationship('Ticket', backref='fan')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))

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
    price = db.Column(db.Integer, nullable=False, default=0)

    tickets = db.relationship('Ticket', backref='event')

    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)

class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)

    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)



# git push test