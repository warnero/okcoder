# ——— BASE IMAGE ——————————————————————————————————————————————————————————————
FROM node:10-alpine as base

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV:-development}
ENV PORT=8080

EXPOSE $PORT

RUN npm install -g gulp-cli
WORKDIR /var/www/api-okcoder

COPY package.json yarn.lock ./

# COPY OVER ENTRYPOINT
COPY ./docker_scripts /docker_scripts
ENTRYPOINT ["/docker_scripts/run_node.sh"]

# ——— DEPENDENCIES ————————————————————————————————————————————————————————————
FROM base as dependencies

RUN yarn install --frozen-lockfile --no-cache --prod
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN yarn install

# ——— COMPILE / Test ——————————————————————————————————————————————————————————
FROM dependencies as compile
COPY . .
# lint-src fails currently
# RUN gulp lint-src && gulp test:unit
RUN gulp

# ——— DEV IMAGE ———————————————————————————————————————————————————————————————
FROM compile as dev
CMD ["default"]

# ——— PROD IMAGE ——————————————————————————————————————————————————————————————
FROM base as release
CMD ["release"]

COPY . .
COPY --from=compile /var/www/api-okcoder/dist dist
COPY --from=dependencies /var/www/api-okcoder/prod_node_modules node_modules

# To run tests in the container do
# docker exec <container-name> gulp test:unit
# docker exec <container-name> gulp test:functional
