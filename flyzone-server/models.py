from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# Define your models
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    security_level = Column(Integer)
    username = Column(String, index=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)
    email = Column(String)
    level = Column(Integer)
    next_level = Column(Integer)
    mmr = Column(Integer)
    badges = Column(Integer)
    total_assessments = Column(Integer)
    number_of_failures = Column(Integer)
    straight_failures = Column(Integer)
    assessment_overdue = Column(Boolean)
    total_score = Column(Integer)
    company_id = Column(Integer)
    group_id = Column(Integer)
    profileImguser = Column(String)
    levels = relationship("Level", back_populates="user")
    level_results = relationship("Level_results", back_populates="user")

# Define other models similarly
class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True, index=True)
    group_numbers = Column(Integer)
    avg_score = Column(Integer)
    avatar = Column(String)
    users_avg_score = Column(Integer)

class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    avatar = Column(String)

class Map(Base):
    __tablename__ = 'maps'
    id = Column(Integer, primary_key=True, index=True)
    map_name = Column(String, index=True)
    map_img = Column(String)
    map_popularity = Column(Integer)
    map_characteristics = Column(String)
    map_description = Column(String)
    map_additional_data = Column(String)

class Mission(Base):
    __tablename__ = 'missions'
    id = Column(Integer, primary_key=True, index=True)
    mission_name = Column(String, index=True)
    mission_popularity = Column(Integer)
    mission_characteristics = Column(String)
    mission_description = Column(String)
    mission_additional_data = Column(String)

class Fog(Base):
    __tablename__ = 'fog'
    id = Column(Integer, primary_key=True, index=True)
    fog_level = Column(Integer)
    fog_radius = Column(Integer)
    fog_density = Column(Integer)
    fog_duration = Column(Integer)
    fog_coefficient = Column(Integer)

class Wind(Base):
    __tablename__ = 'wind'
    id = Column(Integer, primary_key=True, index=True)
    wind_level = Column(Integer)
    wind_radius = Column(Integer)
    wind_density = Column(Integer)
    wind_duration = Column(Integer)
    wind_direction = Column(String)
    wind_coefficient = Column(Integer)

class Brightness(Base):
    __tablename__ = 'brightness'
    id = Column(Integer, primary_key=True, index=True)
    brightness_level = Column(Integer)
    brightness_duration = Column(Integer)
    brightness_coefficient = Column(Integer)

class Spotted(Base):
    __tablename__ = 'spotted'
    id = Column(Integer, primary_key=True, index=True)
    spotted_number = Column(Integer)

class Level(Base):
    __tablename__ = 'level'
    id = Column(Integer, primary_key=True, index=True)
    level_level = Column(String, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="levels")
    fog_level = Column(Integer)
    brightness_level = Column(Integer)
    wind_level = Column(Integer)
    close_calls = Column(Integer)
    spotted = Column(Integer)
    time_to_finish = Column(Integer)
    mission_id = Column(Integer, ForeignKey('missions.id'))
    basemap_id = Column(Integer, ForeignKey('maps.id'))
    difficulty_level = Column(Integer)

class Level_results(Base):
    __tablename__ = 'levelResults'
    id = Column(Integer, primary_key=True, index=True)
    level_level = Column(String, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="level_results")
    fog_level = Column(Integer)
    brightness_level = Column(Integer)
    wind_level = Column(Integer)
    close_calls = Column(Integer)
    spotted = Column(Integer)
    time_to_finish = Column(Integer)
    mission_id = Column(Integer, ForeignKey('missions.id'))
    basemap_id = Column(Integer, ForeignKey('maps.id'))
    difficulty_level = Column(Integer)


