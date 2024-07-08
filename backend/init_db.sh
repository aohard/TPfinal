#!/bin/bash
service mysql start
mysql -u root -e "CREATE DATABASE IF NOT EXISTS dbname;"
mysql -u root -e "CREATE USER 'user'@'%' IDENTIFIED BY 'password';"
mysql -u root -e "GRANT ALL PRIVILEGES ON dbname.* TO 'user'@'%';"
mysql -u root -e "FLUSH PRIVILEGES;"
