#this script restart the rails puma server if it was not gracefully terminated
#i.e. port 3000 is hung with the server
#Scans the server.pid file from tmp to kill the process and deletes that file
TEST=`cat tmp/pids/server.pid`
kill -9 $TEST
rm tmp/pids/server.pid
