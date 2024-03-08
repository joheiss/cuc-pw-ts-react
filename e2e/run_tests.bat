set env=%1
set tag=%2

npm run test:%env% -- --tags %tag% ||  npm run posttest:%env%
