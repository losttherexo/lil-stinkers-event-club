"""help

Revision ID: 78db0a6f5476
Revises: 31217cdafc08
Create Date: 2023-04-19 17:51:18.302889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78db0a6f5476'
down_revision = '31217cdafc08'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('fans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('password_confirmation', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('dob', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('venues',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('date', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('age_restriction', sa.Boolean(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('venue_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['venue_id'], ['venues.id'], name=op.f('fk_events_venue_id_venues')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tickets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fan_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_tickets_event_id_events')),
    sa.ForeignKeyConstraint(['fan_id'], ['fans.id'], name=op.f('fk_tickets_fan_id_fans')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tickets')
    op.drop_table('events')
    op.drop_table('venues')
    op.drop_table('fans')
    # ### end Alembic commands ###