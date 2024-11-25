from sqlalchemy.orm import as_declarative, declared_attr
from sqlalchemy import MetaData

metadata = MetaData()

@as_declarative(metadata=metadata)
class Base:
    id: int
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()