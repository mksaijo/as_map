ARG RUBY_VERSION=3.2.2
FROM ruby:$RUBY_VERSION-slim as development

# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストール
# yarnのインストール手順を含む
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev libvips nodejs yarn curl gnupg && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# GemfileとGemfile.lockをコピーし、bundle installを実行
COPY Gemfile* /app/
RUN bundle install

# アプリケーションの残りの部分をコピー
COPY . /app

# ポート3000を公開
EXPOSE 3000

# デフォルトコマンドを設定
CMD ["rails", "server", "-b", "0.0.0.0"]