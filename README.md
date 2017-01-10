# fv-homepage
The homepage service for FreeVerse

## Development Server
The FreeVerse homepage will be deployed via CDN, so no server-side code is necessary. However, for 
local development, this repo maintains an nginx docker image that can be deployed with docker-compose:

```
sudo docker-compose -f ./app/docker-compose.dev.yml up
```

Depending on your dev environment, you may need to re-build and relaunch after making changes.

```
sudo docker-compose -f ./app/docker-compose.dev.yml build
sudo docker-compose -f ./app/docker-compose.dev.yml up
```

## Testing
Similarly, unit, integration, and functional tests can be run with docker-compose commands.

For unit testing:

```
docker-compose -f ./app/docker-compose.unit.yml build
```

For unit, integration, and functional testing:

```
docker-compose -f ./app/docker-compose.full.yml build
```
