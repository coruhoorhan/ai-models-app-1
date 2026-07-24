#!/bin/bash
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | awk '$1 > 150 {print $0}'
