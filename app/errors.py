class NotFoundError(Exception):
    status_code = 404
    title = "Resource not found."

    def __init__(self, message):
        self.message = message


class ForbiddenError(Exception):
    status_code = 403
    title = "Forbidden Error"

    def __init__(self, message):
        self.message = message

class TestError(Exception):
    status_code = 400
    title = "error---"

    def __init__(self, message):
        self.message = message
