def my_function(param1, param2):
    """This is a docstring."""
    return param1 + param2

class Calculator:
    def __init__(self, value=0):
        self.value = value

    def add(self, x):
        self.value += x
        return self.value

def another_function():
    pass
