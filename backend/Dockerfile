ARG DST=/usr/src/app/

FROM python:3.11-slim as build_stage
ARG DST
ENV POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    POETRY_VERSION=1.8.2


WORKDIR ${DST}

RUN pip3 install "poetry==$POETRY_VERSION"

COPY poetry.lock pyproject.toml ./

RUN poetry install --only main --no-interaction --no-root

FROM python:3.11.9-slim-bullseye as runtime_stage
ARG DST
ENV VIRTUAL_ENV=$DST/.venv \
    PATH="$DST/.venv/bin:$PATH" \
    PYTHONPATH="$DST/db_client:$DST/common"

COPY --from=build_stage ${VIRTUAL_ENV} ${VIRTUAL_ENV}

COPY src/ ${DST}src/

WORKDIR ${DST}

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]