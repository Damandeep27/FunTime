FROM node:16.13.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup Environment Variables
ENV MONGODB_URI mongodb+srv://funtime:J44RfRwigQJZWFqG@cluster0.lmmem.mongodb.net/funtime?retryWrites=true&w=majority
ENV FB_API_KEY AIzaSyDQanKxhFCXYC75bImRTaBQdceYF9gSL_M
ENV FB_AUTH_DOMAIN fun--time.firebaseapp.com
ENV FB_PROJECT_ID fun--time
ENV FB_STORAGE_BUCKET fun--time.appspot.com
ENV FB_SENDER_ID 370024831667
ENV FB_APP_ID 1:370024831667:web:832ae337e0786222ff2ec6
ENV FB_MEASUREMENT_ID G-Q7MBRC75TG
ENV GOOGLE_CLIENT_ID 370024831667-d61eh9v5b0r8mjplf6b14ofcianphgn0.apps.googleusercontent.com
ENV STRIPE_SECRET sk_test_51L9rU2KMGpkmvkvMDPDIEWLpMEbK3Oxjeoo5X73fnr0ZWznIf4b3h4gOG8PSVcPyNGgJLW0soXzv8iVb3qFCRDNP00f6OfhSzA
ENV TWILIO_ACCOUNT_SID ACeed13e8bef142045fcdfad036ef92d24
ENV TWILIO_AUTH_TOKEN 6a16c36ce32f038af63a3830096cc602
ENV TWILIO_PHONE_NUMBER +19472254088
ENV MAILJET_API_KEY f33343ff011b484d183538f38484744a
ENV MAILJET_API_SECRET a3053c5b3bc4036ecd08e8405333396c

# Install app dpendencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
EXPOSE 8080
CMD ["npm", "run", "local"]