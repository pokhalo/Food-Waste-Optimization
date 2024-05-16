FROM python:3.8-slim-buster

WORKDIR /app

COPY . .

RUN pip3 install poetry

RUN poetry install

CMD [ "poetry", "run" , "invoke", "start"]
