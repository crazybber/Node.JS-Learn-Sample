@echo off
#start.sh。
if not exit "server"
	node ../lib/damon.js ../conf/config.json &
	echo $! > pid