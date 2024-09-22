
FROM node:20-alpine

# Set the working directory inside the container.
WORKDIR /nextblog

# Copy the package.json and yarn.lock (Yarn lock file) to the container.
COPY package.json yarn.lock ./

# Install dependencies using Yarn.
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container.
COPY . .

# Expose the port on which your app will run.
EXPOSE 5000

# Define the command to run your application.
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && yarn build && yarn start"]
