FROM node:lts

# copy the app
COPY  . /app/

# set working directory
WORKDIR /app/

# Install dependencies
RUN npm install --silent

# Build the static site
RUN npm run build

# Expose the 3000 port
EXPOSE 3000

# Run the container
ENTRYPOINT [ "npm", "run", "serve" ]