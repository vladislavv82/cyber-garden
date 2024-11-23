FROM node:lts as dependencies
WORKDIR /cybergarden-frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /cybergarden-frontend
COPY . .
COPY --from=dependencies /cybergarden-frontend/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /cybergarden-frontend
ENV NODE_ENV production

COPY --from=builder /cybergarden-frontend/public ./public
COPY --from=builder /cybergarden-frontend/package.json ./package.json
COPY --from=builder /cybergarden-frontend/.next ./.next
COPY --from=builder /cybergarden-frontend/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]