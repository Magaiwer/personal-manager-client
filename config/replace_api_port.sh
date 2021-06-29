#!/usr/bin/env sh

find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,API_PORT,'"$API_PORT"',g' {} \;
nginx -g "daemon off;"
