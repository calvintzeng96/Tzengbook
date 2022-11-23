from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(
        max=500, message="Comment must be less than 500 characters!")])
