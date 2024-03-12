#environment
env=$1
#cucumber tag
tag=$2

#run cucumber tests & on failure run post test
npm run pretest 
npm run test:$env -- --tags "$tag" || npm run posttest:$env

