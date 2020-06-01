FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .
RUN npm install --prefix ./frontend
#Expose port and start application
EXPOSE 5000
EXPOSE 3000
CMD [ "npm", "start" ]