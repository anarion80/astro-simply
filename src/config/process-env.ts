// all relative imports in env subtree

import dotenv from 'dotenv';

import { nodeEnvValues, processEnvSchema } from '../schemas/config.ts';
import { validateData } from '../utils/validate.ts';

import type { ProcessEnvType } from '../schemas/config.ts';

/*------------------ load .env file -----------------*/

// import.meta.env is not available in astro.config.mjs, only after the config is loaded.
// ! MUST use process.env for vars used in astro.config.mjs.
// https://github.com/withastro/astro/issues?q=.env+file+not+loaded

const NODE_ENV = process.env.NODE_ENV;

if (!nodeEnvValues.includes(NODE_ENV)) {
    console.error('Invalid process.env.NODE_ENV: ', NODE_ENV);
    throw new Error('Invalid process.env.NODE_ENV');
}

const envFileName = `.env.${NODE_ENV}`;
dotenv.config({ path: envFileName });

/*------------------ validate processEnvData -----------------*/

const processEnvData: ProcessEnvType = {
    NODE_ENV: process.env.NODE_ENV,
    SITE_URL: process.env.SITE_URL,
    FACEBOOK_ACCESS_TOKEN: process.env.FACEBOOK_ACCESS_TOKEN,
};

export const PROCESS_ENV = validateData(processEnvData, processEnvSchema);

/*------------------ experimental.env.schema -----------------*/

// export const envSchema = {
//     schema: {
//         // server
//         NODE_ENV: envField.string({
//             context: 'server',
//             access: 'public',
//             default: 'development',
//         }),
//         // client
//         SITE_URL: envField.string({
//             context: 'client',
//             access: 'public',
//             // default: omit to have explicit validation
//         }),
//     },
// };
