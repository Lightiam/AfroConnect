#!/bin/bash
# Replace all instances of the Eatreal logo with the AfroConnect logo
find . -name "*.html" -exec sed -i 's|img/logo.png|img/logo/afroconnect_logo.svg|g' {} \;
find . -name "*.html" -exec sed -i 's|<title>Eatreal|<title>AfroConnect|g' {} \;
find . -name "*.html" -exec sed -i 's|<link rel="icon" href="img/logo.png"|<link rel="icon" href="img/logo/favicon.svg"|g' {} \;
