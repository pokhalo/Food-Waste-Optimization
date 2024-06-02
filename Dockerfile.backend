FROM python:3.9-slim

# python version changed from 3.8 to 3.9

WORKDIR /app

COPY . .

RUN chmod -R 777 *

ENV POETRY_VIRTUALENVS_IN_PROJECT=true

RUN pip3 install poetry

RUN poetry lock

RUN poetry install

EXPOSE 5000

CMD [ "poetry", "run" , "invoke", "start-production"]
