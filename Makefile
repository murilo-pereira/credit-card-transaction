#!/bin/bash

up:
	docker compose up -d
build:
	cp app/.env.example app/.env && docker compose up -d --build
down:
	docker ps -q --filter ancestor="app_node" | xargs -r docker stop && docker ps -q --filter ancestor="mongo" | xargs -r docker stop