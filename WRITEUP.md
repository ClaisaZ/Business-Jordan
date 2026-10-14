## Milestone A write-up: Business-Jordan

## Team: 
Clayton Liang and Woo Sung

## Live URL: 
https://158.23.86.240 

## Repo: 
https://github.com/ClaisaZ/Business-Jordan

## Overview:
Business-Jordan is a React website that we deployed with Azure virtual machine running on the Ubuntu Server. 
The website is built with static files, served by a simple Node/Express backend, and kept running with PM2.
Nginx sits in front of Express and handles the security HTTPS.

## Architecture:
Visitor -> Nginx(ports 80 and 443) -> Express (127.0.0.1:3000) -> React files in dist/
PM2 keeps Express running and restarts after a crash
 
## Nginx configuration:
We have 2 blocks...
Block 1 (port 80): Catch plain HTTP and send it to HTTPS.
Block 2 (port 443): Turns on TLS, pointing to the certificate and private key we created.
                    The real site, over HTTPS

## Reverse proxy: 
1. The proxy_pass forwards each request to Express.
2. Since Express only listens to local host, Nginx is the only way in.
3. We set up proxy_set_header so we can pass the details into Express, if we didn't do this, every request 
   look like it came from Nginx

## TLS certificate: 
We don't have a domain name yet, so we are using a self-signed certificate with OpenSSL.

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/business-jordan.key -out /etc/ssl/certs/business-jordan.crt -subj "/CN=158.23.86.240"

This creates a private key and certificate that lasts one year, we used -nodes so the key has no password
which lets Nginx start by itself, the connection is still fully encrypted.


## Problems and fixes:
1. Azure subscription refused to created the VM in many North American regions, instead we had to create the
   server in Mexico Central. While testing different server locations, the form data constantly reset
   because of the back button, which made it take so long to finally work.
3. SSH key from different computers, since we worked on many different computers we needed to generate multiple
   keys and then connect those keys
4. I learned to push from the server instead of VSCode, I had to get permissions and connect it to the repo 
   via the deploy key settings.
