import { d as defineEventHandler } from '../../_/nitro.mjs';
import { randomUUID } from 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const session_post = defineEventHandler(() => {
  const id = randomUUID().slice(0, 8);
  return { id };
});

export { session_post as default };
//# sourceMappingURL=session.post.mjs.map
