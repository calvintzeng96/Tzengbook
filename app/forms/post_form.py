from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    REQUIRED_MESSAGE = '{} field is required.'
    content = StringField("Content", validators=[
        DataRequired(REQUIRED_MESSAGE.format('content'))])
    image = StringField("Image", validators=[
                        DataRequired(REQUIRED_MESSAGE.format('image'))])
