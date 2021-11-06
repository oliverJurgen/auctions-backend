import { get } from 'lodash';

export default (
  obj: Record<any, any>,
  path: Array<string> | string,
  fallback?: any,
) => get(obj, path, fallback) || fallback;
