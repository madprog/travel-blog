import re
import string
import unicodedata

def normalize_id(name):
    return re.sub('\s+', ' ', ''.join(x not in string.whitespace and x or ' '
            for x in unicodedata.normalize('NFKD', name)
            if x in string.ascii_letters + string.whitespace + string.digits
        )).\
        strip().\
        replace(' ', '-').\
        lower()
