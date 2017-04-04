def scan_for_decorator(obj, decorator):
    for field in obj.__dict__.values():
        if hasattr(field, decorator):
            if field.decorator == decorator:
                print(" ".join([field, "has", decorator]))
                yield field