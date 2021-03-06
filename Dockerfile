FROM ruby:2.6.5-alpine

RUN apk add \
    build-base \
    nano \
    curl-dev \
    ca-certificates \
    linux-headers \
    build-base \
    libxml2-dev \
    libxslt-dev \
    tzdata \
    postgresql-dev \
    nodejs \
    yarn \
    libc6-compat

ARG master_key
ENV MASTER_KEY=$master_key

ARG rails_env
ENV RAILS_ENV=$rails_env

ENV BUNDLE_DIR /tmp
ENV RAILS_ROOT /app

RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT

COPY package.json yarn.lock ./
RUN yarn install --$RAILS_ENV

COPY Gemfile Gemfile.lock ./
RUN gem install bundler:2.0.1
RUN bundle config build.google-protobuf --with-cflags=-D__va_copy=va_copy
RUN BUNDLE_FORCE_RUBY_PLATFORM=1 bundle install --path $BUNDLE_DIR --jobs 20 --retry 5 --without development test

COPY . .

RUN bundle exec rake assets:precompile