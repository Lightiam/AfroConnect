#!/bin/bash

# Replace all instances of "Eatreal" with "AfroConnect" in JavaScript files
find . -name "*.js" -exec sed -i 's/Eatreal/AfroConnect/g' {} \;

# Update template name and author information
find . -name "*.js" -exec sed -i 's/Template Name: .*/Template Name: AfroConnect - African Food Vendor Mobile Template/g' {} \;
find . -name "*.js" -exec sed -i 's/Author: .*/Author: AfroConnect Team/g' {} \;

# Replace grocery and supermarket references
find . -name "*.js" -exec sed -i 's/grocery/African food/g' {} \;
find . -name "*.js" -exec sed -i 's/Grocery/African Food/g' {} \;
find . -name "*.js" -exec sed -i 's/supermarket/marketplace/g' {} \;
find . -name "*.js" -exec sed -i 's/Supermarket/Marketplace/g' {} \;
