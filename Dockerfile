# Use the official nginx image to serve static files
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built site into nginx public directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx (the base image CMD already does this)
CMD ["nginx", "-g", "daemon off;"]
