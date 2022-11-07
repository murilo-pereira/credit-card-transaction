#!/bin/bash

up:
	docker compose up -d
build:
	cp app/.env.example app/.env && docker compose up -d --build
down:
	docker container ls -q --filter name=transaction_app | xargs -r docker container stop && docker container ls -q --filter name=transaction_mongo | xargs -r docker container stop