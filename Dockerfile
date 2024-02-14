FROM python:3.10
ENV PYTHONBUFFERED=1
WORKDIR /djnago-next-todos
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt