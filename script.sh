#!/bin/bash
# Simple script that allows you to send a GET request to the specified URL
# every certain number of minutes. To run this script you have to first
# grant execution privileges to this file. To do this, you can run
# "chmod 777 ./script.sh" assuming this file is in your current working
# directory. Then, just simply run the script by calling the file
# "./script" and leave it alone in your terminal window. Note that this script
# will continue running unless you force it to stop.
# Adjust number of minutes.
time=5
# Change URL if needed.
URL=https://stock-portfolio-rohan.herokuapp.com
while true
   do
       echo $URL
       curl $URL
       sleep $(echo $time)m
   done