FROM python:3.8-slim-buster

WORKDIR /app

COPY . .

RUN chmod -R 777 *

ENV POETRY_VIRTUALENVS_IN_PROJECT=true

RUN pip3 install poetry

RUN poetry install

EXPOSE 8080

CMD [ "poetry", "run" , "invoke", "start"]
