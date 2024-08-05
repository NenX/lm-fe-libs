0 verbose cli /root/.nvm/versions/node/v20.10.0/bin/node /root/.nvm/versions/node/v20.10.0/bin/npm
1 info using npm@10.2.3
2 info using node@v20.10.0
3 timing npm:load:whichnode Completed in 3ms
4 timing config:load:defaults Completed in 1ms
5 timing config:load:file:/root/.nvm/versions/node/v20.10.0/lib/node_modules/npm/npmrc Completed in 3ms
6 timing config:load:builtin Completed in 3ms
7 timing config:load:cli Completed in 1ms
8 timing config:load:env Completed in 0ms
9 timing config:load:file:/root/.noah/lm-fe-libs/.npmrc Completed in 0ms
10 timing config:load:project Completed in 0ms
11 timing config:load:file:/root/.npmrc Completed in 2ms
12 timing config:load:user Completed in 2ms
13 timing config:load:file:/root/.nvm/versions/node/v20.10.0/etc/npmrc Completed in 0ms
14 timing config:load:global Completed in 0ms
15 timing config:load:setEnvs Completed in 1ms
16 timing config:load Completed in 9ms
17 timing npm:load:configload Completed in 9ms
18 timing config:load:flatten Completed in 1ms
19 timing npm:load:mkdirpcache Completed in 1ms
20 timing npm:load:mkdirplogs Completed in 0ms
21 verbose title npm login
22 verbose argv "login"
23 timing npm:load:setTitle Completed in 1ms
24 timing npm:load:display Completed in 0ms
25 verbose logfile logs-max:10 dir:/root/.npm/_logs/2024-07-09T09_10_51_581Z-
26 verbose logfile /root/.npm/_logs/2024-07-09T09_10_51_581Z-debug-0.log
27 timing npm:load:logFile Completed in 7ms
28 timing npm:load:timers Completed in 0ms
29 timing npm:load:configScope Completed in 0ms
30 timing npm:load Completed in 32ms
31 notice Log in on http://registry.npmjs.org/
32 verbose web login before first POST
33 silly logfile start cleaning logs, removing 1 files
34 silly logfile done cleaning log files
35 timing command:login Completed in 3180ms
36 verbose type system
37 verbose stack FetchError: request to http://registry.npmjs.org/-/v1/login failed, reason: 
37 verbose stack     at ClientRequest.<anonymous> (/root/.nvm/versions/node/v20.10.0/lib/node_modules/npm/node_modules/minipass-fetch/lib/index.js:130:14)
37 verbose stack     at ClientRequest.emit (node:events:514:28)
37 verbose stack     at _destroy (node:_http_client:875:13)
37 verbose stack     at onSocketNT (node:_http_client:895:5)
37 verbose stack     at process.processTicksAndRejections (node:internal/process/task_queues:83:21)
38 verbose cwd /root/.noah/lm-fe-libs
39 verbose Linux 4.4.0-22621-Microsoft
40 verbose node v20.10.0
41 verbose npm  v10.2.3
42 error code ETIMEDOUT
43 error errno ETIMEDOUT
44 error network request to http://registry.npmjs.org/-/v1/login failed, reason: 
45 error network This is a problem related to network connectivity.
45 error network In most cases you are behind a proxy or have bad network settings.
45 error network
45 error network If you are behind a proxy, please make sure that the
45 error network 'proxy' config is set properly.  See: 'npm help config'
46 verbose exit 1
47 timing npm Completed in 3252ms
48 verbose code 1
49 error A complete log of this run can be found in: /root/.npm/_logs/2024-07-09T09_10_51_581Z-debug-0.log
