#!/bin/sh
#start.sh。
if [! -f "pid"]
then 
	node ../lib/damon.js ../conf/config.json &
	echo $! > pid
	
fi