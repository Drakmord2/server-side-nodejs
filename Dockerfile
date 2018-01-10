
# Node Image
FROM node

# Environment
ENV APP_ROOT="/var/www/node"

# Set the application root
WORKDIR ${APP_ROOT}

# Install dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/

# Listen to port
EXPOSE 9090

# Setup application
COPY ./devops/start.sh /opt/start.sh
RUN chmod 755 /opt/start.sh

# Start application
ENTRYPOINT [ "/opt/start.sh" ]
