#!/bin/sh

docker exec -it web_app /bin/bash
cd log
tail app.log