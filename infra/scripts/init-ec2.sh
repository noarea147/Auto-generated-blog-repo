#!/usr/bin/env bash
set -e
sudo yum update -y || sudo apt update -y
sudo amazon-linux-extras install docker -y || sudo apt-get install -y d