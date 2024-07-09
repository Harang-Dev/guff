from collections import defaultdict

class CustomDefaultDict(defaultdict):
    def __init__(self):
        super().__init__(None)

    def append(self, key, value):
        if key not in self or self[key] is None:
            self[key] = value
        else:
            current_value = self[key]

            self[key] = [current_value]
            self[key].append(value)