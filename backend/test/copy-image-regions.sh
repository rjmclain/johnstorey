#!/usr/bin/env bash

apig-test \
  --username='test1@example.com' \
  --password='R@sw3ll47' \
  --user-pool-id='us-east-1_AV4OBU5gi' \
  --app-client-id='5aclqeas4t7mnkva4e4kntggih' \
  --cognito-region='us-east-1' \
  --identity-pool-id='us-east-1:05fb21a0-3c70-4bb3-8699-684e0a1da201' \
  --invoke-url='https://6ae485dpl8.execute-api.us-east-1.amazonaws.com/dev' \
  --api-gateway-region='us-east-1' \
  --path-template='/copy-image-regions' \
  --method='POST' \
  --body='{"destName":"TEST copied image","destRegion":"ca-central-1","srcRegion":"us-west-1","srcAMI":"ami-23f5c743","destDescription":"Test copy"}'
