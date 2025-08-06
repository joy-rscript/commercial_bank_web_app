class Nl2SQLExceptions(Exception):
    """Base class for Nl2SQL Exceptions"""
    pass

class TextExceedsLimit(Nl2SQLExceptions):
    """Raised when the input prompt for an NL2SQL conversion
    is too long"""
    pass

class ContainsUnsafeWord(Nl2SQLExceptions):
    """Raised when a query or prompt includes unsafe SQL or
    ORM keywords"""
    pass
