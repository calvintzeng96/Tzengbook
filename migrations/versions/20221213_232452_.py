"""empty message

Revision ID: e6eaf7d42018
Revises: 6c05537a2471
Create Date: 2022-12-13 23:24:52.200070

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e6eaf7d42018'
down_revision = '6c05537a2471'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends',
    sa.Column('friend1', sa.Integer(), nullable=True),
    sa.Column('friend2', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['friend1'], ['users.id'], ),
    sa.ForeignKeyConstraint(['friend2'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('friends')
    # ### end Alembic commands ###