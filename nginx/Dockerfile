FROM nginx:alpine
LABEL "Project"="portfolio_website"
LABEL "Author"="Jace"

# Remove the default config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy your custom config
COPY nginx.conf /etc/nginx/conf.d/portfolioapp.conf
