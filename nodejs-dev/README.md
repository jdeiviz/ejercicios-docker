docker build -t nodejs2 .
docker run -d -p 3011:3000 -v //c/Users/dpemanru/Proyectos/curso-docker/nodejs-dev/app://src --name nodejsta nodejs2