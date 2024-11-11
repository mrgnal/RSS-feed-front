import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, JSON, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker
import uuid
from .database import DATABASE_URL


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class RSSFeed(Base):
    __tablename__ = 'rss_feeds'

    uuid = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    channel_id = Column(String, nullable=False)
    articles = Column(JSON, nullable=True)

    builder = relationship("Builder", uselist=False, back_populates="feed", cascade="all, delete")

class Builder(Base):
    __tablename__ = 'rss_builder'

    uuid = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    feed_id = Column(String, ForeignKey('rss_feeds.uuid', ondelete="CASCADE"), unique=True, nullable=False)
    elements = Column(JSON, nullable=True)

    feed = relationship("RSSFeed", back_populates="builder")

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Таблиці створені ")
