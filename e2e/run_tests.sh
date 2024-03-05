#cucumber tag
tag=$1

#run cucumber tests & on failure run post test
npm run test -- --tags $tag || npm run posttest

