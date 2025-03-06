# base image with Python
FROM python:3.11-slim as build

# working directory inside the container
WORKDIR /app

# requirements.txt file and install dependencies
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

#  Copy the entire project into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]