set tag=%1
export COMMON_CONFIG_FILE="env/.env.prod"
set COMMON_CONFIG_FILE=env/.env.prod
npm run test --profile %tag% ||  npm run posttest
