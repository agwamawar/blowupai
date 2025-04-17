
#!/usr/bin/env bash
# Force devDependencies to be installed
export NODE_ENV=development
npm install
# Verify vite is available
echo "Checking for vite installation..."
npx vite --version || echo "Vite installation issue detected"
