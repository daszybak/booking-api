###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 As development

RUN apt-get update
RUN apt-get install -y openssl

# Create app directory
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/dist
RUN chmod 0777 /usr/src/app/dist

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

# Install app dependencies using the `npm ci` command instead of `npm install`
#RUN npm install
RUN yarn install

# Bundle app source
COPY --chown=node:node . .

RUN npx prisma generate

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/dist
RUN chmod 0777 /usr/src/app/dist

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

#RUN npx prisma migrate deploy

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:18 As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node ./prisma ./prisma
COPY --chown=node:node entrypoint.sh ./
RUN ["chmod", "+x", "/entrypoint.sh"]
#RUN chmod -R 0777 /usr/src

EXPOSE 3001
ENV PORT 3001

# Start the server using the production build
ENTRYPOINT ["/entrypoint.sh"]
