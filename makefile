help: ## ヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
dir_files: ## rails必要ファイルを作成
	@mkdir backend
	@touch ./backend/Dockerfile
	@cat << EOF > ./backend/Gemfile
		source "https://rubygems.org"
		gem "rails", "~>6"
		EOF
	@touch ./backend/Gemfile.lock
	@touch docker-compose.yml
	@touch .gitignore
	@mkdir frontend
	@touch ./frontend/Dockerfile
	@mkdir .circleci
	@touch .circleci/config.yml
	@sh prepare_terraform.sh