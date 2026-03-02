# colors
BLUE:=$(shell echo "\033[0;36m")
GREEN:=$(shell echo "\033[0;32m")
YELLOW:=$(shell echo "\033[0;33m")
RED:=$(shell echo "\033[0;31m")
END:=$(shell echo "\033[0m")

.DEFAULT_GOAL := help

define color
	@echo "$($1)$2$(END)"
endef

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

#
# DEV
#
.PHONY: install dev build preview format semgrep

install:
	@npm ci

dev:
	@npm run dev

build:
	@npm run build

preview:
	@npm run preview

format: ## Reformat all HTML, TS, JS, JSON and CSS files via Prettier
	$(call color,BLUE,Formatting files...)
	@npm run format

semgrep: ## Run Semgrep security scan
	$(call color,BLUE,Running Semgrep security scan...)
	@docker pull semgrep/semgrep:latest > /dev/null 2>&1
	@docker run --rm -v "${PWD}:/src" semgrep/semgrep:latest semgrep scan --config auto --error --text
