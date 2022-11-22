from ..errors import ForbiddenError


def child_belongs_to_parent(parent_model, child_model, child_foreign_col: str):
    if parent_model.id != getattr(child_model, child_foreign_col):
        raise ForbiddenError("User does not have access.")


def get_user_model(current_user, user_model):
    return user_model.query.get(current_user.id)
