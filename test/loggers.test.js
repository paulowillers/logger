import { describe, expect, it } from '@jest/globals';
import Logger from '../src/logger';
import FindFiles from 'file-regex';

const logger = Logger.create(import.meta.url);
const filesDirPrefix = './logs/';

describe('Tests the creation of log files defined in .env', () => {

	it('Error log file', async () => {
		logger.error('Test error file');

		const result = await FindFiles(filesDirPrefix, /errors-.*\.log/);
		console.log(result);

		expect(result).not.toBeNull();
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
	});

	it('All levels log file', async () => {
		logger.info('Test info log');
		logger.warn('Test warn log');
		logger.debug('Test debug log');
		logger.error('Test error log');

		const result = await FindFiles(filesDirPrefix, /all-logs-.*\.log/);
		console.log(result);

		expect(result).not.toBeNull();
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
	});

});