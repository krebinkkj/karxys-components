import { ESBuildOptions } from 'vite';
import { configDefaults, defineConfig, type UserConfig } from 'vitest/config';

export const createVitestConfig = (options: UserConfig = {}) =>
	defineConfig({
		...options,
		test: {
			...options?.test,
			globals: true,
			coverage: {
				...options.test?.coverage,
				provider: 'v8',
				enabled: true,
				reporter: ['text', 'lcov', 'clover'],
				exclude: [...(configDefaults.coverage.exclude ?? []), ...(options.test?.coverage?.exclude ?? [])]
			},
			poolOptions: {
				threads: {
					singleThread: true
				}
			}
		},
		esbuild: {
			...options?.esbuild,
			target: (options?.esbuild as ESBuildOptions | undefined)?.target ?? 'esnext'
		}
	});
