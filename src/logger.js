import 'dotenv/config';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

//new transports.File({ filename: process.env.LOGGER_FILENAME_ERROR, level: "error" }),
//new transports.File({ filename: process.env.LOGGER_FILENAME_COMBINED }),

function createDailyRotateFileTransport(name) {
	const config = {
		filename: process.env[`LOGGER_${name}_FILENAME`]
	};

	const datePattern = process.env[`LOGGER_${name}_DATE_PATTERN`];
	const maxSize = process.env[`LOGGER_${name}_MAX_SIZE`];
	const level = process.env[`LOGGER_${name}_LEVEL`];

	if (datePattern && datePattern !== '')
		config.datePattern = datePattern;

	if (maxSize && maxSize !== '')
		config.maxSize = maxSize;

	if (level && level !== '')
		config.level = level;

	return new transports.DailyRotateFile(config);
}

function createConsoleTransport(name, logFormat) {
	const config = {
		prettyPrint: true,
		format: combine(
			format.colorize(),
			logFormat
		)
	};

	const level = process.env[`LOGGER_${name}_LEVEL`];
	if (level && level !== '')
		config.level = level;

	return new transports.Console(config);
}


export default {
	create: (moduleName) => {
		const filename = moduleName.split('/').slice(-1);
		const logFormat = combine(
			label({ label: filename })
			, timestamp()
			, myFormat
			//, format.json()
		);

		const names = process.env.LOGGER_NAMES.split(',');
		const transports = names.map((name) => {
			const type = process.env[`LOGGER_${name}_TYPE`];

			if (type === 'DailyRotateFile') {
				return createDailyRotateFileTransport(name);
			} else if (type === 'Console') {
				return createConsoleTransport(name, logFormat);
			} else {
				throw new Error(`logger "${name}" não reconhecido`);
			}
		});

		const logger = createLogger({
			level: process.env.LOGGER_LEVEL,
			format: logFormat,
			transports: transports
		});

		return logger;
	}
};