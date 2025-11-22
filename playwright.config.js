var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b;
import { defineConfig, devices } from '@playwright/test';
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '4173';
var HOST = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '127.0.0.1';
var BASE_URL = "http://".concat(HOST, ":").concat(PORT);
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    webServer: {
        command: "npm run dev -- --host ".concat(HOST, " --port ").concat(PORT),
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        stdout: 'pipe',
        stderr: 'pipe'
    },
    projects: [
        {
            name: 'chromium',
            use: __assign({}, devices['Desktop Chrome'])
        },
        {
            name: 'firefox',
            use: __assign({}, devices['Desktop Firefox'])
        },
        {
            name: 'webkit',
            use: __assign({}, devices['Desktop Safari'])
        }
    ]
});
