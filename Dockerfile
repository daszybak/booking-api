###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

RUN apk update && apk add --no-cache openssl

# Create app directory
WORKDIR /usr/src/app

# Change the ownership of the /usr/src/app directory to the node user
RUN chown -R node:node /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node prisma ./prisma/

# Install app dependencies
RUN yarn install

# Bundle app source
COPY --chown=node:node . .

# Generate Prisma client
RUN npx prisma generate

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node ./prisma ./prisma
COPY --chown=node:node entrypoint.sh ./
RUN ["chmod", "+x", "/entrypoint.sh"]

EXPOSE 3001
ENV PORT 3001

ENTRYPOINT ["/entrypoint.sh"]
