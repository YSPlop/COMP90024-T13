import sys
import time

while True:
    with open(sys.argv[1], 'a') as f:
        f.write('Create a new text file!')
    time.sleep(10)

