# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

# Create the directory on the node image
# where our Next.js visualeasy-front will live
RUN mkdir -p /visualeasy-front

# Set /visualeasy-front as the working directory
WORKDIR /visualeasy-front

# Copy package.json and package-lock.json
# to the /visualeasy-front working directory
COPY package.json /visualeasy-front/

# Install dependencies in /visualeasy-front
RUN yarn install

# Copy the rest of our Next.js folder into /visualeasy-front
COPY . /visualeasy-front

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line
CMD ["yarn", "dev"]
