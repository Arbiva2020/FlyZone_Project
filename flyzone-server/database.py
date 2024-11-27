from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.pool import NullPool

# Database URL
DATABASE_URL = 'sqlite:///./flyzone.db'

# Create an engine
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False, "timeout":30}, 
    poolclass=NullPool  
)
with engine.connect() as conn:
    conn.execute("PRAGMA journal_mode=WAL;")

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class
Base = declarative_base()
