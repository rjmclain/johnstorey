#!/usr/bin/env bash

source ./test-env-vars.sh

apig-test \
  --username='test1@example.com' \
  --password='R@sw3ll47' \
  --user-pool-id='us-east-1_AV4OBU5gi' \
  --app-client-id='5aclqeas4t7mnkva4e4kntggih' \
  --cognito-region='us-east-1' \
  --identity-pool-id='us-east-1:05fb21a0-3c70-4bb3-8699-684e0a1da201' \
  --invoke-url='https://5508tzhref.execute-api.us-east-1.amazonaws.com/dev' \
  --api-gateway-region='us-east-1' \
  --path-template='/create-tags' \
  --method='POST' \
  --body='{"resources":["ami-837fc2f9"],"region":"us-east-1","tags":[{"Key":"foo-1","Value":"bar-1"},{"Key":"foo-2","Value":"bar-2"}]}'