FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && useradd --create-home coach
COPY web ./web
RUN mkdir -p /app/web/data && chown -R coach:coach /app
USER coach
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "web.server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1", "--no-proxy-headers", "--no-access-log"]
