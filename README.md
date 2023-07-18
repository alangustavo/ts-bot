# ts-bot

TypeScript Binance Bot

# Install on Windows Talib - https://stackoverflow.com/questions/74227892/error-typeerror-process-env-only-accepts-a-configurable-whileinstall-windows/74228895#74228895

I had the exact same problem. First I tried to do npm install --global --production windows-build-tools@4.0.0  but didn't work then npm config set msvs_version 2022 but still didn't work.

Finally I tried to download node version 17.9.1 and retried the command and it worked!!

So here are the steps:

Step 1: uninstall Node version 18.12 and install version 17.9.1

Step 2: Search %temp% under window search bar (Copy %temp% then press windows button + Ctrl V) https://i.stack.imgur.com/jGaSg.png

Step 3: Create 'dd_client_.log.txt' and enter 'Closing installer. Return code: 3010.' https://i.stack.imgur.com/03Mju.png

after that you should be able to finish the whole process with npm install --global windows-build-tools

big thanks to seantsang
